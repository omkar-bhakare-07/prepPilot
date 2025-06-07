import React from 'react'

function Footer() {
  return (
     <footer className="w-full py-4 border-t text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} PrepPilot. All rights reserved.
    </footer>
  )
}

export default Footer
