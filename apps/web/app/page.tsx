import { Button } from '@camped-ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@camped-ui/card'
import Head from 'next/head'
import React from 'react'

import { Greeting } from '@/components/greeting'

function Home() {
  return (
    <>
      <Head>
        <title>Readme by IngeniousClan</title>
        <meta name='description' content='Tools' />
      </Head>
      <div className='mt-4'>
        <Greeting />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <Card className='bg-secondary'>
          <CardHeader>
            <CardTitle>Collaborate Effectively with Your Team</CardTitle>
            <CardDescription>
              Invite your teammates to maximize collaboration and leverage
              Readme&apos;s powerful features together.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Invite Team Members</Button>
          </CardFooter>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        <div>
          <Card className='h-[200px]'></Card>
          <p className='leading-7 mt-2'>Create a New Readme File</p>
        </div>
        <div>
          <Card className='h-[200px]'></Card>
          <p className='leading-7 mt-2'>Readme for Package</p>
        </div>
        <div>
          <Card className='h-[200px]'></Card>
          <p className='leading-7 mt-2'>Readme for Command-Line Tool</p>
        </div>
        <div>
          <Card className='h-[200px]'></Card>
          <p className='leading-7 mt-2'>Readme for Web Application</p>
        </div>
        <div>
          <Card className='h-[200px]'></Card>
          <p className='leading-7 mt-2'>Readme for Open Source Project</p>
        </div>
        <div>
          <Card className='h-[200px]'></Card>
          <p className='leading-7 mt-2'>Readme for Game Development</p>
        </div>
      </div>

      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mt-4'>
        Insights
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
        <Card>
          <CardHeader>
            <CardTitle>Readme 101</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button variant='link' className='px-0'>
              Explore
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Home
