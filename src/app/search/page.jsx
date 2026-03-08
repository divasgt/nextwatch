"use client"
import H2ForSection from "@/components/H2ForSection"
import MediaCard from "@/components/MediaCard"
import MediaContainer from "@/components/MediaContainer"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"


export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ""
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const CACHE_KEY = "searchResults"
  const CACHE_QUERY_KEY = "searchQuery"

  useEffect(() => {
    async function fetchSearchResults() {
      if (query) {
        // Check if we have cached results for this query
        const cachedQuery = sessionStorage.getItem(CACHE_QUERY_KEY)
        const cachedResults = sessionStorage.getItem(CACHE_KEY)
        if (cachedQuery === query && cachedResults) {
          // Use cached results instead of refetching
          setSearchResults(JSON.parse(cachedResults))
          console.log("Using cached search results for query:", query)
          return
        }

        setIsLoading(true)
        try {
          const res = await fetch(`/api/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`)
          const data = await res.json()
          setSearchResults(data.results)

          // Cache the results and query
          sessionStorage.setItem(CACHE_QUERY_KEY, query)
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.results))

          console.log("Fetched search results data: ", data)
        } catch (err) {
          console.error("Error fetching search results:", err)
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        // If query is empty, clear search results and cache
        setSearchResults([])
        sessionStorage.removeItem(CACHE_KEY)
        sessionStorage.removeItem(CACHE_QUERY_KEY)
      }
    }
    fetchSearchResults()
  }, [query])

  return (
    <main className="w-full mx-auto px-5 md:px-10 lg:px-24 py-14">
      <H2ForSection title="Search Results" />
      {isLoading ?
        <Loading />
        :
        (searchResults.length > 0 && query) ?
          <MediaContainer>
            {searchResults.map(item => (
              ["movie", "tv"].includes(item.media_type) && <MediaCard key={item.id} item={item} isMovie={item.media_type === "movie"} layoutType="grid" showInfo={true} />
            ))
            }
          </MediaContainer>
          : (query && searchResults.length === 0) ?
            <div className="mt-24 grid-span text-center text-xl">No results found for your query.</div>
            :
            <div className="mt-24 grid-span text-center text-xl">Search any movie, tv show or anime etc.</div>
      }
    </main>
  )
}

function Loading() {
  return (
    <div className="mt-24 text-center font-semibold text-xl">
      <span className="shimmer-text">Searching...</span>
    </div>
  )
}