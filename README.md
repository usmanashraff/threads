<div align="center">
  <br />
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/messages-square.svg" alt="Project Logo" width="80">
  <br />

  <h1>🚀 Threads Clone</h1>

  <p>
    A full-stack Threads application clone built with Next.js 14, where you can create, post, like, and comment on threads with a stunning and responsive UI.
  </p>

  <div>
    <a href="https://threads-green-chi.vercel.app/" target="_blank"><strong>View Live Demo</strong></a>
  </div>
</div>

<br />

## 📋 Features

- **Authentication:** Secure user authentication powered by [Clerk](https://clerk.dev).
- **Create & Engage:** Create new threads, comment on posts, and like content.
- **Communities:** Discover, explore, and join different communities.
- **Responsive Design:** Fully responsive UI that works flawlessly on mobile, tablet, and desktop devices.
- **File Uploads:** Manage custom media and avatar uploads seamlessly with [UploadThing](https://uploadthing.com/).
- **Clean Architecture:** Organized file structure utilizing the modern Next.js App Router layout.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & React Icons

### Backend
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Clerk Auth](https://clerk.com/)
- **Validation:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Webhooks:** [Svix](https://www.svix.com/) (For Clerk user/community synchronization)

## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed along with a package manager like npm, pnpm, or yarn.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/threads.git
   cd threads
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory. You will need to obtain API keys for Clerk, MongoDB, UploadThing, and set up your Svix Webhooks. See `.env.example` if available.
   ```env
   # Example environment variables needed:
   MONGODB_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   NEXT_CLERK_WEBHOOK_SECRET=
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:** Navigate your browser to `http://localhost:3000` to view the application in action.

## 📁 Project Structure

```text
├── app/               # Next.js App Router folders (pages, api, layouts)
│   ├── (auth)/        # Clerk authentication routes
│   └── (root)/        # Main application routes (feed, profile, search, etc.)
├── components/        # Reusable UI components (forms, cards, shared UI)
├── lib/               # Utility functions, server actions, and DB configurations
├── public/            # Static assets and images
├── constants/         # Static global constants and navigation config
└── tailwind.config.ts # Tailwind CSS theme and styling configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are very welcome! If you find a bug or have a suggestion, feel free to open an issue or submit a pull request.

---
> Developed with ❤️ using Next.js & Tailwind CSS.
