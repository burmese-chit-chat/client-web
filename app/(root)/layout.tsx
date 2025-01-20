export const dynamic = 'force-dynamic'; // Force dynamic rendering
import React from 'react'
import SideBar from '@/app/(root)/components/side-bar'
import get_me from '@/app/lib/get-me'
import IUser from '@/app/types/IUser';

export default async function layout({ children } : { children : React.ReactNode }) {
    const user : IUser | null = await get_me();
    const user_id : string | "undefined" = user ? user._id : "undefined";
  return (
    <>
        <SideBar user_id={user_id}></SideBar>
        <main>
            { children }
        </main>
    </>
  )
}
