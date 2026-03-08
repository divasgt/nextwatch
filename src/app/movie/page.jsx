import H2ForSection from "@/components/H2ForSection";
import MediaContainer from "@/components/MediaContainer";
import MediaCard from "@/components/MediaCard";
import { fetchFromTmdb } from "@/lib/tmdb";

export default async function MoviePage() {
  let latestMoviesData = []
  let popularMoviesData = []
  let topMoviesData = []
  let upcomingMoviesData = []

  try {
    const latestMoviesRes = await fetchFromTmdb("/movie/now_playing", { language: "en-US", page: 1 })
    const popularMoviesRes = await fetchFromTmdb("/movie/popular", { language: "en-US", page: 1 })
    const topMoviesRes = await fetchFromTmdb("/movie/top_rated", { language: "en-US", page: 1 })
    const upcomingMoviesRes = await fetchFromTmdb("/movie/upcoming", { language: "en-US", page: 1 })
    latestMoviesData = latestMoviesRes.results
    popularMoviesData = popularMoviesRes.results
    topMoviesData = topMoviesRes.results
    upcomingMoviesData = upcomingMoviesRes.results

  } catch (err) {
    console.error("Error fetching data:", err)
    throw err // Nearest Error.jsx page will be shown
  }

  return (
    <main className="w-full mx-auto px-5 md:px-10 py-8 *:scroll-mt-20">
      <section className="mb-14">
        <H2ForSection title="Latest Movies" />
        <MediaContainer type="horizontal-container" id="latestMovies" >
          {latestMoviesData.map(item => (
            <MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Popular Movies" />
        <MediaContainer type="horizontal-container" id="popularMovies" >
          {popularMoviesData.map(item => (
            <MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Top Rated Movies" />
        <MediaContainer type="horizontal-container" id="topMovies" >
          {topMoviesData.map(item => (
            <MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Upcoming Movies" />
        <MediaContainer type="horizontal-container" id="upcomingMovies" >
          {upcomingMoviesData.map(item => (
            <MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>
    </main>
  )
}