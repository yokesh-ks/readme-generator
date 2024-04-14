'use client'

import { useState } from 'react'

export const Greeting = ({ user }: { user?: any | undefined }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  const hour = new Intl.DateTimeFormat('en-US', {
    hour12: false,
    hour: 'numeric',
  }).format(currentTime)

  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(currentTime)

  const weekDay = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(currentTime)

  const timeString = new Intl.DateTimeFormat('en-US', {
    timeZone: user?.user_timezone,
    hour12: false, // Use 24-hour format
    hour: '2-digit',
    minute: '2-digit',
  }).format(currentTime)

  const updateTime = () => {
    setCurrentTime(new Date())
  }
  setInterval(updateTime, 60000)

  const greeting =
    parseInt(hour, 10) < 12
      ? 'morning'
      : parseInt(hour, 10) < 18
      ? 'afternoon'
      : 'evening'

  return (
    <div>
      {user?.first_name || user?.last_name ? (
        <h3 className='text-2xl font-semibold'>
          Good {greeting}, {user?.first_name} {user?.last_name}
        </h3>
      ) : (
        <h3 className='text-2xl font-semibold'>Good {greeting}, Guest</h3>
      )}

      <h6 className='text-custom-text-400 flex items-center gap-2 font-medium'>
        <div>
          {greeting === 'morning'
            ? '🌤️'
            : greeting === 'afternoon'
            ? '🌥️'
            : '🌙️'}
        </div>
        <div>
          {weekDay}, {date} {timeString}
        </div>
      </h6>
    </div>
  )
}
