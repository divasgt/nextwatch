"use client"
import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge"

interface AlertPopupProps {
  message: React.ReactNode | string;
  duration?: number;
  className?: string;
}

export default function AlertPopup({
  message,
  duration = 2500,
  className = ""
}: AlertPopupProps) {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (message) {
      setShowAlert(true)

      const timer = setTimeout(() => {
        setShowAlert(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration])

  return (
    <div
      className={twMerge(
        `fixed flex items-center top-20 right-5 max-w-80 md:left-auto md:max-w-96 z-20 justify-center md:justify-start pl-4 pr-3 py-2 bg-gray-700 backdrop-blur-xl text-white text-sm md:text-base rounded-md border border-gray-400/10 shadow-black shadow-xl transition-all duration-300 ease-in-out ${showAlert ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`, className
      )}
    >
      {message}
      <button
        onClick={() => setShowAlert(false)}
        className="ml-2 text-gray-400 cursor-pointer hover:text-white hover:bg-gray-600 rounded-md p-1 transition-colors"
      >
        <MdClose className='size-4' />
      </button>
    </div>
  )
}
