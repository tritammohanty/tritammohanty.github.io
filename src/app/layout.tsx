import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
const geist = localFont({
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tritammohanty.github.io"),
  title: "Tritam Mohanty | AI Engineer & Generalist",
  description:
    "Applied AI, machine learning, and analytics. Explore Tritam Mohanty's conversational systems, model experiments, and live GitHub projects.",
  openGraph: {
    title: "Tritam Mohanty | AI Engineer & Generalist",
    description: "Curiosity, connected systems, and AI built around real problems.",
    url: "https://tritammohanty.github.io",
    type: "website",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "Tritam Mohanty, AI Engineer and Generalist",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/social.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
const themeScript = `(function(){try{var t=localStorage.getItem('tritam-theme')||'system';document.documentElement.classList.toggle('dark',t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches));}catch(e){document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme: dark)').matches);}})();`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} ${mono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
