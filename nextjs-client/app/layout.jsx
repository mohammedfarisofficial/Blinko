import "./globals.css";
import { Inter } from "next/font/google";

// theme
import { ThemeProvider } from "@/components/theme/theme-provider";
// next auth
import { getServerSession } from "next-auth";
import SessionProvider from "./auth/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/components/navbar/navbar";
import ReduxProvider from "./store/provider/ReduxProvider";

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

// from ui branch
