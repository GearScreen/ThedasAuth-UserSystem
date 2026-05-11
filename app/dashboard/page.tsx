'use client'

import { useSession } from "next-auth/react"

import Image from "next/image";
import Link from 'next/link';

const tryDeleteAccount = async () => {
    try {
        const response = await fetch('/api/users/delete-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()
        if (data.success) {
            alert(data.message)
            // console.log('Account deletion response:', data.message)
        } else {
            // alert(`Error: ${data.error}`)
            console.log(`Error: ${data.error}`)
        }
    } catch (error) {
        console.error('Error deleting user:', error)
    }
}

export default function Home() {
    const { data: session } = useSession()

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {session?.user ? (
                <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                    {/* TITLE BLOCK */}
                    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                            Dashboard
                        </h1>
                        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                            Display custom user data
                        </p>
                    </div>
                    {/* NAVIGATION */}
                    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row" style={{ paddingTop: '10%' }}>
                        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            href="/">
                            <Image
                                className="dark:invert"
                                src="/vercel.svg"
                                alt="Vercel logomark"
                                width={16}
                                height={16}
                                style={{ height: "auto" }}
                            />
                            Main Page
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row" style={{ paddingTop: '10%' }}>
                        <button onClick={tryDeleteAccount} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded" >Delete Data</button>
                    </div>
                </main>
            ) : (
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    href="/">
                    Login before accessing this page
                </Link>
            )}
        </div>
    );
}