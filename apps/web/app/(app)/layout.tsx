import { Header } from '@/components/common/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className='py-[52px] container h-full w-full'>{children}</div>
    </>
  )
}
