'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Admin(){

    const router = useRouter()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [signInError, setSignInError] = useState<boolean>(false)
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password
        })

        if(result?.error){
            setSignInError(true)
            console.error(result.error)
        }else{
            console.log("Sign In successful")
            router.push('/admin')
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <label>
                    <p className="text-white text-lg">Username</p>
                    <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="border-[1px] border-black rounded-sm pl-1"/>
                </label>
                <br/>
                <label>
                    <p className="text-white text-lg">Password</p>
                    <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border-[1px] border-black rounded-sm pl-1"/>
                </label>
                {signInError && <p className="text-red-600 text-sm mt-2">Incorrect username or password</p>}
                <br/>
                <button type="submit" className="border-[1px] border-white px-3 py-2 rounded-md text-white">Sign In</button>
            </form>
        </div>
    )
}