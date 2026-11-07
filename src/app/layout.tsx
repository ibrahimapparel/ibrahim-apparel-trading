import type { Metadata } from "next";
import { Marcellus, Jost } from "next/font/google";
import "./globals.css";
import Header, { Ticker, WhatsAppButton } from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";

const serif = Marcellus({ weight: "400", variable: "--font-serif", subsets: ["latin"] });
const sans = Jost({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ibrahim Apparel & Trading (Private) Limited — Winter, Redefined.",
  description: "Premium winter essentials in Pakistan. Comfort Meets Class. Jackets, sweaters, hoodies, shawls, kurtis and more. Cash on Delivery nationwide.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('iat-theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf8f4] text-[#242424] dark:bg-[#172b3a] dark:text-[#faf8f4]">
        <AuthProvider>
          <StoreProvider>
            <Ticker />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
