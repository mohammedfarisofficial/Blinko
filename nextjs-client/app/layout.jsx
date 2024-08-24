import "./globals.css";
import { Inter } from 'next/font/google'

// theme
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// next auth
import { getServerSession } from "next-auth";
import SessionProvider from "./auth/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";

import Navbar from "@/components/navbar/navbar";
import ReduxProvider from "./store/provider/ReduxProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider session={session}>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Navbar />
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// from ui branch
