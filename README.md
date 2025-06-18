# Promptly - AI Prompt Library

Promptly is a Next.js web application designed to be a curated library of prompts for various AI tools like ChatGPT, Claude, Grok, and DeepSeek. It features categorized prompts, search functionality, a clean, modern user interface with light and dark modes.

## Features

- **Modern UI**: Clean, responsive design built with Next.js, React, Tailwind CSS, and ShadCN UI components.
- **Light/Dark Mode**: Theme toggle for user preference.
- **Categorized Prompts**: Prompts organized into logical categories (e.g., Marketing, Content Creation).
- **Prompt Cards**: Each prompt displayed with its title, text, compatible AI tools, and a one-click copy button.
- **Featured Prompts**: A dedicated section to highlight selected prompts.
- **Curated Collections**: View prompts grouped by their categories.
- **Keyword Search**: Client-side search functionality to find prompts by keywords within titles or content.
- **Navigation**: Easy-to-use navigation bar with links to main sections and theme toggle.
- **Animations**: Smooth fade-in animations, hover effects (slight scale and shadow changes) for a dynamic user experience.
- **Customizable Theme**: Colors and styles are managed via Tailwind CSS and CSS variables, supporting light and dark modes.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Theme Management**: `next-themes`
- **Icons**: Lucide React
- **AI Integration (Backend)**: Genkit (setup included, further AI features can be built upon this)
- **State Management**: React Context and Hooks (for UI state like search terms and theme)

## Prerequisites

- Node.js (v18 or later recommended)
- npm (usually comes with Node.js) or yarn
- Firebase CLI (for deployment): `npm install -g firebase-tools`

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
    Currently, this project uses mock data embedded in the components. No specific `.env` file is required to run with mock data. If you integrate Firebase for data storage, you will need to set up environment variables for Firebase configuration (see Firebase Setup section).

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

To run the production build locally (if not deploying):
```bash
npm start
```

## Project Structure

- **`src/app`**: Contains the main application pages, layouts, and global CSS (`globals.css`). Uses Next.js App Router.
- **`src/components`**: Reusable React components.
    - **`src/components/ui`**: ShadCN UI components.
    - **`src/components/theme-provider.tsx`**: Wrapper for `next-themes`.
    - **`src/components/theme-toggle-button.tsx`**: UI for switching themes.
    - Custom components like `Navbar.tsx`, `HeroSection.tsx`, `CategoryCard.tsx`, `PromptCard.tsx`, etc.
- **`src/types`**: TypeScript type definitions for data structures (e.g., `Prompt`, `Category`).
- **`src/lib`**: Utility functions (e.g., `cn` for classnames).
- **`src/hooks`**: Custom React hooks (e.g., `useToast`, `useIsMobile`).
- **`src/ai`**: Genkit related files for AI functionality.
    - `src/ai/genkit.ts`: Genkit initialization.
    - (Future flows would go into `src/ai/flows/`)
- **`public`**: Static assets.
- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`next.config.ts`**: Next.js configuration.
- **`components.json`**: ShadCN UI configuration.
- **`apphosting.yaml`**: Configuration for Firebase App Hosting.

## Firebase Setup & Firestore Data Structure

This project currently uses mock data hardcoded into the components. To use Firestore as a backend:

1.  **Set up a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project or use an existing one.
    - Add a Web app to your Firebase project (though for App Hosting, this step might be integrated).
    - Enable Firestore in your Firebase project.

2.  **Install Firebase SDK (already included in `package.json`):**
    If not present for some reason:
    ```bash
    npm install firebase
    ```

3.  **Configure Firebase in your app**:
    - Create a Firebase initialization file (e.g., `src/lib/firebase.ts`).
    - Add your Firebase config.
    ```typescript
    // src/lib/firebase.ts (Example)
    import { initializeApp, getApps, getApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    // Initialize Firebase
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    export { db, app };
    ```
    - **Important**: Store your `firebaseConfig` securely using environment variables (e.g., `.env.local`). Prefix client-side accessible variables with `NEXT_PUBLIC_`.

