import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { query, history } = await request.json()

  const systemInstruction = `You are a cheerful and knowledgeable AI assistant for the NextWatch website. Your sole purpose is to discuss cinema, movies, TV shows, anime, documentaries, actors, genres, and movie trivia.

**CRITICAL INSTRUCTION:** Your response format depends entirely on the user's query type.

1.  **If the user asks for recommendations, suggestions, or anything similar:**
    *   You MUST reply ONLY with a valid JSON array.
    *   The array should contain up to 5 objects.
    *   Each object MUST have the following schema:
        *   "title": string (The title of the movie/show)
        *   "type": string (e.g., "Movie", "TV Show", "Anime")
        *   "release_year": string (e.g., "2023", optional)
        *   "genres": array of strings (e.g., ["Sci-Fi", "Action"], optional)
        *   "reason": string (A brief explanation of why this is a good recommendation)
    *   Do NOT include any text, greetings, or explanations outside of the JSON array. Your entire response must be the JSON structure itself.

2.  **For ALL OTHER queries:**
    *   This includes greetings, questions about movie details (e.g., "tell me about The Matrix"), trivia, your capabilities, or any non-recommendation topic.
    *   You MUST reply in plain, conversational text.
    *   Do NOT use JSON for these answers. Be friendly and helpful.`;

  const ai = new GoogleGenAI({});
  // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


  try {
    // Create a chat session which will persist the history
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    })

    const response = await chat.sendMessage({ message: query });

    let text = response.text;

    // Attempt to extract JSON from a markdown code block
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      text = jsonMatch[1];
    }

    // check if json, and return it
    try {
      const jsonData = JSON.parse(text);
      if (Array.isArray(jsonData)) {
        return NextResponse.json({ type: "recommendation", data: jsonData });
      }
    } catch (e) {
      // Not a JSON response, treat as plain text
    }

    // return plain text
    return NextResponse.json({ type: "text", data: response.text });
  } catch (err) {
    return NextResponse.json(
      { error: "API error" },
      { status: 500 }
    )
  }
}