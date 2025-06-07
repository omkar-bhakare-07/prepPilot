"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
function Header() {

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, [])

  const onDashboard = () => {
    router.push('/dashboard')
  }
  const onQuestions = () => {
    router.push('/questions')
  }
  const onUpgrade = () => {
    router.push('/upgrade')
  }
  const onHowItWorks = () => {
    router.push('/howitworks')
  }
  

  return (
    <div className='flex p-4 items- center justify-between bg-secondary shadow-sm '>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`
        } onClick={onDashboard}>Dashboard</li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/questions' && 'text-primary font-bold'}`
        }onClick={onQuestions}>Questions</li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/upgrade' && 'text-primary font-bold'}`
        }onClick={onUpgrade}>Upgrade</li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/howitworks' && 'text-primary font-bold'}`
        }onClick={onHowItWorks}>How it works</li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
