export default function Loading() {
  return (
    <div
      // className="flex justify-center items-center h-[calc(100vh-60px)]"
      className="my-auto -translate-y-20 text-center"
    >
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-700"></div> */}
      <span className="shimmer-text text-white text-2xl">Loading...</span>
    </div>
  );
}

