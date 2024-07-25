'use client'

import AdminNavbar from "@/components/AdminNavbar"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type MenuItem = {
    id: number,
    name: string,
    description: string,
    image_url: string,
    price: string
}

export default function GetItem() {

    const [items, setItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch('/api/menu')
            const data = await response.json()
            setItems(data)
            setLoading(false)
        }

        fetchItems()
    }, [])

    async function deleteItem(itemId: number) {
        const response = await fetch('/api/menu', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemId })
        })

        const responseData = await response.json();

        if (response.ok) {
            setItems(items.filter(item => item.id !== itemId));
            alert('Item removed successfully')
        } else {
            alert(`Failed to remove item: ${responseData.error}`)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
            <div className="bg-gray-900 h-screen flex flex-col items-center">
                <h1 className="bg-gray-800 text-4xl text-white w-full text-center py-4">Admin Dashboard</h1>
                <div className="grid grid-cols-10 w-full h-full">
                    <AdminNavbar />
                    <div className="col-span-9 bg-gray-100 p-8 grid grid-cols-4 gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white w-full h-[400px] flex flex-col justify-center items-center gap-4 rounded-lg shadow-md p-4">
                                <div className="w-full h-[200px] flex justify-center items-center">
                                    <div className="w-[200px] h-[200px] overflow-hidden">
                                        <Image 
                                            height={200} 
                                            width={200} 
                                            alt="image" 
                                            src={item.image_url || '/vercel.svg'} 
                                            className="rounded-md object-cover w-full h-auto" 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-gray-600 line-clamp-3">{item.description}</p>
                                    <p className="text-lg text-gray-800">${item.price}</p>
                                </div>
                                <div className="flex gap-5">
                                    <Link href={`/admin/get-item/edit?id=${item.id}`} className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600">Edit</Link>
                                    <button className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600" onClick={() => deleteItem(item.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}
