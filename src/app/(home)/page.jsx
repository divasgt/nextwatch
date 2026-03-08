import MediaContainer from "@/components/MediaContainer";
import MediaCard from "@/components/MediaCard";
import { fetchFromTmdb } from "@/lib/tmdb";
import H2ForSection from "@/components/H2ForSection";

export default async function Home() {
	let latestMoviesData = []
	let latestTVShowsData = []
	let topMoviesData = []
	let topTVShowsData = []
	
	try {
		const [latestMoviesResponse, latestTvResponse, topMoviesResponse, topTvResponse] = await Promise.all([
			fetchFromTmdb("/movie/now_playing", {language : "en-US", page : 1}),
			fetchFromTmdb("/tv/on_the_air", {language : "en-US", page : 1}),
			fetchFromTmdb("/movie/top_rated", {language : "en-US", page : 1}),
			fetchFromTmdb("/tv/top_rated", {language : "en-US", page : 1}),
		]);

		// Check responses
		// for (const res of responses) {
		// 	if (!res.ok) {
		// 		throw new Error(`API failed with status ${res.status}`)
		// 	}
		// }

		// const [latestMovies, latestTv, topMovies, topTv] = await Promise.all(
		// 	responses.map(res => res.json())
		// );

		latestMoviesData = latestMoviesResponse.results
		latestTVShowsData = latestTvResponse.results
		topMoviesData = topMoviesResponse.results
		topTVShowsData = topTvResponse.results
	} catch (err) {
		console.error("Error fetching cinema data: ", err)
		throw err // the nearest error.jsx page will be shown
	}

	return (
	<main className="w-full mx-auto px-5 md:px-10 py-8 *:scroll-mt-20">
		<section id="intro-section" className="intro-section flex flex-col text-center rounded-xl py-10 md:py-20 md:px-8 mb-8">
			<h1 className="intro-title text-2xl md:text-4xl font-bold text-white mb-4">Your One-Stop Website for All Things Cinema</h1>
			<p className="intro-text text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto">
				Explore a vast collection of movies and TV shows,
				from the latest blockbusters to timeless classics.
			</p>
		</section>

		<section id="latestMovies" className="my-14">
			<H2ForSection title="Latest Movies" />	
			<MediaContainer>
				{latestMoviesData.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={true} layoutType="grid" />
				))
				}
			</MediaContainer>
		</section>

		<section id="latestTVShows" className="my-14">
			<H2ForSection title="Latest TV Shows" />
			<MediaContainer>
				{latestTVShowsData.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={false} layoutType="grid" />
				))
				}
			</MediaContainer>
		</section>

		<section id="topMovies" className="my-14">
			<H2ForSection title="Top Rated Movies" />
			<MediaContainer type="horizontal-container">
				{topMoviesData.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
				))
				}
			</MediaContainer>
		</section>

		<section id="topTVShows" className="my-14">
			<H2ForSection title="Top Rated TV Shows" />
			<MediaContainer type="horizontal-container">
				{topTVShowsData.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={false} layoutType="horizontal" />
				))
				}
			</MediaContainer>
		</section>
	</main>
	);
}
