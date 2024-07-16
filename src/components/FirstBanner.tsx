import Image from "next/image";

export default function FirstBanner(){
    return (
        <div className="relative xl:h-[400px] h-[250px] mb-[150px] flex justify-center items-center">
            <Image src={'/mashawi2.jpeg'} layout="fill" objectFit="cover" alt="mashawi"/>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <button id="menu" className=" px-5 py-3 relative z-40 text-white rounded-sm xl:text-lg text-sm hover:bg-white hover:text-gray-700 bg-orange-600">Our Menu</button>
        </div>
    )
}