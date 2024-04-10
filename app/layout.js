import {Montserrat} from "next/font/google";
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import "./globals.css";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata = {
  title: "TechAway",
  description: "Professional IT Solutions by Tech Away. Small Business, Managed IT or Non-Profit Organisation. Our Expert Team is ready to Provide IT Solution any-day 24x7.",
};

const Header = () => {
  return (
    <header className='bg-white flex justify-between px-32 py-8'>
      <Image
        src={logo}
        alt="TechAway Logo"
        width={277}
        height={57}
      />
      <nav className='flex items-center'>
        <ul className='flex justify-between items-center gap-12 font-bold text-black'>
          <li className='flex items-center'>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className='flex items-center'>
            <Link href="/schedule">Schedule</Link>
          </li>
          <li className='flex items-center'>
            <Link href="/tickets">Tickets</Link>
          </li>
          <li className='flex items-center'>
            <Link href="/shop">Shop</Link>
          </li>
        </ul>
      </nav>
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
