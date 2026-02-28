# NextWatch 🎬

NextWatch is your one-stop website designed for cinema enthusiasts. Discover latest blockbusters to timeless classics, search for specific titles, manage your watchlists, and even ask an AI chatbot for finding your next perfect watch!
The application leverages various APIs, including TMDB for content data and Google Gemini for AI-powered features, and uses Supabase for user authentication and data storage. NextWatch is built with Next.js, React.js, and Tailwind CSS, and deployed on Vercel.


## 🚀 Key Features

- **Movie and TV Show Exploration:** Browse a vast library of movies and TV shows. 🍿
- **Anime Exploration:** Browse a vast library of Anime shows. 🌸
- **Search Implementation:** Quickly find specific titles using the search functionality. 🔍
- **Media Details Pages:** View detailed information about movies and TV shows, including cast, crew, synopsis, and ratings. ℹ️
- **User Authentication:** Securely sign up, sign in, and manage your account. 🔑
- **Personal Watchlist:** Save movies and TV shows to your personal watchlist for later viewing. 📝
- **AI Chat:** Interact with an AI-powered chatbot for recommendations, trivia, and more. 🤖

## 🛠️ Tech Stack

- **Frontend:**
    - [Next.js](https://nextjs.org/) (15.5.4): React framework for building server-rendered applications.
    - [React.js](https://react.dev/) (19.1.0): JavaScript library for building user interfaces.
    - [Tailwind CSS](https://tailwindcss.com/) (4): CSS framework for styling the application.
    - tailwind-merge (3.3.1): Utility for merging Tailwind CSS class names.
    - React Icons (5.5.0): Library of pre-built React icons.
    - React Markdown (10.1.0): React component for rendering Markdown.
- **Backend & Database:**
    - [Supabase](https://supabase.com): Backend-as-a-service for authentication and database management.
- **API Integrations:**
    - [TMDB API](https://www.themoviedb.org/documentation/api): For fetching movie and TV show data.
    - [Google Gemini API](https://ai.google.dev/): For AI-powered features.
- **Deployment:**
    - [Vercel](https://vercel.com/): Platform for deploying the application.

## 📦 Getting Started

### Prerequisites

- Node.js (>=18)
- npm or yarn or pnpm
- Supabase account and project
- Google Cloud project with Gemini API enabled
- TMDB API key

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd cineverse
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install or pnpm install
    ```

3.  Set up environment variables:

    - Create a `.env.local` file in the root directory.
    - Add the following environment variables, replacing the placeholders with your actual values:

    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
    GOOGLE_API_KEY=your_google_gemini_api_key
    ```

    -   **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL.
    -   **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Your Supabase anon key.
    -   **NEXT_PUBLIC_TMDB_API_KEY**: Your TMDB API key.
    -   **GOOGLE_API_KEY**: Your Google Gemini API key.

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 💻 Usage

- Explore movies, TV shows, and anime on the homepage.
- Use the search bar to find specific titles.
- Click on a media item to view its details page.
- Sign up or sign in to add items to your watchlist.
- Interact with the AI chatbot for recommendations and information.

## 📂 Project Structure

```
cineverse/
├── .eslintrc.cjs           # ESLint configuration
├── jsconfig.json           # JavaScript configuration
├── next.config.mjs         # Next.js configuration
├── package-lock.json       # Dependency lock file
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── error.jsx       # Custom error page
│   │   ├── globals.css     # Global CSS styles
│   │   ├── layout.jsx      # Root layout
│   │   ├── loading.jsx     # Loading indicator
│   │   ├── movie/
│   │   │   └── [id]/
│   │   │       └── page.jsx # Movie details page
│   │   ├── search/
│   │   │   └── page.jsx     # Search page
│   │   ├── signin/
│   │   │   └── page.jsx     # Sign-in page
|   |   ├──tv/
│   │   │   └── [id]/
│   │   │       └── page.jsx # TV details page
│   │   ├── watchlist/
│   │   │   └── page.jsx     # Watchlist page
│   ├── components/...      # Reusable React components
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.jsx     # Authentication hook
│   │   └── useWatchlist.jsx # Watchlist hook
│   ├── lib/
│   │   ├── supabase.js     # For supabase
│   │   └── tmdb.js         # For tmdb
│   ├── utils/
│   │   ├── constants.js     # Some constants
```

## 📸 Screenshots

(Add screenshots of the application here)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to contact me using my contact options mentioned at https://github.com/divasgt

## 💖 Thanks

Thank you for checking out CineVerse! I hope you enjoy exploring the world of cinema with this application.
