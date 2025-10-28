# Yuh Banking Desktop Interface

## Overview

This is a desktop-optimized banking dashboard application inspired by Swiss banking aesthetics. The application provides users with account balance visualization, transaction management, spending analytics, and quick banking actions. Built with a focus on trust, clarity, and efficient data presentation, it follows Material Design principles adapted for financial interfaces.

The application is a full-stack TypeScript solution using React for the frontend, Express for the backend, and is configured to use PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript as the primary UI framework
- **Vite** for development server and production builds
- **Wouter** for client-side routing (lightweight alternative to React Router)

**UI Component System**
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling with custom design tokens
- Component style: "new-york" variant with CSS variables for theming
- Supports both light and dark themes via ThemeProvider

**State Management**
- **TanStack Query (React Query)** for server state management
- Local component state with React hooks
- Custom query client configuration with credential-based authentication

**Design System**
- Typography: Inter font family (Google Fonts) optimized for financial data readability
- Color system: HSL-based with CSS custom properties for theme switching
- Spacing: Tailwind's default spacing scale (4, 6, 8, 12, 16, 20)
- Layout: Desktop-first approach with 1400px max-width container
- Material Design influenced with Swiss banking aesthetic refinements

**Key UI Components**
- `AccountBalanceCard`: Displays primary account balance with toggle visibility
- `TransactionList`: Filterable/searchable transaction feed with merchant icons
- `SpendingChart`: Monthly spending breakdown by category
- `QuickActions`: Grid of banking action shortcuts
- `Header`: Navigation with notifications and user profile

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js
- Custom middleware for request logging and JSON parsing
- HTTP server created via Node's native `http` module

**Development Setup**
- Vite middleware integration for HMR in development
- Custom error overlay for runtime errors (Replit-specific)
- Separate build process for client and server code

**API Design**
- RESTful API pattern with `/api` prefix for all endpoints
- Currently implements placeholder routes (to be extended)
- Session-based authentication preparation (connect-pg-simple installed)

**Storage Layer**
- **Interface-based design**: `IStorage` interface defines CRUD contracts
- **In-memory implementation**: `MemStorage` class for development/testing
- **Database-ready**: Drizzle ORM configured for PostgreSQL migration
- User entity with username/password fields defined in schema

### Data Storage

**Database Configuration**
- **PostgreSQL** as the target production database
- **Drizzle ORM** for type-safe database queries and schema management
- **Neon Serverless** driver (`@neondatabase/serverless`) for database connections
- Migration files stored in `./migrations` directory
- Schema defined in TypeScript (`shared/schema.ts`)

**Current Schema**
- `users` table with UUID primary key, username (unique), and password fields
- Zod schema validation via `drizzle-zod` for runtime type checking
- Shared types between frontend and backend via `@shared` alias

**Session Management**
- `connect-pg-simple` configured for PostgreSQL session storage
- Express session middleware prepared (not yet fully implemented)

### External Dependencies

**UI & Styling**
- `@radix-ui/*`: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, tooltip, etc.)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Component variant management
- `clsx` + `tailwind-merge`: Conditional className utilities

**Forms & Validation**
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Form validation resolvers
- `zod`: Schema validation library (via drizzle-zod)

**Data Fetching & State**
- `@tanstack/react-query`: Asynchronous state management for API calls

**Development Tools**
- `@replit/vite-plugin-*`: Replit-specific development enhancements (cartographer, dev banner, runtime error modal)
- `tsx`: TypeScript execution for development server
- `esbuild`: Production server bundling

**Utilities**
- `date-fns`: Date manipulation and formatting
- `nanoid`: Unique ID generation
- `embla-carousel-react`: Carousel/slider functionality
- `cmdk`: Command palette component
- `lucide-react`: Icon library

**Build & Tooling**
- TypeScript with strict mode enabled
- Path aliases configured (`@/`, `@shared/`, `@assets/`)
- ESM module format throughout the application