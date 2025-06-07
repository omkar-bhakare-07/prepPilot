import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'

export const metadata = {
  title: {
    default: "prepPilot",
    template: "%s",
    absolute:"prepPilot",
  },
  icons: {
    icon: '/tabLogo.svg',
  },
}

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content grows to push the footer down */}
      <main className="flex-grow mx-5 md:mx-20 lg:mx-36">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default DashboardLayout
