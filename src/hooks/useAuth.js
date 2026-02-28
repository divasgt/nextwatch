import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getUser() {
    const {data} = await supabase.auth.getUser()
    setUser(data.user)
    setLoading(false)
  }
  // we could also write function for getSession instead of getUser, like:
  // async function getSession() {
  //   const {data} = await supabase.auth.getSession()
  //   setUser(data.session?.user ?? null)
  //   setLoading(false)
  // }
  
  useEffect(() => {
    // Get initial session's user
    getUser()

    // Listener for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Below line updates user state immediately, no need to do window.loaction.reload()
        // ?? is a nullish coalescing operator - means if session?.user is nullish value (only null or undefined are nullish values), then set user to null else set user to session?.user
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => authListener.subscription.unsubscribe()
  }, [])

  async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return { user, loading, signUp, signIn, signOut }
}