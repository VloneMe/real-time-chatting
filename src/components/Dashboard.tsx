"use client"

import { signIn, signOut, useSession } from "next-auth/react";
// import { Button } from "./ui/button";
import Image from "next/image";
import { Button } from "@material-tailwind/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Image
           src={session.user?.image as string}
           alt="hhhhhk" width={80} height={80} />
          <h1>Welcome back!, {session.user?.name}</h1>
          <p className="text-3xl">{session.user?.email}</p>
          <Button onClick={() => signOut()} className="">Sign Out</Button>
        </>
      ) : (
        <div className="space-y-5">
          <h2 className="text-3xl mt-10">You are not logged in!</h2>
          <div className="flex gap-5">
            <Button onClick={() => signIn("google")} className="outline bg-transparent border-black border text-black">Sign in with Google</Button>
            <Button onClick={() => signIn("github")} className="">Sign in with Github</Button>

          </div>
        </div>
      )}
    </>
  );
}