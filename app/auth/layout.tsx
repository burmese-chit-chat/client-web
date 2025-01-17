import React from 'react';
import NavBar from "@/app/auth/components/nav-bar";
export default function layout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <NavBar></NavBar> 
      <main>
        {children}
      </main>
    </>
  )
}
