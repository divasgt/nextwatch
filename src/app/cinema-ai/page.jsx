"use client"

import { useEffect, useRef, useState } from "react";
import { IoMdSend } from 'react-icons/io';
import Markdown from "react-markdown";
import RecommendationCard from "@/components/RecommendationCard";
import { useAuth } from "@/hooks/useAuth";
import Loading from "../loading";

export default function AskAIPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Welcome to NextWatch! I'm your personal movie and TV show assistant. With the power of AI, I can answer anything cinema related or help you find your perfect watch!",
      type: "text",
    },
  ])
  // separate state for passing as history to gemini api
  const [history, setHistory] = useState([
    {
      role: "model",
      parts: [{ text: "Welcome to NextWatch! I'm your personal movie and TV show assistant. Ask me anything about cinema or request some recommendations!" }],
    },
  ])
  const { user, loading } = useAuth()
  const [freeLimitReached, setFreeLimitReached] = useState(false)

  // scroll to the last message, when a new message is added
  useEffect(() => {
    // added block: "end" to scroll into view at the bottom of the window
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })

    if (!user && messages.length === 7) {
      setFreeLimitReached(true)
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          content: "Please sign in to ask more questions.",
          type: "text",
        }
      ])
    }
  }, [messages])


  async function handleSubmit(e) {
    e.preventDefault()
    const query = input.trim()
    if (!query) return

    const userMessage = {
      role: "user",
      content: query,
      type: "text",
    }
    setMessages(prev => [...prev, userMessage])
    setHistory(prev => [...prev, { role: userMessage.role, parts: [{ text: userMessage.content }], }])

    setIsLoading(true)
    setInput("")


    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ query: query, history: history })
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const result = await response.json()

      // handle if the data type is recommendation
      if (result.type === 'recommendation' && Array.isArray(result.data)) {
        // fetching TMDB data for each item
        const contentWithTmdbData = await Promise.all(
          result.data.map(async (item) => {
            const type = item.type?.toLowerCase().includes('movie') ? 'movie' : 'tv'
            const searchParams = new URLSearchParams({ title: item.title, year: item.release_year || '', type })

            const res = await fetch(`/api/search-exact?${searchParams.toString()}`)
            const tmdbData = await res.json()
            return { ...item, tmdbData: tmdbData || null, media_type: type }
          })
        )

        const botMessage = {
          role: "bot",
          content: contentWithTmdbData,
          type: "recommendation"
        }

        setMessages(prev => [...prev, botMessage])
        setHistory(prev => [...prev, { role: "model", parts: [{ text: JSON.stringify(result.data) }], }])
      } else {
        // Handle plain text response
        const botMessage = { role: "bot", content: result.data, type: "text" }
        setMessages(prev => [...prev, botMessage])
        setHistory(prev => [...prev, { role: "model", parts: [{ text: result.data }], }])
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error.'
      console.error("Failed to get response from AI", err)
      const errorBotMessage = {
        role: "bot",
        // content: `Sorry, I've encountered an error.`,
        content: `Sorry, I've encountered an error: ${errorMessage}`,
        type: "text",
      }
      setMessages(prev => [...prev, errorBotMessage])

    } finally {
      setIsLoading(false)
    }
  }

  const messageElements = messages.map((message, index) => {
    // If message is a recommendation, render cards
    if (message.type === 'recommendation' && Array.isArray(message.content)) {
      return (
        <div key={index} className="flex flex-col gap-3 self-start">
          {message.content.map((item, itemIndex) => (
            // <RecommendationCard key={`${itemIndex}-${item.tmdbData?.id || item.title}`} item={item} />
            <RecommendationCard key={`${itemIndex}`} item={item} />
          ))}
        </div>
      )
    }

    // default render for text messages
    return (
      <div
        key={index}
        className={`py-2 px-3 backdrop-blur-xl max-w-xl rounded-xl whitespace-pre-wrap ${message.role === "bot" ? "bg-gray-600/50 self-start rounded-bl-none" : "bg-blue-800/80 self-end rounded-br-none"}`}
      >
        <Markdown>{message.content}</Markdown>
      </div>
    )
  })

  if (loading) return <Loading />

  return (
    <main className="flex flex-col h-[calc(100vh-70px)] px-4 lg:px-52">
      <div className="flex items-baseline justify-center gap-4 mt-4 mb-5">
        <h1 className="text-3xl font-semibold inline-block">Cinema AI</h1>
      </div>

      <div className="chat-window flex-1 w-full mx-auto rounded-2xl overflow-y-auto">
        <div className="messages-container flex flex-col gap-3 px-4">
          {messageElements}
          {isLoading &&
            <div className="py-2 px-3 backdrop-blur-xl max-w-xl rounded-xl bg-gray-600/50 self-start rounded-bl-none animate-pulse">
              <div>I'm thinking...</div>
            </div>
          }
        </div>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl mx-auto pt-4 pb-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything cinema"
          className="bg-gray-700/40 backdrop-blur-2xl border border-white/10 rounded-xl px-6 py-2.25 flex-1 outline-none focus:border-neutral-300/30 disabled:cursor-not-allowed"
          disabled={freeLimitReached}
        />
        <button
          type="submit"
          className="text-sm text-white cursor-pointer px-3.5 py-1.25 bg-orange-700/80 backdrop-blur-2xl border border-white/10 hover:bg-orange-700 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading || !input.trim() || freeLimitReached}
          title="Send"
        >
          {isLoading ?
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            // : "Send"
            : <IoMdSend className="w-5 h-5 -mr-0.5" />
          }
        </button>
      </form>
    </main>
  )
}