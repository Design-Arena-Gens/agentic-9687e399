import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Pabbly Automation Playbook | Wattpad Imagines TikTok Workflow",
  description:
    "Step-by-step automation blueprint for building a free Pabbly Connect workflow that curates YouTube videos and schedules them for TikTok."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="bg-slate-950 font-sans text-slate-100">
        {children}
      </body>
    </html>
  );
}
