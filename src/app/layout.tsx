import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: "ScholarWeb — Map the Internet to Your Syllabus",
  description:
    "The clean, syllabus-mapped study platform that turns the entire internet into your personal textbook. Upload your syllabus and map every webpage, article, and video to what actually matters for your exams.",
  keywords: [
    "AI Education",
    "ScholarWeb",
    "Syllabus Mapping",
    "Personalized Learning",
    "College Study Companion",
    "Fact-Checked Studying",
    "Notion Aesthetic",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light w-full max-w-full overflow-x-hidden">
      <body className="antialiased relative bg-[#fcfbf9] text-[#2a302e] min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Faint Film Grain Overlay */}
        <div className="noise-overlay" />

        {/* Soft light spotlight tracking */}
        <CursorGlow />

        {/* Page Content Container Wrapper */}
        <main className="relative w-full max-w-full overflow-x-hidden min-h-screen z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
