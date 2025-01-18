import React from 'react'

export default function layout({ children } : { children : React.ReactNode}) {
  return (
    <>
        <h1>Protected routes layout</h1>
        <main>
            { children }
        </main>
    </>

  )
}
