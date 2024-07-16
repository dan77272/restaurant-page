import Image from "next/image";

export default function Footer(){
    return (
        <footer className="bg-black flex md:flex-row flex-col max-md:gap-10 max-md:pb-10">
            <div className="md:flex-1 flex md:justify-end justify-center">
                <Image src={'/shawarma.png'} width={400} height={400} alt="shawarma"/>
            </div>
            <div className="md:flex-1 flex justify-center">
                <div className="flex flex-col justify-center gap-3 max-md:text-center max-md:items-center">
                    <p className="text-white text-2xl font-semibold">Opening Hours</p>
                    <div className="bg-orange-600 w-20 h-1"></div>
                    <p className="text-white">Sunday To Thursday: 11:00 AM - 11:00 PM</p>
                    <p className="text-white">Friday And Saturday: 11:00 AM - 12:00 AM</p>
                </div>
            </div>
            <div className="md:flex-1 flex md:justify-start justify-center">
                <div className="flex flex-col justify-center gap-3 max-md:text-center max-md:items-center">
                    <p className="text-white text-2xl font-semibold">Contact Details</p>
                    <div className="bg-orange-600 w-20 h-1"></div>
                    <p className="text-white">123 Maple Street Toronto, ON M5H 2N2 Canada</p>
                    <p className="text-white">+1 (416) 555-1234</p>
                    <p className="text-white">info@example.com</p>
                </div>
            </div>
        </footer>
    )
}