export default function PageBg() {
  // from https://patterncraft.fun
  
  // style for parent div:bg-black fixed -z-1 top-0 right-0 bottom-0 left-0

  // return (
  // <div className="bg-black fixed -z-1 top-0 right-0 bottom-0 left-0 opacity-80">
  //   {/* Cosmic Noise */}
  //   <div
  //     className="absolute inset-0 z-0"
  //     style={{
  //       background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
  //     }}
  //   />
  //   {/* Your Content/Components */}
  // </div>
  // )

  return (
  <div className="bg-black fixed -z-1 top-0 right-0 bottom-0 left-0">
    {/* Dark Horizon Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
      }}
    />
    {/* Your Content/Components */}
  </div>
  )
  
}
