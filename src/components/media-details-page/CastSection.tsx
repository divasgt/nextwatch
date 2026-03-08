"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from '@/utils/constants'

interface CastMember {
  id: number;
  profile_path: string | null;
  name: string;
  character: string;
}

interface CastSectionProps {
  data: CastMember[];
}

export default function CastSection({ data }: CastSectionProps) {
  const isDataLengthy = data.length > 15
  const [castData, setCastData] = useState(isDataLengthy ? data.slice(0, 15) : data)

  return (<div className='mt-16'>
    <h2 className='text-2xl mb-5 border-b-2 border-b-red-500 inline-block pb-2'>Top Cast</h2>

    <div className='flex gap-3 md:gap-5 overflow-x-auto p-4 -m-4'>
      {castData.map((item) => (
        <div key={item.id} className='flex flex-col shrink-0 w-28 md:w-40 rounded-lg overflow-hidden bg-gray-600/20 transition-transform duration-300 ease-in-out hover:scale-105 shadow hover:shadow-lg hover:shadow-black/40 backdrop-blur-xl'>
          <Image
            className='w-full h-[168px] md:h-[240px] object-cover'
            src={
              item.profile_path
                ? `${IMAGE_BASE_URL}w185${item.profile_path}`
                : PLACEHOLDER_IMAGE_URL(160, 240)}
            alt={item.name}
            height={240}
            width={160}
            unoptimized={!item.profile_path}
          />
          <div className='p-3 *:overflow-hidden *:line-clamp-2'>
            <p className='font-medium' title={item.name}>
              {item.name}</p>
            <p className='text-gray-400 text-wrap font-light text-sm' title=''>
              {item.character}</p>
          </div>
        </div>
      ))}

      {isDataLengthy ?
        <button
          className='shrink-0 mx-8 text-gray-300 hover:text-white transition-all cursor-pointer self-center'
          onClick={() => setCastData(data)}
        >Show all</button>
        : null
      }
    </div>
  </div>)
}
