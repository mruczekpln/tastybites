import "~/styles/globals.css";

import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import AuthSessionProvider from "~/components/auth-session-provider";
import { TRPCReactProvider } from "~/trpc/react";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const titleFont = localFont({
  src: "./nyghtserif.woff2",
  variable: "--font-title",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen w-screen overflow-x-hidden font-sans ${space_grotesk.variable} ${titleFont.variable}`}
      >
        <AuthSessionProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
