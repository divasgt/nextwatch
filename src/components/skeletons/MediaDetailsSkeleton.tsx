import React from 'react';
import MediaCardSkeleton from './MediaCardSkeleton';

export default function MediaDetailsSkeleton() {
  return (
    <div className="py-5 px-6 md:py-8 md:px-12 lg:py-10 lg:px-24 xl:py-12 xl:px-32 z-0 animate-pulse">

      {/* Details Container */}
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-10 relative">

        {/* Poster Skeleton */}
        <div className="rounded-lg overflow-hidden shadow-lg self-start md:max-w-full max-w-50 w-full aspect-[2/3] bg-gray-700/40"></div>

        {/* Info Skeleton */}
        <div className="flex flex-col gap-3 md:gap-5 self-start min-w-0 w-full">
          {/* Title */}
          <div className="h-8 md:h-12 bg-gray-700/40 rounded w-3/4 mb-2"></div>

          {/* Metadata */}
          <div className="flex items-center gap-2 md:gap-4 mb-2 flex-wrap">
            <div className="h-4 w-12 bg-gray-700/40 rounded"></div>
            <div className="h-4 w-24 bg-gray-700/40 rounded"></div>
            <div className="h-4 w-16 bg-gray-700/40 rounded"></div>
            <div className="h-4 w-10 bg-gray-700/40 rounded"></div>
          </div>

          {/* Genres */}
          <div className="flex gap-2 mb-2 flex-wrap">
            <div className="h-6 w-20 bg-gray-700/40 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-700/40 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-700/40 rounded-full"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap mt-4 mb-3">
            <div className="h-11 w-36 bg-gray-700/40 rounded-lg"></div>
            <div className="h-11 w-11 bg-gray-700/40 rounded-full"></div>
          </div>

          {/* Watch Providers */}
          <div className="h-12 w-full max-w-md bg-gray-700/40 rounded mb-6"></div>

          {/* Overview */}
          <div className="space-y-2 max-w-3xl mb-6">
            <div className="h-4 w-full bg-gray-700/40 rounded"></div>
            <div className="h-4 w-full bg-gray-700/40 rounded"></div>
            <div className="h-4 w-11/12 bg-gray-700/40 rounded"></div>
            <div className="h-4 w-9/12 bg-gray-700/40 rounded"></div>
          </div>

          {/* Directors/Creators */}
          <div className="mt-1 flex gap-8">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-700/40 rounded"></div>
              <div className="h-4 w-32 bg-gray-700/40 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-700/40 rounded"></div>
              <div className="h-4 w-32 bg-gray-700/40 rounded"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Cast Section Skeleton */}
      <div className="mt-16">
        <div className="h-8 w-48 bg-gray-700/40 rounded mb-6"></div>
        <div className="flex gap-4 overflow-hidden">
          <MediaCardSkeleton count={6} layoutType="horizontal" />
        </div>
      </div>

      {/* More Like This */}
      <div className="mt-16">
        <div className="h-8 w-48 bg-gray-700/40 rounded mb-6"></div>
        <div className="flex gap-4 overflow-hidden">
          <MediaCardSkeleton count={6} layoutType="horizontal" />
        </div>
      </div>

    </div>
  )
}
