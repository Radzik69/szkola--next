import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import Login from "@/components/login";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          {/* <Login></Login> */}
          {children}
        </div>
      </body>
    </html>
  );
}
