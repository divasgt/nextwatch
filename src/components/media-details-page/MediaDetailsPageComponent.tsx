import { fetchFromTmdb } from "@/lib/tmdb";
import Image from "next/image";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import TrailerBtn from "@/components/media-details-page/TrailerBtn";
import WatchlistBtn from "@/components/media-details-page/WatchlistBtn";
import AskAIBtn from "@/components/media-details-page/AskAIBtn";
import { notFound } from "next/navigation";
import { MdCalendarMonth } from 'react-icons/md';
import { HiClock } from 'react-icons/hi2';
import { MdStar } from 'react-icons/md';
import WatchProviders from "./WatchProviders";
import CastSection from "./CastSection";
import Similars from "./Similars";
import MediaContainer from "../MediaContainer";
import H2ForSection from "../H2ForSection";
import ScrollToTop from "@/components/ScrollToTop";

function getAgeRating(detailsData: any, type: 'movie' | 'tv') {
  if (type === "movie" && detailsData.release_dates) {
    const inRelease = detailsData.release_dates.results.find((r: any) => r.iso_3166_1 === 'IN')

    if (inRelease && inRelease.release_dates.length > 0) {
      return inRelease.release_dates[0].certification || 'NR'
    }
  } else if (type === 'tv' && detailsData.content_ratings) {
    const inRating = detailsData.content_ratings.results.find((r: any) => r.iso_3166_1 === 'IN')

    if (inRating) {
      return inRating.rating || 'NR'
    }
  }

  return detailsData.adult ? '18+' : 'All Ages'
}

