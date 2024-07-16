'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function Hero(){

    useGSAP(() => {
        gsap.to('#shawarma', {opacity: 1, delay: 1})
        gsap.to('#menu', {opacity: 1, delay: 2})
    }, [])

    return (
        <div className="z-10 absolute w-full bottom-10 flex justify-center items-center min-h-screen flex-col">
            <p id="shawarma" className="text-white md:text-[100px] text-[60px] opacity-0">SHAWARMA</p>
            <button id="menu" className="border-white border-[2px] px-5 py-3 text-white rounded-sm md:text-lg text-sm opacity-0 hover:bg-white hover:text-gray-700">Our Menu</button>
        </div>
    )
}