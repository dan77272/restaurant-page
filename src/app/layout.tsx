import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "../components/ClientSessionProvider";
import { EdgeStoreProvider } from "../../lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Restaurant",
  description: "My Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientSessionProvider><EdgeStoreProvider>{children}</EdgeStoreProvider></ClientSessionProvider>
      </body>
    </html>
  );
}
