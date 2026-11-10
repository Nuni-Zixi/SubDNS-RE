import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/providers";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "门牌号 · SubDNS — 免费子域名",
    template: "%s — SubDNS",
  },
  description:
    "免费领取 your-domain.cc 子域名，填一条解析即可上线。可开 Cloudflare 代理，每账户 2 个、每域名最多 8 条记录。",
  keywords: ["子域名", "免费域名", "dns", "cloudflare", "free subdomain"],
  authors: [{ name: "SubDNS" }],
  metadataBase: new URL("https://www.your-domain.cc"),
  alternates: {
    canonical: "https://www.your-domain.cc",
  },
  openGraph: {
    title: "门牌号 · SubDNS — 免费子域名",
    description: "免费领取 your-domain.cc 子域名，填一条解析即可上线。",
    url: "https://www.your-domain.cc",
    siteName: "SubDNS",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "门牌号 · SubDNS — 免费子域名",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "门牌号 · SubDNS — 免费子域名",
    description: "免费领取 your-domain.cc 子域名，填一条解析即可上线。",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "SubDNS",
        url: "https://www.your-domain.cc",
        description: "免费子域名服务（根域名占位 your-domain.cc）",
      },
      {
        "@type": "WebSite",
        name: "SubDNS",
        url: "https://www.your-domain.cc",
        description: "免费子域名 — 填一条解析即可上线，可开 Cloudflare 代理。",
      },
      {
        "@type": "SoftwareApplication",
        name: "SubDNS CLI",
        url: "https://www.your-domain.cc",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        offers: { "@type": "Offer", price: "0" },
      },
    ],
  };

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
