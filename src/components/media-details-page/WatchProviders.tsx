"use client";
import { useMemo } from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/utils/constants";
// import { MdErrorOutline } from 'react-icons/md';

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface WatchProvidersProps {
  providers: {
    link?: string;
    flatrate?: Provider[];
    buy?: Provider[];
    rent?: Provider[];
  };
}

export default function WatchProviders({providers}: WatchProvidersProps) {
  const providersList = useMemo(() => {
    if (providers && (providers.flatrate || providers.buy || providers.rent)) {
      const allProviders = [
        ...(providers.flatrate || []),
        ...(providers.buy || []),
        ...(providers.rent || []),
      ]

      const uniqueProviders: Record<number, Provider> = {}
      allProviders.forEach(provider => {
        if (!uniqueProviders[provider.provider_id]) {
          uniqueProviders[provider.provider_id] = provider
        }
      })

      return Object.values(uniqueProviders)
    }
    return []
  }, [providers])

  // Don't render anything if there are no providers
  if (providersList.length === 0) {
    return <p className="text-white flex items-center gap-2">
      {/* <MdErrorOutline className="inline-block size-5"/>  */}
      Not available for streaming in your region.
    </p>
  }

  return (
  <div className="flex flex-col gap-6">
    <h3 className="text-lg font-semibold text-white/90">Watch now on</h3>
    <div className="flex flex-wrap items-center gap-4">
      {providersList.map((provider) => {
        return (
          <div key={provider.provider_id} className="relative group">
            <a href={providers.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <Image
                className="size-12 rounded-lg transition-transform duration-300  hover:scale-105"
                src={`${IMAGE_BASE_URL}w92${provider.logo_path}`}
                alt={provider.provider_name}
                width={48}
                height={48}
              />
            </a>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-600/70 backdrop-blur-xl text-white text-xs rounded-md whitespace-nowrap shadow-lg transition-all duration-200 opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible">
              {provider.provider_name}
              {/* Tooltip arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-x-6 border-x-transparent border-b-6 border-b-gray-600/70" />
            </div>
          </div>
        );
      })}
    </div>
  </div>
  )
}
