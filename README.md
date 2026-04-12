# College Buzz 🎓🐝

Welcome to **College Buzz**, the ultimate campus platform designed to connect students with events, news, clubs, and academic resources. College Buzz provides a dynamic, interactive, and centralized hub for everything happening on campus, powered by modern web technologies and AI.

---



## ✨ Key Features

*   **Discover Feed**: A personalized, searchable feed featuring the latest campus news, upcoming events, and trending topics.
*   **Clubs & Organizations Hub**: Browse clubs by category (Academic, Arts, Sports, etc.), view detailed club profiles, see upcoming club events, and submit requests to start new clubs.
*   **Notice Board**: A digital bulletin board for official campus announcements and student notices.
*   **Academic Resources**: Access semester-based course criteria, syllabi, and downloadable PDF documents.
*   **Rizvi AI Chatbot**: An integrated, context-aware AI assistant powered by Google's Gemini API, ready to answer questions about campus life, events, and navigation.
*   **Responsive Design**: A beautiful, glassmorphism-inspired UI built with Tailwind CSS that looks great on desktop and mobile devices.

---

## 🛠️ Tech Stack

**Frontend:**
*   [React](https://reactjs.org/) (v18+)
*   [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
*   [Lucide React](https://lucide.dev/) - Beautiful, consistent icons

**Backend & Services:**
*   [Node.js](https://nodejs.org/) / [Express](https://expressjs.com/) (Development Server)
*   [Firebase](https://firebase.google.com/) - Authentication and Firestore Database
*   [Google Gemini API](https://ai.google.dev/) - Powers the Rizvi Chatbot

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Gemini API Key
*   A Firebase Project

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/college-buzz.git
    cd college-buzz
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Firebase Configuration**
    Ensure your `firebase-applet-config.json` is properly populated with your Firebase project credentials. 
    *Note: If you removed your `apiKey` for security before committing, make sure to add it back locally or inject it via environment variables before running the app.*

5.  **Start the development server**
    ```bash
    npm run dev
    ```

6.  **Open the app**
    Navigate to `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```text
college-buzz/
├── src/
│   ├── frontend/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages.tsx      # Main application pages (Discover, Clubs, etc.)
│   │   ├── RizviChatbot.tsx # AI Chatbot component
│   │   ├── App.tsx        # Main application routing and layout
│   │   └── index.css      # Global Tailwind styles
│   ├── backend/           # Server-side logic and API endpoints
│   └── api/               # Client-side API utilities
├── public/                # Static assets
├── firebase-applet-config.json # Firebase configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

*   [Google AI Studio](https://aistudio.google.com/) for the Gemini API
*   [Tailwind CSS](https://tailwindcss.com/) for the styling framework
*   [Lucide](https://lucide.dev/) for the amazing icon set

