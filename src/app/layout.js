// app/layout.tsx
import Script from "next/script";
import "../styles/main.scss";

export const metadata = {
  title: "Poki",
  description: "Play Games Online Free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense script */}

        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <main>{children}</main>
        {/* REMOVE <AdSenseTestAd /> FROM HERE — it's a Client Component */}
        <footer>this is footer</footer>
      </body>
    </html>
  );
}
