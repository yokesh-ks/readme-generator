'use client'

import { buttonVariants } from '@camped-ui/button'
import { Input } from '@camped-ui/input'
import { Textarea } from '@camped-ui/textarea'
import React from 'react'

import { Icon } from '@tool-empire/icon'
import { cn } from '@tool-empire/utils'

import { Header } from '@/components/common/Header'

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!process.env.CONTACT_FORM_SUBMIT_URL) {
      return
    }
    const response = await fetch(process.env.CONTACT_FORM_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.CONTACT_FORM_ACCESS_KEY,
        name: e.target.name.value,
        subject: 'New Submission from Readme - IngeniousClan WebApp visitor',
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    })
    const result = await response.json()
    if (result.success) {
      // return toast.success(
      //   "The form has been submitted successfully. We will reply to you soon!",
      //   {
      //     position: toast.POSITION.BOTTOM_CENTER,
      //     hideProgressBar: true,
      //     closeButton: false,
      //   }
      // );
    }
  }

  return (
    <>
      <div className='flex flex-col md:flex-row w-full'>
        <div className='w-full min-h-[60vh]  flex flex-col px-4 pt-2 pb-8 md:px-0 md:py-2 justify-center items-center'>
          <div className='w-full items-center flex flex-col  mt-[20px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1
                className={`text-3xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-3xl lg:text-5xl mt-[100px] `}
              >
                Feel free to reach out!
              </h1>
              <p className='text-md text-muted-foreground  max-w-[360px] self-center py-4'>
                Got questions, feedback, or a friendly hello? Feel free to fill
                out the form below.
              </p>
            </div>
            <div className={cn('grid gap-6 w-full max-w-[360px]')}>
              <form onSubmit={handleSubmit}>
                <div className='grid gap-2'>
                  <div className='grid gap-1'>
                    <p className='text-md text-muted-foreground'>Name</p>
                    <Input
                      id='name'
                      placeholder='Your Name'
                      type='text'
                      autoCapitalize='none'
                      autoComplete='name'
                      autoCorrect='off'
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className='grid gap-1'>
                    <p className='text-md text-muted-foreground'>Email</p>
                    <Input
                      id='email'
                      placeholder='name@example.com'
                      type='email'
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className='grid gap-1'>
                    <p className='text-md text-muted-foreground'>Message</p>
                    <Textarea
                      id='message'
                      placeholder='How Can we help?'
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <button
                    className={cn(buttonVariants())}
                    disabled={isLoading}
                    type='submit'
                  >
                    {isLoading && (
                      <Icon
                        name='Loader2'
                        className='mr-2 h-4 w-4 animate-spin'
                      />
                    )}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
