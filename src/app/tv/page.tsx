import H2ForSection from "@/components/H2ForSection";
import MediaContainer from "@/components/MediaContainer";
import MediaCard from "@/components/MediaCard";
import { fetchFromTmdb } from "@/lib/tmdb";

export default async function MoviePage() {
  let latestTvData = []
  let popularTvData = []
  let topTvData = []

  try {
    const latestTvRes = await fetchFromTmdb("/tv/on_the_air", { language: "en-US", page: 1 })
    const popularTvRes = await fetchFromTmdb("/tv/popular", { language: "en-US", page: 1 })
    const topTvRes = await fetchFromTmdb("/tv/top_rated", { language: "en-US", page: 1 })
    latestTvData = latestTvRes.results
    popularTvData = popularTvRes.results
    topTvData = topTvRes.results

  } catch (err) {
    console.error("Error fetching data:", err)
    throw err // Nearest Error.jsx page will be shown
  }

  return (
    <main className="w-full mx-auto px-5 md:px-10 py-8 *:scroll-mt-20">
      <section className="mb-14">
        <H2ForSection title="Latest TV Shows" />
        <MediaContainer type="horizontal-container" id="latestTv" >
          {latestTvData.map((item: any) => (
            <MediaCard key={item.id} item={item} isMovie={false} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Popular TV Shows" />
        <MediaContainer type="horizontal-container" id="popularTv" >
          {popularTvData.map((item: any) => (
            <MediaCard key={item.id} item={item} isMovie={false} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Top Rated TV Shows" />
        <MediaContainer type="horizontal-container" id="topTv" >
          {topTvData.map((item: any) => (
            <MediaCard key={item.id} item={item} isMovie={false} layoutType="horizontal" />
          ))}
        </MediaContainer>
      </section>
    </main>
  )
}
