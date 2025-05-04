![ChainConnect Logo](https://chainconnect-wallet.vercel.app/_next/image?url=%2Fassets%2Flogo.png&w=128&q=100)

ChainConnect is a platform for connecting to different blockchains.

## Setup & Installation

#### Prerequisites

- Node.js (v20 or later recommended)
- pnpm (recommended) or npm/yarn
- Git

#### Installation

1. Clone the repository:

```bash
git clone https://github.com/rajat2502/Chainconnect.git
cd Chainconnect
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Building for Production

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Design choices & Technologies Used

- **Next.js**: For server-side rendering and optimized production builds
- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Ant Design**: For consistent design and UI components
- **ethers.js**: For taking care of transactions and fetching the token balances
- **ESLint**: For linting the code
- **Vercel**: For hosting the application
