'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar(){

    const [showNavbar, setShowNavbar] = useState(false)

    return (
        <nav className="max-w-[1200px] m-auto max-2xl:pr-10">
            <div className="">
                <Image src={'/shawarma-wallpaper.jpeg'} fill style={{objectFit:"cover"}} className="opacity-105" alt="shawarma"/>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="flex flex-row items-center justify-between z-20 relative">
                <div>
                    <Image src={'/shawarma.png'} width={200} height={200} alt="shawarma"/>
                </div>
                <div className="flex gap-10 max-md:hidden">
                    <Link href={'/'} className="text-white">HOME</Link>
                    <Link href={'/aboutus'} className="text-white">ABOUT US</Link>
                    <Link href={'/menu'} className="text-white">MENU</Link>
                    <Link href={'/contact'} className="text-white">CONTACT</Link>
                </div>
                <div className="md:hidden flex flex-col justify-end relative">
                    <button onClick={() => setShowNavbar(!showNavbar)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" color="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    {showNavbar && 
                    <div className="flex flex-col absolute top-full right-0 bg-gray-900 w-[200px] z-0 gap-6 pl-3 py-5 rounded-md">
                        <Link href={'/'} className="text-white hover:text-neutral-400">HOME</Link>
                        <Link href={'/aboutus'} className="text-white hover:text-neutral-400">ABOUT US</Link>
                        <Link href={'/menu'} className="text-white hover:text-neutral-400">MENU</Link>
                        <Link href={'/contact'} className="text-white hover:text-neutral-400">CONTACT</Link>
                    </div>
                    }
                </div>
            </div>
        </nav>
    )
}