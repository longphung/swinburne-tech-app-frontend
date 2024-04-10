import {Montserrat} from "next/font/google";
import Image from 'next/image'
import logo from '../public/logo.png'
import "./globals.css";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata = {
  title: "TechAway",
  description: "Professional IT Solutions by Tech Away. Small Business, Managed IT or Non-Profit Organisation. Our Expert Team is ready to Provide IT Solution any-day 24x7.",
};

const Header = () => {
  return (
    <header className='bg-white flex'>
      <Image
        src={logo}
        alt="TechAway Logo"
        width={277}
        height={57}
      />
      <p>{metadata.description}</p>
    </header>
  );
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body className={montserrat.className}>
    <Header/>
    {children}
    </body>
    </html>
  );
}
