import Link from "next/link";
import SignOut from "./SignOut";

export default function AdminNavbar(){
    return (
        <div className="col-span-1 bg-gray-200 p-4 flex flex-col items-center gap-10">
            <Link href={'/admin'}>Home</Link>
            <Link href={'/admin/get-item'}>Items</Link>
            <Link href={'/admin/add-item'}>Add Item</Link>
            <Link href="/admin/add-user">Add User</Link>
            <SignOut/>
        </div>
    )
}