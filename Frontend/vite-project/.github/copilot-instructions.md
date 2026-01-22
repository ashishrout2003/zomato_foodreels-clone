# Zomato Reels Frontend - AI Coding Guidelines

## Project Overview
This is a React frontend for Zomato Reels, a short-form video content feature integrated with Zomato's food delivery platform. The app handles user authentication and food partner onboarding.

## Architecture
- **Framework**: Vite + React 19 with React Router DOM v7
- **Routing**: Centralized in `src/routes/AppRoutes.jsx` using BrowserRouter
- **Structure**: Flat component organization under `src/`, with routes in `src/routes/`
- **State**: No global state management yet; use local state or context as needed

## Key Patterns
- **Route Structure**: Use descriptive paths like `/user/register`, `/food-partner/login`
- **Component Style**: Functional components with hooks; avoid class components
- **Imports**: Prefer named imports from React and libraries
- **Example Route**: `<Route path="/user/register" element={<h1>User Register</h1>} />` (replace placeholders with actual components)

## Development Workflow
- **Start Dev**: `npm run dev` (Vite dev server with HMR)
- **Build**: `npm run build` (production build to `dist/`)
- **Lint**: `npm run lint` (ESLint with React rules)
- **Preview**: `npm run preview` (serve built app locally)

## Conventions
- **File Naming**: PascalCase for components (e.g., `UserRegister.jsx`), camelCase for utilities
- **CSS**: Scoped styles in `App.css` or component-specific CSS files
- **Assets**: Place static files in `public/` or `src/assets/`
- **No Tests Yet**: Add Jest/Vitest when implementing features

## Future Extensions
- Implement video upload/playback components for reels
- Add authentication logic (likely JWT or OAuth)
- Integrate with backend APIs for user/food-partner data
- Consider state management (Zustand/Redux) for complex features

## Key Files
- `src/App.jsx`: Main app component rendering routes
- `src/routes/AppRoutes.jsx`: All route definitions
- `package.json`: Dependencies and scripts</content>
<parameter name="filePath">c:\Users\ashis\Desktop\Projects\Zomato Reels\Frontend\vite-project\.github\copilot-instructions.md