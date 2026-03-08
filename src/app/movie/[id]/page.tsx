import MediaDetailsPageComponent from "@/components/media-details-page/MediaDetailsPageComponent"

export default async function MoviePage({ params }: any) {
  const { id } = await params

  return (
    <main className="main-content">
      <MediaDetailsPageComponent type="movie" id={id} />
    </main>
  )
}
