import React from 'react'
import Header from '../dashboard/_components/Header'
import Footer from '../dashboard/_components/Footer'

export const metadata = {
  title: 'prepPilot',
  icons: {
    icon: '/tabLogo.svg',
  },
}

function UpgradeLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
    <Header />

    <main className="flex-grow mx-5 md:mx-20 lg:mx-36">
      {children}
    </main>

    <Footer />
  </div>
  )
}

export default UpgradeLayout
