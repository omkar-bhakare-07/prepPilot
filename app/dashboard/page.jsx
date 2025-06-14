import {UserButton} from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

export const metadata = {
  title: 'prepPilot',
  icons: {
    icon: '/tabLogo.svg',
  },
}

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-grey-500">Create and start your AI interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview/>
      </div>

      <InterviewList/>
    </div>
  )
}

export default Dashboard
