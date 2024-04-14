'use client'

import { Button } from '@camped-ui/button'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export const Header = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className='border-b fixed w-full z-20 bg-background'>
      <div className='container flex flex-col sm:flex-row items-start sm:items-center w-full'>
        <div className='py-3 flex flex-1 items-center '>
          <Link href='/' className='mr-5 flex items-center' passHref>
            <p className={`ml-2 mr-4 text-lg font-semibold`}>Readme</p>
          </Link>
          <Link
            href='/'
            className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}
            passHref
          >
            <p>Home</p>
          </Link>

          <Link
            href='/template'
            className={`mr-5 text-sm ${
              pathname !== '/readme-generator' && 'opacity-60'
            } `}
            passHref
          >
            <p>Template</p>
          </Link>
        </div>
        <div className='flex sm:items-center pb-3 sm:p-0 gap-4'>
          <Button variant='outline' onClick={() => router.push('/contact')}>
            Feedback
          </Button>
        </div>
      </div>
    </nav>
  )
}
