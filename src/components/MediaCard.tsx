"use client"
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdStar, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface MediaCardProps {
  item?: any;
  isMovie?: boolean;
  layoutType?: "grid" | "horizontal";
  showInfo?: boolean;
  tmdbId?: string | number | null;
  mediaTitle?: string | null;
  releaseYear?: string | number | null;
  posterPath?: string | null;
  showWatchlistBtn?: boolean;
}

// Modified to Handle when item object is passed, or (for watchlist items) when instead tmdbId, title, releaseYear, posterPath are passed.
export default function MediaCard({
  item = null,
  isMovie,
  layoutType = "grid",
  showInfo = false,
  tmdbId = null,
  mediaTitle = null,
  releaseYear = null,
  posterPath = null,
  showWatchlistBtn = false
}: MediaCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isTrailerShown, setIsTrailerShown] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState(false)  // Cache to prevent repeated fetch requests
  const [alignment, setAlignment] = useState("center")

  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const title = mediaTitle || (isMovie ? item?.title : item?.name)
  const linkPath = `/${isMovie ? "movie" : "tv"}/${tmdbId || item?.id}`
  const rating = item?.vote_average ? item.vote_average.toFixed(1) : null

  let year: string | number
  if (!releaseYear) {
    const releaseDate = isMovie ? item?.release_date : item?.first_air_date
    year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'
  } else {
    year = releaseYear
  }

  // Use placeholder size based on approximate card size
  const placeholderWidth = layoutType === 'horizontal' ? 130 : 140
  const placeholderHeight = placeholderWidth * 1.5 // For 2:3 ratio
  const posterSrc = posterPath || item?.poster_path
    ? `${IMAGE_BASE_URL}w342${posterPath || item.poster_path}`
    : PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight)

  useEffect(() => {
    let timer: NodeJS.Timeout
    // To prevent state updates if unmounted/stopped hovering, make this false in cleanup function
    let isActive = true

    if (isHovering) {
      timer = setTimeout(async () => {
        // If we already have key and it is not unavailable then just show it
        if (trailerKey && trailerKey !== "unavailable") {
          if (isActive) setIsTrailerShown(true)
          return
        }

        // If we haven't fetched yet, fetch it
        if (!hasFetched) {
          const type = isMovie ? "movie" : "tv"
          const id = tmdbId || item?.id

          try {
            const response = await fetch(`/api/${type}/${id}?append_to_response=videos`)
            if (!response.ok) throw new Error("Fetch failed!")
            const data = await response.json()
            const trailer = data.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')

            // Check isActive before setting state
            if (isActive) {
              setHasFetched(true)
              if (trailer) {
                setTrailerKey(trailer.key)
                setIsTrailerShown(true)
              } else {
                setTrailerKey("unavailable")
              }
            }
          } catch (err) {
            console.error(err)
            // Don't retry if failed
            if (isActive) setHasFetched(true)
          }
        }
      }, 1000)
    } else {
      setIsTrailerShown(false)
    }

    // Cleanup: clear timeout and make isActive false
    return () => {
      clearTimeout(timer)
      isActive = false
      setIsMuted(true) // Set muted true when stop hovering
    }
  }, [isHovering, trailerKey, hasFetched, isMovie, tmdbId, item])

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    setIsHovering(true)

    // calculate anignment on mouse enter
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const viewportWidth = window.innerWidth

    // how much card will overflow out when its on left or right when expanded
    // expansion is (16/9 / 2/3)
    // expanded width = 2.66 * rect.width 
    // overhang = (expanded width - w)/2 = (2.66w - w)/2 = 0.83 * w 
    const overhang = 0.83 * rect.width

    // try doing overhang + abt 20px or 50px
    if (rect.left < overhang + 20) {
      setAlignment("left") // when too close to left edge
    } else if (viewportWidth - rect.right < overhang ) {
      setAlignment("right") // when too close to right edge
    } else {
      setAlignment("center")
    }
  }

  // Get tailwind css classes for positioning based on calculated state
  function getPositionClasses() {
    if (alignment === "left") {
      return "left-0 origin-left"
    } else if (alignment === "right") {
      return "right-0 origin-right"
    } else {
      // For center, we only want the transform when expanded, 
      // but we need left-1/2 to anchor it to the middle.
      // To keep it simple in idle state, left-0 is fine, but for expansion:
      return isTrailerShown
        ? "left-1/2 -translate-x-1/2 origin-center"
        : "left-0 origin-center"
    }
  }

  function toggleMute(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation() // To prevent link navigation

    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Send command to YouTube Iframe
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: (isMuted ? "unMute" : "mute"), args: [] }),
        "*"
      )
      setIsMuted(!isMuted)
    }
  }

  // Close hover card on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (isHovering) setIsHovering(false)
  //   }
  //   window.addEventListener('scroll', handleScroll, true)
  //   return () => window.removeEventListener('scroll', handleScroll, true)
  // }, [isHovering])

  return (
  // Outer container - maintains 2/3 size in grid
  <Link
    href={linkPath}
    className={`relative aspect-2/3 hover:z-50 ${isHovering && "z-50"}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={() => setIsHovering(false)}
    onBlur={() => setTimeout(() => (setIsHovering(false)), 200)}
  >
    {/* Absolute container - which expands */}
    <div
      className={twMerge(
        "absolute top-0 block h-full rounded-lg bg-gray-800 transition-all duration-300 ease-in-out shadow-md group", isHovering && "z-50 scale-105 md:scale-115 shadow-black/40",
        getPositionClasses(),
        isTrailerShown
          // w 266.66% because it changes from 16/9 to 2/3 which is 2.66
          ? `w-[266.66%] scale-80 sm:scale-100 -translate-y-6 sm:translate-y-0 md:h-full`
          : `w-full`
      )
      }
    >
      {/* Content container for image and trailer iframe */}
      <div className={`relative w-full h-full overflow-hidden ${isHovering ? "rounded-t-lg" : "rounded-lg"}`}>
        {isHovering &&
          <div className={`w-full h-full bg-black relative ${isTrailerShown ? "block" : "hidden"}`}>
            <iframe
              ref={iframeRef}
              className='absolute -translate-y-[25%] w-full h-[200%] pointer-events-none'
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&enablejsapi=1`}
              title="Trailer"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            {/* Mute Button */}
            {isTrailerShown && (
              <button
                onClick={toggleMute}
                className="absolute top-3 right-3.5 z-30 p-2 bg-black/20 hover:bg-black/50 rounded-full text-white transition-colors duration-200 cursor-pointer group/muteBtn *:opacity-80 *:group-hover/muteBtn:opacity-100 *:transition-all *:duration-200"
              >
                {isMuted
                  ? <MdVolumeOff size={20} />
                  : <MdVolumeUp size={20} />
                }
              </button>
            )}
          </div>
        }
        <Image
          src={posterSrc}
          alt={title || ""}
          className="block w-full h-auto aspect-2/3 object-cover bg-gray-700"
          height={342}
          width={513}
          unoptimized={!(posterPath || (item && item.poster_path))}
        />
      </div>

      {isHovering &&
        <div
          className={`px-3 py-2.5 top-full -mt-0.5 absolute left-0 right-0 transition-opacity duration-200 bg-gray-900 rounded-b-lg -z-1 shadow shadow-black/80`}
        >
          <h3 className={`font-bold overflow-hidden line-clamp-2 ${isTrailerShown && "text-lg"}`} title={title}>{title}</h3>

          <div className="mt-2 mb-px flex items-center gap-3 text-gray-400 font-medium">
            <div className="text-xs">{year}</div>
            {rating &&
              <div className="flex items-center gap-1 text-xs">
                <MdStar className="text-amber-400 size-3 mb-0.5" />
                <span className="font-">{rating !== 'N/A' ? rating : 'No Rating'}</span>
              </div>
            }
          </div>

          {isTrailerShown && <p className="text-gray-200 text-sm mt-2 line-clamp-3 text-ellipsis">{item?.overview}</p>}
        </div>
      }
    </div>
  </Link>
  )
}
