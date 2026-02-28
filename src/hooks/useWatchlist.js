import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useWatchlist(userId) {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getWatchlist = async () => {
      if (!userId) {
        setWatchlist([])
        return
      }

      setLoading(true)
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', {ascending: false}) // Sort by created_at descending

      if (error) throw error
        
      setWatchlist(data || [])
      setLoading(false)
    }

    getWatchlist()
  }, [userId])


  const addToWatchlist = async (tmdbId=null, mediaTitle, mediaType, releaseYear, posterPath=null) => {
    if (!userId) throw new Error('User not authenticated')
    
    const { data, error } = await supabase
      .from('watchlist')
      .insert([{
        user_id: userId,
        tmdb_id: tmdbId,
        media_title: mediaTitle,
        media_type: mediaType,
        release_year: releaseYear,
        poster_path: posterPath
      }])
      .select() // Ensure the inserted data is returned
    
    if (error) throw error
    
    // Only update watchlist if data is not null and contains items
    if (data && data.length > 0) {
      setWatchlist(prev => [...prev, ...data])
    }
  }


  const removeFromWatchlist = async (tmdbId) => {
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('tmdb_id', tmdbId)
    
    if (error) throw error
    
    setWatchlist(prev => prev.filter(item => item.tmdb_id !== tmdbId))
  }


  return { watchlist, loading, addToWatchlist, removeFromWatchlist }
}