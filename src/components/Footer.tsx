import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900/30 backdrop-blur-xl text-gray-500 text-center p-4 mt-48 bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0 items-center px-10 pb-2">
        <div className="flex flex-col items-start gap-3">
          <span className="md:block hidden font-bold text-lg hover:text-gray-300 duration-150"><Link href="/">NextWatch</Link></span>
          <nav>
            <ul className="flex justify-center gap-4 *:hover:text-gray-300 *:duration-150">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Terms</Link></li>
              <li><Link href="#">Privacy</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <span className="whitespace-pre flex flex-col md:items-end gap-2">
          <span>Data provided by TMDB</span>
          <span>Made with ❤️ in India</span>
        </span>
      </div>
    </footer>
  )
}