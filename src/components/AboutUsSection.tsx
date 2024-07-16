'use client'

import Image from "next/image";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger'


export default function AboutUsSection(){

    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        gsap.to('#about', {x: 0, duration: 1, scrollTrigger: {trigger: '#about', start: 'top 80%', end: 'top 60%', scrub: true, once: true}})
        gsap.to('#image', {x: 0, duration: 1, scrollTrigger: {trigger: '#image', start: 'top 80%', end: 'top 60%', scrub: true, once: true}})
    }, [])

    return (
        <div className="relative z-20 flex flex-col justify-center items-center xl:grid xl:grid-flow-col xl:grid-cols-2 gap-20 overflow-hidden">
            <div id="about" className="col-span-1 flex flex-col text-center items-center w-[500px] xl:ml-auto xl:translate-x-[-1000px]">
                <p className="dancing-script text-7xl mb-4 text-orange-600">About Us</p>
                <p className="max-md:w-[300px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div id="image" className="col-span-1 flex justify-center xl:mr-auto xl:translate-x-[1000px]">
                <Image src={'/mashawi.jpg'} height={400} width={400} alt="mashawi"/>
            </div>
        </div>
    )
}