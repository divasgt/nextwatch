"use client";
import Link from "next/link";
import HeaderButton from "./HeaderButton";
import HeaderSearchBox from "./HeaderSearchBox";
import { Suspense, useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MdSearch } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import HeaderAuthSection from "./HeaderAuthSection";

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const mobileSearchInputRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      // check if scroll vertical position > 40px
      setScrolled(window.scrollY > 40)
    }

    // call function once, used for when page is loaded scrolled down.
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus()
    }
  }, [isMobileSearchOpen])

  return (
    <header className={`header fixed top-0 w-screen z-1000 ${scrolled ? "border-b border-gray-500/10" : "border-none"}`}>
      {/* Background with blur effect */}
      <div className={`absolute inset-0 transition-colors ${scrolled ? "bg-gray-900/70 backdrop-blur-xl" : "bg-transparent"}`}></div>

      {/* Header flex-row content */}
      <div className="relative text-gray-400 font-medium flex justify-between items-center px-4 sm:px-9 py-2.5">

        <div className="header-left shrink-0">
          <nav className="nav-links flex gap-5 items-center shrink-0 mr-8">
            <Link href="/" className="logo text-2xl tracking-tighter font-bold mr-2 bg-gradient-to-r from-red-500 to-orange-800 bg-clip-text text-transparent">NextWatch</Link>

            {/* Links for md screens */}
            <div className="hidden md:flex gap-5 items-center">
              <Link href="/#intro-section" className="hover:text-white transition">Home</Link>
              <Link href="/movie" className="hover:text-white transition">Movies</Link>
              <Link href="/tv" className="hover:text-white transition">TV Shows</Link>
            </div>

            {/* Browse dropdown for md screens */}
            <div className="relative md:hidden">
              <button
                onClick={() => setIsBrowseOpen(!isBrowseOpen)}
                onBlur={() => setTimeout(() => setIsBrowseOpen(false), 150)}
                className={`hover:text-white transition-all flex items-center cursor-pointer ${isBrowseOpen && "text-white"}`}
              >
                Browse
                <MdArrowDropDown className="size-5" />
              </button>

              <div className={`absolute top-full left-0 mt-2 bg-gray-900/70 backdrop-blur-xl rounded-md shadow-lg w-40 z-10 border border-gray-500/10 overflow-hidden transition-all ${isBrowseOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <Link href="/#intro-section" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white" onClick={() => setIsBrowseOpen(false)}>Home</Link>
                <Link href="/movie" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white" onClick={() => setIsBrowseOpen(false)}>Movies</Link>
                <Link href="/tv" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white" onClick={() => setIsBrowseOpen(false)}>TV Shows</Link>
              </div>
            </div>
          </nav>
        </div>


        <div className="header-right flex items-center gap-3 sm:gap-5 flex-grow justify-end *:text-nowrap">
          {/* Search bar for lg screens */}
          <div className="hidden lg:flex flex-grow justify-end">
            <Suspense>
              <HeaderSearchBox />
            </Suspense>
          </div>

          {/* Search icon for <lg screens */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="lg:hidden hover:opacity-80 active:opacity-80 text-white p-1.5 cursor-pointer"
          >
            <MdSearch className="size-5" />
          </button>

          {/* Links for medium/large screens */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/cinema-ai">
              <HeaderButton className="bg-gradient-to-r from-orange-700 to-red-800 transition-all duration-200 transform hover:scale-105">Cinema AI</HeaderButton>
            </Link>

            <Link href="/watchlist">
              <HeaderButton className="bg-gray-700 hover:bg-gray-600"> Watchlist</HeaderButton>
            </Link>

            <HeaderAuthSection />
          </div>

          {/* More dropdown for small screens */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              onBlur={() => setTimeout(() => setIsMoreMenuOpen(false), 200)}
              className="text-white hover:opacity-80 active:opacity-80 p-1.5 cursor-pointer"
            >
              <BsThreeDotsVertical className="size-5" />
            </button>

            <div className={`absolute top-full right-0 mt-2 bg-gray-900/70 backdrop-blur-xl rounded-md shadow-lg w-32 z-10 border border-gray-500/10 overflow-hidden transition-all ${isMoreMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
              <Link href="/cinema-ai" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white" onClick={() => setIsMoreMenuOpen(false)}>Cinema AI</Link>

              <Link href="/watchlist" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white" onClick={() => setIsMoreMenuOpen(false)}>Watchlist</Link>

              <div className="border-t border-gray-500/20 mb-1"></div>

              <div className="px-4 py-2">
                <HeaderAuthSection />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Search Overlay in header below flex-row content */}
      {isMobileSearchOpen && (
        <div
          className="w-full pb-3 pt-1 px-4 md:px-40"
          onBlur={() => setIsMobileSearchOpen(false)}
        >
          <HeaderSearchBox
            className="max-w-full lg:hidden"
            showCloseButton={true}
            onClose={() => setIsMobileSearchOpen(false)}
            inputRef={mobileSearchInputRef}
          />
        </div>
      )}
    </header>
  )
}