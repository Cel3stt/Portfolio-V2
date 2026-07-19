import type { Metadata } from "next";
import { Courgette, Geist_Mono, Inconsolata, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { SanityLive } from "@/sanity/lib/live";
import { cookies, draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import AskCelest from "@/components/chat/ask-celest";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PortfolioSidebar } from "@/components/sidebar/portfolio-sidebar";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

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
      <body className="h-svh flex flex-col overflow-hidden">
        <SidebarProvider defaultOpen={defaultOpen} className="flex-1 min-h-0">
          <PortfolioSidebar />
          <SidebarInset>
            {/* mobile top bar: hamburger. Hidden on md+ where the sidebar is always visible/collapsible */}
            <header className="flex h-14 items-center gap-2 border-b border-border px-4 md:hidden">
              <SidebarTrigger />
              <span className="font-heading text-sm font-medium">Celest</span>
            </header>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </SidebarInset>
        </SidebarProvider>

        <SanityLive/>
        <AskCelest />
         {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />

          </>
        )}
        </body>
    </html>
  );
}
