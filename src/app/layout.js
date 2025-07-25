// RootLayout.tsx
import Script from "next/script";
import "../styles/globals.scss";
import Footer from "@/layout/Footer/Page";

export const metadata = {
  title: "Poki",
  description: "Play Games Online Free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load AdSense script globally */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
