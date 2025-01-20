export const dynamic = 'force-dynamic'; // Force dynamic rendering
import React from 'react';
import NavBar from "@/app/auth/components/nav-bar";
import IUser from '../types/IUser';
import get_me from '../lib/get-me';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
export default async function Layout({ children } : { children: React.ReactNode }) {
  const user : IUser | null = await get_me();
  console.log('user', user);
  if(user) { redirect("/"); }
  return (
    <>
      <NavBar></NavBar> 
      <main>
        <h1 className=' uppercase font-bold text-2xl text-center mb-5 mt-[100px]'>Burmese Chit Chat</h1>
        {children}
        <div className='text-center mb-10'>
          <Link href={"/"} className={buttonVariants({ variant: "outline" })}>BROWSE AS A VISITOR</Link>
        </div>
      </main>
    </>
  )
}
