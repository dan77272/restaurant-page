import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    return (
        <nav className="max-w-[1200px] m-auto max-2xl:pr-10">
            <div className="">
                <Image src={'/shawarma-wallpaper.jpeg'} layout="fill" objectFit="cover" className="opacity-105" alt="shawarma"/>
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
            </div>
        </nav>
    )
}