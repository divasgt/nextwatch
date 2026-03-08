import MediaCard from "../MediaCard";

interface SimilarItem {
  id: number;
  poster_path: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

export default function Similars({ data, type }: {data: SimilarItem[], type: "movie" | "tv"}) {
  return (<>
    {data.map(item => (
      <MediaCard
        key={item.id}
        item={item}
        isMovie={type === "movie"}
        layoutType="horizontal"
      />
    ))}
  </>)
}
