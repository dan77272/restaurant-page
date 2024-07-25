"use client";
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import AdminNavbar from '@/components/AdminNavbar';

export default function AddUserPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password, role }),
    });

    if (response.ok) {
      alert('User added successfully');
      setName('');
      setUsername('');
      setPassword('');
      setRole('user');
    } else {
      alert('User creation failed');
    }
  };

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
          <h1 className="text-white text-3xl mb-5">Add User</h1>
          <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-5 w-full max-w-md">
            <input
              className="w-full p-2 rounded-md text-gray-900"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
            />
            <input
              className="w-full p-2 rounded-md text-gray-900"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
            <input
              className="w-full p-2 rounded-md text-gray-900"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <select
              className="w-full p-2 rounded-md text-gray-900"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="text-white bg-green-600 px-4 py-2 rounded-md mt-8 hover:bg-green-700">Add User</button>
          </form>
        </div>
      </div>
    </div>
  );  
}
