'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdSearch } from 'react-icons/md';
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface HeaderSearchBoxProps {
  showCloseButton?: boolean;
  onClose?: (() => void) | null;
  className?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function HeaderSearchBox({
  showCloseButton = false,
  onClose = null,
  className = "",
  inputRef = null
}: HeaderSearchBoxProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<string | null>(searchParams.get('q') || null)
  const router = useRouter()

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }, 200) // 200ms delay
      return () => clearTimeout(timer)
    } else if (query === "") {
      router.push('/search')
    }
  }, [query, router])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    e.key === "Enter" ? router.push(`/search?q=${encodeURIComponent(query.trim())}`) : null
  }

  return (
    <div className={twMerge("flex w-full transition-all duration-400 items-center relative flex-grow max-w-56 focus-within:max-w-full", className)}>
      <span className="absolute left-4 opacity-80% cursor-pointer">
        <MdSearch className="size-4.25" />
      </span>

      <input
        type="text"
        placeholder="Search anything..."
        className="bg-gray-700/30 hover:bg-gray-800/70 focus:bg-gray-800/70 py-1 px-4 pl-12 pr-10 w-full  text-sm  rounded-md border border-gray-500/10 focus:border-gray-400/20 focus:border-2 inset-1 outline-none"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      // onClick={() => router.push('/search')}
      />
      {showCloseButton && (
        <button onClick={onClose} className="absolute right-3 text-gray-400 hover:text-white cursor-pointer">
          <IoMdClose className="size-5" />
        </button>
      )}
    </div>
  )
}
