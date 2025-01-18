import React from 'react'
import ThemeToggle from '@/app/components/theme-toggle'

export default function NavBar() {
  return (
    <header className='p-3'>
        <nav>
            <ThemeToggle></ThemeToggle>
        </nav>
    </header>
  )
}
