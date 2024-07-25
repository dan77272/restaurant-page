'use client'

import AdminNavbar from "@/components/AdminNavbar"
import { signIn, useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { useEdgeStore } from "../../../../lib/edgestore";

export default function AddItem(){

    const { data: session, status } = useSession();

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [file, setFile] = useState<File>()


    const {edgestore} = useEdgeStore()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
    
      let uploadedUrls: { url: string, thumbnailUrl: string | null } = { url: '', thumbnailUrl: null };
    
      if(file){
        const res = await edgestore.myPublicImages.upload({file});
        uploadedUrls = {
          url: res.url,
          thumbnailUrl: res.thumbnailUrl
        };
      }
    
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, description, image_url: uploadedUrls.url, price})
      });
    
      if(response.ok){
        alert('Item added successfully');
        setName('');
        setDescription('');
        setPrice('');
        if(fileInputRef.current){
          fileInputRef.current.value = ''
        }
      }else{
        alert('Failed to add item');
      }
    }
    

    if (status === 'loading') {
        return <div>Loading...</div>;
      }

    if (!session) {
        return (
          <div className='bg-gray-900 min-h-screen flex items-center justify-center flex-col'>
            <p className='text-white text-3xl'>You must be signed in to view this page.</p>
            <button onClick={() => signIn()} className='border-white text-white text-2xl border-2 p-2 rounded-md mt-4'>Sign In</button>
          </div>
        );
      }

      return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
            <h1 className="bg-gray-800 text-4xl text-white w-full text-center py-4">Admin Dashboard</h1>
            <div className="grid grid-cols-10 w-full h-full">
                <AdminNavbar />
                <div className="bg-gray-800 col-span-9 p-8 flex flex-col justify-center items-center">
                  <h1 className="text-white text-3xl mb-5">Add Item</h1>
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
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="min-h-8 rounded-md p-2 text-gray-900"
                        />
                        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} ref={fileInputRef}/>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md self-center mt-4">Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    )
    
}