export default async function MediaDetailsPageComponent({ type, id }: { type: 'movie' | 'tv', id: string }) {
  let detailsData: any
  try {
    detailsData = await fetchFromTmdb(`/${type}/${id}`, { append_to_response: "videos,release_dates,content_ratings,credits,keywords,similar,recommendations,external_ids,watch/providers" })
  } catch (err) {
    if (err instanceof Error && err.message.includes('404')) notFound()
    throw err // For other errors, the nearest error.jsx page will be shown
  }

  const name = detailsData.name || detailsData.title
  const releaseYear = Number((detailsData.release_date || detailsData.first_air_date || '').slice(0, 4))
  const ageRating = getAgeRating(detailsData, type)
  const lengthOrSeasons = type === 'movie'
    ? `${Math.floor(detailsData.runtime / 60)}h ${detailsData.runtime % 60}m`
    : `${detailsData.number_of_seasons} Season${detailsData.number_of_seasons > 1 ? 's' : ''}`
  const typeLabel = type === 'movie' ? 'Movie' : 'TV Show'

  const directors = detailsData.credits?.crew?.filter((crewMember: any) =>
    crewMember.job === 'Director'
  ).map((director: any) => director.name)

  const uniqueDirectors = [...new Set(directors)]

  const writersOrCreators = type === 'tv'
    ? detailsData.created_by?.map((creator: any) => creator.name) || []
    : detailsData.credits?.crew?.filter((crewMember: any) =>
      ['Writer', 'Screenplay', 'Story', 'Teleplay'].includes(crewMember.job)
    ).map((writer: any) => writer.name) || [];

  const uniqueWritersOrCreators = [...new Set(writersOrCreators)];

  const trailer = detailsData.videos.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')


  return (<div className="py-5 px-6 md:py-8 md:px-12 lg:py-10 lg:px-24 xl:py-12 xl:px-32 z-0">
    <ScrollToTop />
    {detailsData.backdrop_path ?
      <div className="fixed z-[-1] top-0 right-0 bottom-0 left-0 blur-3xl">
        <Image
          className="w-full h-full object-cover scale-110"
          src={`${IMAGE_BASE_URL}w1280${detailsData.backdrop_path}`}
          alt="Backdrop Image"
          width={1280}
          height={720}
          priority
        />
        <div className="absolute inset-[-20] bg-black/70"></div>
      </div>
      : ""
    }

    <div id="detailsContainer" className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-10 relative text-gray-300">

      <div className="rounded-lg overflow-hidden shadow-lg self-start md:max-w-full max-w-50">
        <Image
          className="w-full h-full object-cover"
          src={detailsData.poster_path ?
            `${IMAGE_BASE_URL}w342${detailsData.poster_path}` :
            PLACEHOLDER_IMAGE_URL(300, 450)}
          alt={detailsData.name || detailsData.title}
          width={300}
          height={450}
          priority
          unoptimized={!detailsData.poster_path}
        />
      </div>

      <div className="flex flex-col gap-3 md:gap-5 self-start min-w-0"> {/* Add min-w-0 here */}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight ml-[-3px]">{name} ({releaseYear})</h1>

        {/* Info: type, star rating, length, age rating */}
        <div className="flex items-center text-[16px] md:text-lg gap-2 md:gap-4 text-gray-400 font-medium flex-wrap mb-2 ml-1">
          <span className="text-red-600">{typeLabel}</span> •
          <span className="flex gap-1.5 items-center">
            <MdStar className="text-amber-500 size-6 mb-0.5" />
            <span className="text-md  tracking-wide">{detailsData.vote_average.toFixed(1)}</span>
          </span> •
          <span>{lengthOrSeasons}</span> •
          <span className="border border-gray-400 rounded px-2 py-0.5 text-sm">{ageRating}</span>
        </div>

        {/* Genres: */}
        <div className="flex flex-wrap gap-2 items-center mb-2">
          {detailsData.genres?.map(g => (
            <span className="bg-gray-700/50 border border-gray-500/10 backdrop-blur-xl py-0.5 px-3 rounded-full text-sm" key={g.id}>{g.name}</span>
          ))}
        </div>

        {/* <div className="flex items-baseline gap-2 text-lg mt-1 mb-2"> */}

        {/* <span className="text-sm text-gray-500">({detailsData.vote_count.toLocaleString()} votes)</span> */}
        {/* </div> */}


        <div className="flex self-start gap-4 flex-wrap mt-4 mb-3">
          <TrailerBtn trailer={trailer} />
          <WatchlistBtn tmdbId={id} title={name} type={type} year={releaseYear} posterPath={detailsData.poster_path || null} />
          {/* <AskAIBtn onClick={() => setShowAIChat(true)} /> */}
        </div>


        <span className="mb-6">
          <WatchProviders providers={detailsData['watch/providers']?.results?.IN} />
        </span>

        {/* {detailsData.tagline ? <p className="italic text-gray-300 -mb-4">"{detailsData.tagline}"</p> : null} */}
        {/* <h2 className="text-2xl font-semibold mt-4 text-white">Overview</h2> */}
        <p className="max-w-3xl">{detailsData.overview}</p>

        {(uniqueDirectors.length > 0 || uniqueWritersOrCreators.length > 0) && (
          <div className="mt-1 flex gap-1 md:gap-5 flex-wrap">

            {uniqueDirectors.length > 0 && (
              <div className="flex gap-2 mr-2 min-w-40">
                <span className="text-gray-500">Directors</span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                  title={uniqueDirectors.join(', ')}
                >{uniqueDirectors.join(', ')}</span>
              </div>
            )}

            {uniqueWritersOrCreators.length > 0 && (
              <div className="flex gap-2 min-w-40">
                <span className="text-gray-500">{type === "tv" ? "Creators" : "Writers"}</span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                  title={uniqueWritersOrCreators.join(', ')}
                >{uniqueWritersOrCreators.join(', ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    {detailsData.credits.cast.length > 0 &&
      <CastSection data={detailsData.credits.cast} />
    }

    {detailsData.similar.results.length > 0 &&
      <>
        <H2ForSection title="More like this" className="mt-16" />
        <MediaContainer type="horizontal-container">
          <Similars data={detailsData.similar.results} type={type} />
        </MediaContainer>
      </>
    }

    {detailsData.recommendations.results.length > 0 &&
      <>
        <H2ForSection title="You may also like" className="mt-16" />
        <MediaContainer type="horizontal-container">
          <Similars data={detailsData.recommendations.results} type={type} />
        </MediaContainer>
      </>
    }
  </div>)
}
