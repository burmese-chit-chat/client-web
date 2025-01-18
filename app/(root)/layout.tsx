import React from 'react'
import SideBar from '@/app/(root)/components/side-bar'

export default function layout({ children } : { children : React.ReactNode }) {
  return (
    <>
        <SideBar></SideBar>
        <main>
            { children }
        </main>
    </>
  )
}
