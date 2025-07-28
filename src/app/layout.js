import Script from "next/script";
import "../styles/globals.scss";
import Footer from "@/layout/Footer/Page";
import { RecentGamesProvider } from "@/contexts/RecentGamesContext";

export const metadata = {
  title: "Poki",
  description: "Play Games Online Free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className="layout-wrapper">
        <div className="layout-content">
          <RecentGamesProvider>{children}</RecentGamesProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
