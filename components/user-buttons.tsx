import { auth, signIn, signOut } from "@/auth"

import Image from "next/image";

export default async function UserButton() {
  const session = await auth()
  if (!session?.user) return <SignIn />
  return (
    <div className="flex items-center gap-2">
      <SignOut />
      <Image
        src={
          session.user.image ??
          `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`
        }
        alt="Vercel logomark"
        width={50}
        height={50}
        style={{ height: 'auto', borderRadius: '50%' }}
      />
    </div>
  )
}

function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Signin with GitHub
      </button>
    </form>
  )
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </form>
  )
}