import type { Metadata } from "next";
import { Courgette, Geist_Mono, Inconsolata, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { SanityLive } from "@/sanity/lib/live";

const jetbrainsMonoHeading = JetBrains_Mono({subsets:['latin'],variable:'--font-heading'});
const courgetteCursive = Courgette({ subsets: ["latin"], weight: "400", variable: "--font-courgette" });

const inconsolataSans = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celest Jerez",
  description: "My Portfolio ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inconsolataSans.variable,
        geistMono.variable,
        jetbrainsMonoHeading.variable,
        courgetteCursive.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <SanityLive/> 
        </body>
    </html>
  );
}
