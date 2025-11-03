# PokéCollection

A modern Next.js application for managing and showcasing your Pokémon card collection.

## Features

- **Collection Management**: View and organize your Pokémon cards
- **Advanced Filtering**: Filter by set, rarity, finish, language, condition, and tags
- **Search**: Search cards by name, set name, or tags
- **Gallery View**: Browse your collection with responsive grid layout
- **Set Organization**: Group cards by set with counts
- **Trade & Sale**: Filter cards available for trade or sale
- **Card Details**: View detailed information including images, metadata, and related cards
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode**: Automatic dark mode support based on system preferences

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your app will be deployed!

For other platforms, ensure:
- Node.js 18+ is available
- The build command is set to `npm run build`
- The start command is set to `npm start` (for production) or `npm run dev` (for preview)

## Adding Cards to Your Collection

### Step 1: Add Card Images

1. Add your card images to the `/public/cards/` directory
2. Use descriptive filenames (e.g., `charizard-ex-obf-125.jpg`)

### Step 2: Add Card Data

1. Open `src/data/cards.json`
2. Add a new card object following this structure:

```json
{
  "id": "unique-card-id",
  "name": "Card Name",
  "setName": "Set Name",
  "setCode": "SET",
  "number": "123",
  "rarity": "Rarity Name",
  "finish": "Holo",
  "language": "English",
  "year": 2023,
  "condition": "Mint",
  "gradeCompany": "PSA",
  "grade": "10",
  "acquiredFrom": "Where you got it",
  "acquiredPrice": 0.00,
  "estimatedValue": 0.00,
  "owned": true,
  "quantity": 1,
  "tags": ["tag1", "tag2"],
  "images": {
    "front": "/cards/your-image.jpg",
    "back": "/cards/your-back-image.jpg"
  },
  "notes": "Optional notes",
  "forTrade": false,
  "forSale": false
}
```

3. For the `images.front` field, use the path relative to `/public`:
   - If your image is at `/public/cards/charizard.jpg`, use `/cards/charizard.jpg`
   - A placeholder image is included at `/placeholder.svg` for cards without images

### Step 3: Commit and Deploy

1. Commit your changes:
```bash
git add .
git commit -m "Add new card: [Card Name]"
git push
```

2. If deployed on Vercel, it will automatically rebuild and redeploy

## Project Structure

```
poke-collection/
├── public/
│   ├── cards/          # Card images go here
│   └── placeholder.jpg # Placeholder image
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── card/[id]/  # Individual card pages
│   │   ├── gallery/    # Gallery page
│   │   ├── sets/       # Sets page
│   │   ├── trade/      # Trade page
│   │   └── layout.tsx  # Root layout
│   ├── components/     # React components
│   ├── data/           # Card data (JSON)
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript types
└── package.json
```

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Next/Image** - Optimized image loading

## License

This project is open source and available for personal use.

