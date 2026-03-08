import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function MediaCardSkeleton({ count = 6, layoutType }: { count?: number, layoutType?: 'horizontal' }) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={twMerge(
        'bg-gray-600/20 backdrop-blur-xl rounded-lg overflow-hidden shadow-md animate-pulse',
        layoutType === 'horizontal' ? 'shrink-0 w-[200px]' : 'w-full'
      )}
    >
      {/* Placeholder for image */}
      <div className="w-full aspect-[2/3] bg-gray-700/40"></div>
      {/* Placeholder for text */}
      {/* <div className="p-3">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      </div> */}
    </div>
  ))

  return (
    skeletons
  )
}