4.  **Firestore Data Structure**:
    Create two main collections in Firestore:

    *   **`categories` Collection**:
        Each document represents a category. The ID of the document can be the category `id` string (e.g., "marketing").
        Example document (`categories/marketing`):
        ```json
        {
          "name": "Marketing & Sales",
          "description": "Target audience analysis, funnel building, conversion optimization.",
          "iconEmoji": "💼"
        }
        ```
        (The `id` field from the JSON becomes the document ID, `iconEmoji` is for reference, UI uses Lucide icons mapped from `id`)

    *   **`prompts` Collection**:
        Each document represents a prompt. The ID can be auto-generated by Firestore or a custom ID.
        Example document structure:
        ```json
        {
          "title": "Customer Persona Generator",
          "prompt": "Create a detailed customer persona for a digital marketing agency targeting local businesses.",
          "category": "marketing", // Document ID from 'categories' collection
          "tools": ["ChatGPT", "Claude"], // Array of strings
          "isFeatured": true,
          "description": "Optional short summary if needed"
        }
        ```

5.  **Fetch Data in Components**:
    - Modify components like `CategoryCardsSection.tsx`, `FeaturedPromptsSection.tsx`, and `CuratedCollectionsSection.tsx` to fetch data from Firestore instead of using the mock arrays.
    - Example (conceptual for fetching categories):
      ```tsx
      // In CategoryCardsSection.tsx
      // import { db } from '@/lib/firebase'; // Assuming you set up firebase.ts
      // import { collection, getDocs } from 'firebase/firestore';
      // import { useEffect, useState } from 'react';
      // ...

      // Inside the component:
      // const [categories, setCategories] = useState<Category[]>([]);
      // useEffect(() => {
      //   const fetchCategories = async () => {
      //     const categoriesCollection = collection(db, 'categories');
      //     const categorySnapshot = await getDocs(categoriesCollection);
      //     const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      //     // You might need to map id to LucideIcon here as well, or handle it in the component
      //     setCategories(categoryList);
      //   };
      //   fetchCategories();
      // }, []);
      ```
    - Remember to handle loading states and errors.

## Firebase Hosting Deployment (with Firebase App Hosting)

This project is structured to be easily deployable with Firebase App Hosting, which is optimized for Next.js applications.

1.  **Install Firebase CLI (if not already done):**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project directory (if not already done for other Firebase services):**
    ```bash
    firebase init hosting
    ```
    - Select "Use an existing project" and choose your Firebase project.
    - When asked about the public directory, for Next.js with App Hosting, Firebase often auto-detects this. If it asks, you can typically point to `.next` or let the defaults for Next.js work. However, the `apphosting.yaml` file will primarily control the build and serving.
    - Select "Yes" for "Configure as a single-page app (rewrite all urls to /index.html)?". For Next.js, this is usually "No", as Next.js handles its own routing. App Hosting handles this.
    - Select "No" for "Set up automatic builds and deploys with GitHub?". You can set this up later if desired.

    If you already have `firebase.json` and `apphosting.yaml`, `firebase init hosting` might just confirm your setup.

4.  **Build your Next.js application:**
    ```bash
    npm run build
    ```

5.  **Deploy to Firebase Hosting:**
    ```bash
    firebase deploy
    ```
    Or, if you only want to deploy hosting:
    ```bash
    firebase deploy --only hosting
    ```

Firebase App Hosting will build and deploy your Next.js app. The `apphosting.yaml` file provides basic configuration. For more advanced needs, refer to the Firebase App Hosting documentation.

## Customization

- **Styling**: Modify `src/app/globals.css` for global styles and theme variables (CSS HSL variables for light and dark modes). Tailwind utility classes are used throughout the components.
- **Adding Components**: Create new components in `src/components` and import them where needed.
- **Adding Pages**: Create new route segments (folders and `page.tsx` files) within `src/app`.

## Future Enhancements

- **AI-Powered Search**: Implement Genkit flow for semantic search.
- **User Authentication**: Add user profiles and authentication (e.g., with Firebase Auth).
- **Stripe Integration**: For "Upgrade to PRO" functionality.
- **Advanced Filtering**: Allow filtering by specific AI tools directly in the UI.
- **Admin Panel**: For managing prompts and categories.

This README should provide a good starting point for setting up, running, and deploying the Promptly project.
