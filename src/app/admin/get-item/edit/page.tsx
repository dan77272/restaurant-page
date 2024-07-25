'use client'

import AdminNavbar from "@/components/AdminNavbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function EditItemComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    useEffect(() => {
        if (id) {
            const fetchItem = async () => {
                const response = await fetch(`/api/menu?id=${id}`);
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
                setImageUrl(data.image_url);
                setPrice(data.price);
                console.log(data);
            };
            fetchItem();
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch('/api/menu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, name, description, image_url: imageUrl, price})
        });
        if(response.ok){
            alert("Item updated successfully");
            router.push('/admin/get-item');
        }else{
            alert("Failed to update item");
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
            <h1 className="bg-gray-800 text-4xl text-white w-full text-center py-4">Admin Dashboard</h1>
            <div className="grid grid-cols-10 w-full h-full">
                <AdminNavbar />
                <div className="bg-gray-800 col-span-9 p-8 flex flex-col justify-center items-center">
                    <h1 className="text-white text-3xl mb-5">Edit Item</h1>
                    <form className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col gap-5 w-full max-w-lg" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="min-h-8 rounded-md p-2 text-gray-900"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px] rounded-md p-2 text-gray-900"
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="min-h-8 rounded-md p-2 text-gray-900"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="min-h-8 rounded-md p-2 text-gray-900"
                        />
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md self-center mt-4">Edit Item</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function EditItem() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditItemComponent />
        </Suspense>
    );
}
