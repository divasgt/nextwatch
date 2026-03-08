'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/app/loading'
import AlertPopup from './AlertPopup'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { user, loading, signUp, signIn, signOut } = useAuth()
  const [alertMessage, setAlertMessage] = useState("")
  // const [bottomInfoTextShown, setBottomInfoTextShown] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProcessing(true)
    setAlertMessage("") // Clear previous message

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      // Clear form on success
      setEmail('')
      setPassword('')

      // On sign up successful:
      if (isSignUp) {
        setAlertMessage("User created! Please check your email for confirmation.")
      }
    } catch (error: any) {
      setAlertMessage(error.message)
      console.error(error.message)
    } finally {
      setProcessing(false)
    }
  }


  if (loading) {
    return <Loading />
  }

  if (user) {
    return (<div className="w-full max-w-72 md:max-w-xl mx-auto px-6 py-10 text-sm md:text-base bg-gray-800/60 -translate-y-20 text-white rounded-lg shadow-lg my-auto text-center">
      <h2 className="text-wrap break-words md:text-2xl mb-4">Welcome, {user.email}!</h2>
      <p className="text-gray-300 mb-4">{"You're signed in successfully."}</p>

      <div className='space-x-4'>
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          Go to Home
        </Link>

        <button
          onClick={signOut}
          className="text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>)
  }

  return (<>
    <div className="w-full max-w-72 md:max-w-96 mx-auto px-6 pt-10 pb-12 text-sm md:text-base md:text-md bg-gray-800/60 -translate-y-20 text-white rounded-lg shadow-lg my-auto">
      <h2 className="text-2xl mb-6 text-center">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={processing}
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={8}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={processing}
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full p-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-300">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="ml-1 text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

    </div>

    <AlertPopup
      message={alertMessage}
      duration={alertMessage?.includes('confirmation') ? 60000 : 5000}
      className={alertMessage?.includes('confirmation') ? 'bg-gray-800' : 'text-red-400'}
    />
  </>)
}
