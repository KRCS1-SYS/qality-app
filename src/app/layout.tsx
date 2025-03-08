import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/provider/Redux";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Zuarione Industries",
  description: "Zuarione Industries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-[MyCustomFont] w-screen h-screen overflow-hidden bg-neutral-50 text-neutral-950 dark:text-neutral-50 dark:bg-neutral-950 antialiased`}
      >
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
