import { IoMdClose } from 'react-icons/io';
import { useEffect } from 'react';

export default function Modal({isOpen, onClose, children}) {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden'

      // add event listener for Escape key
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape);

      // Cleanup function
      return () => {
        document.body.style.overflow = '' // Re-enable body scroll
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      // Re-enable scroll if modal closes
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])


  if (!isOpen) return null
  return (
    <div
      className='fixed inset-0 z-1010 flex items-center justify-center bg-black/80'
      onClick={onClose}
    >
      <button
        className='absolute md:right-10 md:top-20 right-2 top-14 z-60 cursor-pointer text-white/60 hover:text-white hover:bg-gray-700/80 p-2 rounded-full transition'
        onClick={onClose}
      >
        <IoMdClose className="size-7" />
      </button>

      {children}
    </div>
  )
}
