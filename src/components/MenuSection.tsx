'use client'

import Image from "next/image"
import { useEffect, useState } from "react";

export default function MenuSection(){

  type MenuItem = {
    id: number,
    name: string,
    description: string,
    image_url: string,
    price: string
  }

    const [menu, setMenu] = useState<MenuItem[]>([])

    // const menu = [
    //     {
    //         image: 'https://shawarmaavenue.ca/wp-content/uploads/2022/09/Mix-Family-Platters-min-scaled.jpg',
    //         name: 'Mix',
    //         price: '$54.99',
    //         description: '2 Chicken Saj Wraps + 2 Lamb & Beef Saj Wraps Served with Pickles, Fries, Garlic Sauce'
    //     },
    //     {
    //         image: 'https://shawarmaavenue.ca/wp-content/uploads/2022/09/Mix-Family-Platters-min-scaled.jpg',
    //         name: 'Mix',
    //         price: '$54.99',
    //         description: '2 Chicken Saj Wraps + 2 Lamb & Beef Saj Wraps Served with Pickles, Fries, Garlic Sauce'
    //     },
    //     {
    //         image: 'https://shawarmaavenue.ca/wp-content/uploads/2022/09/Mix-Family-Platters-min-scaled.jpg',
    //         name: 'Mix',
    //         price: '$54.99',
    //         description: '2 Chicken Saj Wraps + 2 Lamb & Beef Saj Wraps Served with Pickles, Fries, Garlic Sauce'
    //     },
    //     {
    //         image: 'https://shawarmaavenue.ca/wp-content/uploads/2022/09/Mix-Family-Platters-min-scaled.jpg',
    //         name: 'Mix',
    //         price: '$54.99',
    //         description: '2 Chicken Saj Wraps + 2 Lamb & Beef Saj Wraps Served with Pickles, Fries, Garlic Sauce'
    //     },
    //     {
    //         image: 'https://shawarmaavenue.ca/wp-content/uploads/2022/09/Mix-Family-Platters-min-scaled.jpg',
    //         name: 'Mix',
    //         price: '$54.99',
    //         description: '2 Chicken Saj Wraps + 2 Lamb & Beef Saj Wraps Served with Pickles, Fries, Garlic Sauce'
    //     },
    //     {
    //         image: 'https://shawarmaavenue.ca/wp-content/uploads/2022/09/Mix-Family-Platters-min-scaled.jpg',
    //         name: 'Mix',
    //         price: '$54.99',
    //         description: '2 Chicken Saj Wraps + 2 Lamb & Beef Saj Wraps Served with Pickles, Fries, Garlic Sauce'
    //     }
    // ]

    useEffect(() => {
      async function getItems(){
        const response = await fetch('/api/menu')
        const data = await response.json()
        console.log(data)
        setMenu(data)

      }

      getItems()
    }, [])

    const midPoint = Math.ceil(menu.length / 2);
  
    // Split the array into two halves
    const firstHalf = menu.slice(0, midPoint);
    const secondHalf = menu.slice(midPoint);

    return (
        <div className="flex flex-col justify-center items-center gap-[80px] mb-[150px]">
          <p className="dancing-script text-7xl mb-4 text-orange-600">Menu</p>
          <div className="2xl:grid 2xl:grid-flow-col 2xl:grid-cols-2 gap-4 flex flex-col">
            <div className="col-span-1 flex flex-col gap-10 m-auto">
              {firstHalf.map((m, index) => (
                <div key={index} className="p-2 flex gap-5">
                  <Image src={m.image_url} alt="image" height={150} width={150}/>
                  <div className="">
                    <div className="flex justify-between pb-5 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-full">
                      <p className="font-semibold text-xl">{m.name}</p>
                      <div className="flex-1 border-dotted border-b-2 border-orange-600 mx-2 my-2"></div>
                      <p className="font-semibold text-xl text-orange-600">${m.price}</p>
                    </div>
                    <div className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[500px] text-neutral-500 text-sm">
                      {m.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1 flex flex-col gap-10 m-auto">
              {secondHalf.map((m, index) => (
                <div key={index} className="p-2 flex gap-5">
                  <Image src={m.image_url} height={150} width={150} alt="image" className="h-auto w-[150px]"/>
                  <div className="">
                    <div className="flex justify-between pb-5 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-full">
                      <p className="font-semibold text-xl">{m.name}</p>
                      <div className="flex-1 border-dotted border-b-2 border-orange-600 mx-2 my-2"></div>
                      <p className="font-semibold text-xl text-orange-600">${m.price}</p>
                    </div>
                    <div className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[500px] text-neutral-500 text-sm">
                      {m.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}