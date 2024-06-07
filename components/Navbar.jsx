import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    
    <nav className="bg-white border-b border-gray-400 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
            <div class="block w-auto">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white hover:text-blue-400 md:dark:text-blue-500 " aria-current="page">Home</Link>
                </li>
                <li>
                <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white hover:text-blue-400 md:dark:text-blue-500" aria-current="page" >TicTacToe</Link>
                </li>
                <li>
                <Link href="/graphing" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white hover:text-blue-400 md:dark:text-blue-500" aria-current="page">Graphing</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    
    
  )
}

export default Navbar