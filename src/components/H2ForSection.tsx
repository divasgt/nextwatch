import { twMerge } from "tailwind-merge"

export default function H2ForSection({title, className=""}: {title: string, className?: string}) {
  return (
  <h2
    className={twMerge("text-2xl font-semibold mb-6 pb-2 border-b-2 border-red-600 inline-block", className)}
  >{title}</h2>
  )
}