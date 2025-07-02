# Church BioLink Builder

## Overview

Church BioLink Builder is a web application designed for churches and religious organizations to create professional bio link pages. The application allows users to create shareable pages that contain links to sermons, donation pages, contact information, and other ministry-related content. Built as a full-stack application using React, TypeScript, and Express.js with a focus on simplicity and accessibility.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks with TanStack Query for server state
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: tsx for TypeScript execution

### Build System
- **Frontend**: Vite with React plugin
- **Backend**: esbuild for production bundling
- **Development**: Concurrent development with Vite dev server and tsx

## Key Components

### 1. Frontend Pages
- **Home Page (`/`)**: Form interface for creating bio links with church name, sermon link, donation link, and contact information
- **Bio Page (`/bio`)**: Display page showing the generated bio link with church branding and action buttons
- **404 Page**: Error handling for invalid routes

### 2. Backend Services
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Route Registration**: Express route setup with API prefix structure
- **Development Server**: Vite integration for hot reloading in development

### 3. Database Schema
- **Users Table**: Basic user authentication structure with username and password fields
- **Extensible Design**: Schema ready for additional tables (bio pages, analytics, etc.)

### 4. UI Design System
- **Theme**: Neutral base with church-focused blue primary color
- **Typography**: Inter font family for clean readability
- **Components**: Comprehensive set of accessible UI components
- **Dark Mode**: CSS variable-based theming system ready for dark mode

## Data Flow

### Bio Link Creation
1. User fills out form on home page with church information
2. Form validates URLs and required fields using Zod schema
3. Client-side URL generation with query parameters
4. URL copying functionality for easy sharing

### Bio Link Display
1. Bio page extracts data from URL parameters
2. Renders church information with professional styling
3. Displays action buttons for sermons, donations, and contact
4. Handles invalid/incomplete URLs gracefully

### Development Workflow
1. Vite dev server serves frontend with hot reloading
2. Express server handles API routes (currently minimal)
3. Concurrent development setup allows simultaneous frontend/backend work

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production
- **@replit/vite-plugin-***: Replit integration plugins

## Deployment Strategy

### Production Build
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Static files served by Express in production

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)

### Database Setup
- Drizzle migrations in `./migrations` directory
- Schema defined in `shared/schema.ts`
- Push-based deployment with `db:push` command

### Hosting Considerations
- Application designed for serverless/container deployment
- Static asset serving through Express
- PostgreSQL database required (Neon serverless recommended)

## Changelog

```
Changelog:
- July 02, 2025. Initial setup with basic bio link functionality
- July 02, 2025. Added Stripe payment integration ($10) with secure checkout flow
- July 02, 2025. Complete payment system ready for deployment
- July 02, 2025. Updated pricing to $3 for increased accessibility
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```