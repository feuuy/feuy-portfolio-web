import React from 'react'
import '../globals.css'

export const metadata = {
  description:
    'A calm, credibility-first portfolio for a designer-developer shipping precise, production-ready digital work.',
  title: 'FEUY Portfolio',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
