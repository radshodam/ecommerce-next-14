import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "E-Commerce - Radshodam",
  description: "Radshodam is your one-stop destination for a premium online shopping experience. Discover a wide range of high-quality products, from fashion and electronics to home decor and more. With a user-friendly interface, secure transactions, and reliable delivery services, we strive to make your online shopping journey convenient and enjoyable. Explore our curated collection....",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='m-auto min-w-[300px] max-w-7xl p-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
