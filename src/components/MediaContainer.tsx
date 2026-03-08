export default function MediaContainer({
  id = "",
  type = "grid-container",
  children
}: {
  id?: string,
  type?: "horizontal-container" | "grid-container",
  children: React.ReactNode
}
) {
  return (<>
    {type === "grid-container" &&
      <div id={id} className="grid-container grid grid-cols-3 gap-x-3 gap-y-5 pb-4 sm:gap-x-4 md:grid-cols-4 md:gap-x-5 md:gap-y-6 lg:grid-cols-5 xl:grid-cols-6">
        {children}
      </div>
    }

    {type === "horizontal-container" &&
      <div id={id} className="horizontal-container flex overflow-x-auto overflow-y-visible gap-2 sm:gap-4 md:gap-5 px-8 -mx-5 md:-mx-10 pb-52 pt-14 -mb-52 -mt-14 *:shrink-0 *:w-36 md:*:w-52">
        {children}
      </div>
    }
  </>)
}