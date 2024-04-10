import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "TechAway",
  description: "Professional IT Solutions by Tech Away. Small Business, Managed IT or Non-Profit Organisation. Our Expert Team is ready to Provide IT Solution any-day 24x7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
