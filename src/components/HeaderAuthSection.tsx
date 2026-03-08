"use client"

import { useAuth } from "@/hooks/useAuth"
import HeaderButton from "./HeaderButton"
import Link from "next/link"
import { useState } from "react"
import AlertPopup from "./AlertPopup"
import { BiSolidUser } from 'react-icons/bi'

export default function HeaderAuthSection() {
  const { user, loading, signOut } = useAuth()
  const [alertMessage, setAlertMessage] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    setAlertMessage('')
    try {
      await signOut()
      // router.push('/')
      window.location.reload()
    } catch (error) {
      setAlertMessage('Error signing out: ' + error.message)
    }
  }

  if (loading) return null

  return (
  <>
    {user ?
      <>
      {/* Layout for small screens (inside more dropdown) */}
      <div className="flex flex-col md:hidden *:self-start gap-4 justify-between w-full overflow-hidden">
        <div className="flex items-center gap-2 pointer-events-none">
          <BiSolidUser className="size-5 rounded-full text-gray-300"/>
          <span className="text-sm text-gray-300 overflow-hidden text-ellipsis">{user.email.split('@')[0]}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-white bg-gray-700 hover:bg-gray-600/80 cursor-pointer px-3.5 py-1.25 rounded-md transition"
        >Sign Out</button>
      </div>

      {/* Layout for md or bigger screens */}
      <div className="relative hidden md:block">
        <button
          onClick={() => setIsDropdownOpen(prev => !prev)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
          className="flex items-center gap-2 text-sm text-white cursor-pointer px-1.5 py-1.25 rounded-full transition bg-gray-700 hover:bg-gray-600 "
        >
          <BiSolidUser className="size-5 rounded-full"/>
        </button>

        {/* Dropdown for sign out button */}
        <div className={`absolute top-full right-0 mt-2 bg-gray-800/90 backdrop-blur-xl rounded-md shadow-lg z-10 border border-gray-500/10 w-fit px-4 py-2 flex flex-col gap-3 overflow-hidden transition-all ${isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>

          <div className="flex items-center gap-2 pointer-events-none">
            <BiSolidUser className="size-5 rounded-full text-gray-300"/>
            <span className="text-sm text-gray-300">{user.email.split('@')[0]}</span>
          </div>

          <button
            onClick={handleSignOut}
            className="text-sm text-white bg-gray-700 hover:bg-gray-600/80 cursor-pointer px-3.5 py-1.25 rounded-md transition"
          >Sign Out</button>
          </div>
      </div>
      </>
      :
      <Link href={"/signin"}>
        <HeaderButton className="bg-gray-700 hover:bg-gray-600">Sign In</HeaderButton>
      </Link>
    }

    <AlertPopup message={alertMessage} />
  </>
  )
}
