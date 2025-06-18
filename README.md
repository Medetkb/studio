# Promptly - AI Prompt Library

Promptly is a Next.js web application designed to be a curated library of prompts for various AI tools like ChatGPT, Claude, Grok, and DeepSeek. It features categorized prompts, search functionality, and a clean, modern user interface.

## Features

- **Modern UI**: Clean, responsive design built with Next.js, React, Tailwind CSS, and ShadCN UI components.
- **Categorized Prompts**: Prompts organized into logical categories (e.g., Marketing, Content Creation).
- **Prompt Cards**: Each prompt displayed with its title, text, compatible AI tools, and a one-click copy button.
- **Featured Prompts**: A dedicated section to highlight selected prompts.
- **Curated Collections**: View prompts grouped by their categories.
- **Keyword Search**: Client-side search functionality to find prompts by keywords within titles or content.
- **Navigation**: Easy-to-use navigation bar with links to main sections.
- **Animations**: Subtle fade-in animations and hover effects for a dynamic user experience.
- **Customizable Theme**: Colors and styles are managed via Tailwind CSS and CSS variables.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **AI Integration (Backend)**: Genkit (setup included, further AI features can be built upon this)
- **State Management**: React Context and Hooks (for UI state like search terms)

## Prerequisites

- Node.js (v18 or later recommended)
- npm (usually comes with Node.js) or yarn

## Getting Started

1.  **Clone the repository (or extract the files if downloaded as a ZIP):**
    ```bash
    # If you have this in a Git repository
    git clone <your-repository-url>
    cd promptly
    ```
    If you have the files directly, create a project folder (e.g., `promptly`) and place all the provided files and folders into it.

2.  **Install dependencies:**
    Open your terminal in the project's root directory (`promptly`) and run:
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```

3.  **Environment Variables:**
    Currently, this project uses mock data embedded in the components. No specific `.env` file is required to run with mock data. If you integrate Firebase, you will need to set up environment variables for Firebase configuration (see Firebase Setup section).

## Running the Application (VS Code or Terminal)

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

2.  **Open in your browser:**
    Navigate to `http://localhost:9002`.

## Building for Production

To create an optimized production build:
```bash
npm run build
```
This will generate a `.next` folder with the production-ready application.

To run the production build locally:
```bash
npm start
```

## Project Structure

- **`src/app`**: Contains the main application pages, layouts, and global CSS (`globals.css`). Uses Next.js App Router.
- **`src/components`**: Reusable React components.
    - **`src/components/ui`**: ShadCN UI components.
    - Custom components like `Navbar.tsx`, `HeroSection.tsx`, `CategoryCard.tsx`, `PromptCard.tsx`, etc.
- **`src/types`**: TypeScript type definitions for data structures (e.g., `Prompt`, `Category`).
- **`src/lib`**: Utility functions (e.g., `cn` for classnames).
- **`src/hooks`**: Custom React hooks (e.g., `useToast`, `useIsMobile`).
- **`src/ai`**: Genkit related files for AI functionality.
    - `src/ai/genkit.ts`: Genkit initialization.
    - (Future flows would go into `src/ai/flows/`)
- **`public`**: Static assets (though not many are used in this project yet besides fonts implicitly linked).
- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`next.config.ts`**: Next.js configuration.
- **`components.json`**: ShadCN UI configuration.

## Firebase Setup (Guidance for Future Integration)

This project currently uses mock data hardcoded into the components. To use Firestore as a backend:

1.  **Set up a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project or use an existing one.
    - Add a Web app to your Firebase project.
    - Copy your Firebase configuration object.

2.  **Install Firebase SDK**:
    ```bash
    npm install firebase
    ```

3.  **Configure Firebase in your app**:
    - Create a Firebase initialization file (e.g., `src/lib/firebase.ts`).
    - Add your Firebase config from step 1.
    ```typescript
    // src/lib/firebase.ts
    import { initializeApp, getApps, getApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    export { db, app };
    ```
    - **Important**: Store your `firebaseConfig` securely, typically using environment variables (e.g., `.env.local`) and accessing them via `process.env.NEXT_PUBLIC_FIREBASE_API_KEY`.

4.  **Firestore Data Structure**:
    Create two main collections in Firestore:

    *   **`categories` Collection**:
        Each document represents a category.
        Example document structure:
        ```json
        {
          "id": "marketing", // Can be the document ID
          "name": "Marketing & Sales",
          "description": "Target audience analysis, funnel creation...",
          "iconEmoji": "💼" // You can store the emoji or a reference to an icon name
        }
        ```

    *   **`prompts` Collection**:
        Each document represents a prompt.
        Example document structure:
        ```json
        {
          "id": "pm1", // Can be the document ID
          "title": "Customer Persona Generator",
          "prompt": "Create a detailed customer persona...",
          "category": "marketing", // Reference to the category ID
          "tools": ["ChatGPT", "Claude"], // Array of strings
          "isFeatured": true,
          "description": "Optional short summary" // if needed
        }
        ```

5.  **Fetch Data in Components**:
    - Modify components like `CategoryCardsSection.tsx`, `FeaturedPromptsSection.tsx`, and `CuratedCollectionsSection.tsx` to fetch data from Firestore instead of using the mock arrays.
    - Example (conceptual for fetching categories):
      ```tsx
      // In CategoryCardsSection.tsx
      import { db } from '@/lib/firebase'; // Assuming you set up firebase.ts
      import { collection, getDocs } from 'firebase/firestore';
      import { useEffect, useState } from 'react';
      // ...

      // Inside the component:
      const [categories, setCategories] = useState<Category[]>([]);
      useEffect(() => {
        const fetchCategories = async () => {
          const categoriesCollection = collection(db, 'categories');
          const categorySnapshot = await getDocs(categoriesCollection);
          const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
          // You might need to map iconEmoji to LucideIcon here as well
          setCategories(categoryList);
        };
        fetchCategories();
      }, []);
      ```
    - Remember to handle loading states and errors.

## Customization

- **Styling**: Modify `src/app/globals.css` for global styles and theme variables (CSS HSL variables). Tailwind utility classes are used throughout the components.
- **Adding Components**: Create new components in `src/components` and import them where needed.
- **Adding Pages**: Create new route segments (folders and `page.tsx` files) within `src/app`.

## Future Enhancements

- **AI-Powered Search**: Implement Genkit flow for semantic search.
- **User Authentication**: Add user profiles and authentication (e.g., with Firebase Auth).
- **Stripe Integration**: For "Upgrade to PRO" functionality.
- **Advanced Filtering**: Allow filtering by specific AI tools.
- **Admin Panel**: For managing prompts and categories.

This README should provide a good starting point for setting up and running the Promptly project locally.
