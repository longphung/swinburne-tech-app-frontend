import {Montserrat} from "next/font/google";
import Image from 'next/image'
import Link from 'next/link'

import logo from '../public/logo.png'
import underConstruction from '../public/under-construction.png';

import "./globals.css";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata = {
  title: "TechAway",
  description: "Professional IT Solutions by Tech Away. Small Business, Managed IT or Non-Profit Organisation. Our Expert Team is ready to Provide IT Solution any-day 24x7.",
};

const Header = () => {
  return (
    <header className='bg-white flex justify-between px-32 py-8'>
      <Link href='/'>
        <Image
          src={logo}
          alt="TechAway Logo"
          width={277}
          height={57}
        />
      </Link>
      <nav className='flex items-center'>
        <ul className='flex justify-between items-center gap-12 font-bold text-black'>
          <li className='flex items-center hover:underline decoration-2 underline-offset-8'>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className='flex items-center hover:underline decoration-2 underline-offset-8'>
            <Link href="/schedule">Schedule</Link>
          </li>
          <li className='flex items-center hover:underline decoration-2 underline-offset-8'>
            <Link href="/tickets">Tickets</Link>
          </li>
          <li className='flex items-center hover:underline decoration-2 underline-offset-8'>
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
    {process.env.IS_UNDER_CONSTRUCTION === "1" ? (
      <Image src={underConstruction} width={512} alt='Under Construction' className='my-8 mx-auto'/>
      ) :
      children
    }
    </body>
    </html>
  );
}
