import User from "@/modals/User";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({ email: credentials.email }).select(
          "_id email username image password"
        );
        if (!user) throw new Error("User not exist!");

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!correctPassword) throw new Error("Incorrect password");

        console.log("**User found during login attempt:**", user);
        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signin({ user, account }) {
      console.log("trigger");
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      console.log("User ::", user);
      if (user) {
        token.id = user._id?.toString() || user.id.toString();
        token.email = user.email;
        token.username = user.username || user.name;
        token.image = user?.image;
      }
      console.log("**JWT token generated:**", token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.username;
      session.user.email = token.email;
      session.user.image = token.image || "";
      console.log("**Session data updated:**", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
