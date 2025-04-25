import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import ProductsPage from "./pages/products";
import Footer from "./components/Footer";
import './global.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Appscrip-task-Balaji",
  description: "E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header/>
      <ProductsPage/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
