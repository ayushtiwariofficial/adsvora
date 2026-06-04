# Frontend Setup & Development Guide

## Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Git**: For version control

## Installation

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages from package.json:
- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- And more...

### 3. Environment Setup

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=AdsVora
```

## Development

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Features:
- Hot module reloading (HMR)
- Fast refresh on file changes
- Local API proxy to backend

### Build for Production
```bash
npm run build
```

Creates optimized production build in `dist/` directory:
- Minified CSS/JS
- Code splitting
- Asset optimization

### Type Checking
```bash
npm run type-check
```

Run TypeScript compiler without emitting files to verify types.

## Project Structure

### Components

#### Common Components (`src/components/common/`)
- `Header.tsx` - Navigation header with mobile menu
- `Footer.tsx` - Footer with links and social media
- `Button.tsx` - Reusable button component
- `Card.tsx` - Card component for content
- `Section.tsx` - Section wrapper with padding

#### Section Components (`src/components/sections/`)
- `HeroSection.tsx` - Landing page hero
- `ClientsSection.tsx` - Client logos showcase
- `ServicesSection.tsx` - Service cards
- `CaseStudiesSection.tsx` - Project showcase
- `ProcessSection.tsx` - Timeline of process
- `TestimonialsSection.tsx` - Client testimonials
- `BlogSection.tsx` - Latest blog posts
- `CTASection.tsx` - Call-to-action banner

#### Page Components (`src/pages/`)
- `HomePage.tsx` - Home page
- `AboutPage.tsx` - About page
- `ServicesPage.tsx` - Services page
- `CaseStudiesPage.tsx` - Case studies page
- `BlogPage.tsx` - Blog listing
- `BlogDetailPage.tsx` - Individual blog post
- `ContactPage.tsx` - Contact form page

#### Admin Pages (`src/admin/pages/`)
- `AdminLogin.tsx` - Login page
- `AdminDashboard.tsx` - Main dashboard
- `AdminBlogsPage.tsx` - Blog management
- `AdminServicesPage.tsx` - Service management
- `AdminTestimonialsPage.tsx` - Testimonial management

### Services

API integration layer in `src/services/`:
- `apiClient.ts` - Axios instance with interceptors
- `authService.ts` - Authentication
- `blogService.ts` - Blog CRUD
- `serviceService.ts` - Service CRUD
- `testimonialService.ts` - Testimonial CRUD
- `contactService.ts` - Contact form submission

### Hooks

Custom React hooks in `src/hooks/`:
- `useScroll()` - Scroll position and detection
- `useInView()` - Intersection observer for animations

### Context

State management in `src/context/`:
- `AuthContext.tsx` - Authentication state and login/logout

### Utilities

Helper functions in `src/utils/`:
- `helpers.ts` - Formatting, slug generation, text truncation

### Styles

Global styles in `src/styles/`:
- `index.css` - Global styles and utility classes

## Styling

### Tailwind CSS

All styling uses Tailwind CSS utility classes. Main configuration in `tailwind.config.js`:

- **Custom Colors**: Brand gradient colors (primary, accent, warning)
- **Dark Mode**: Configured but not enabled by default
- **Responsive**: Mobile-first approach

Example usage:
```tsx
<div className="bg-gradient-brand text-white p-6 rounded-lg hover:shadow-lg transition-shadow">
  Content
</div>
```

### Global Styles

`src/styles/index.css` includes:
- Font import (Inter)
- CSS reset
- Scrollbar styling
- Selection styles
- Utility classes

## Animations

### Framer Motion

All animations use Framer Motion for smooth, performant transitions:

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

Common animation patterns:
- Page transitions
- Component entrance animations
- Hover effects on cards
- Scroll-triggered animations

## SEO Optimization

Using React Helmet Async for meta tags:

```tsx
import { Helmet } from 'react-helmet-async'

<Helmet>
  <title>Page Title</title>
  <meta name="description" content="Page description" />
  <meta property="og:title" content="Open Graph Title" />
</Helmet>
```

All main pages are optimized with appropriate meta tags.

## API Integration

### Making API Calls

All API calls go through `apiClient.ts` which:
- Automatically adds JWT token to requests
- Handles CORS
- Provides proper error handling

Example:
```tsx
import { blogService } from '@services/blogService'

// Fetch blogs
const response = await blogService.getAll(0, 10)

// Create blog (admin)
const newBlog = await blogService.create(blogData)

// Update blog
await blogService.update(blogId, updateData)

// Delete blog
await blogService.delete(blogId)
```

### Authentication

JWT token is stored in localStorage and automatically added to requests:

```tsx
import { useAuth } from '@context/AuthContext'

const { isAuthenticated, token, login, logout } = useAuth()
```

## Form Handling

### Contact Form Example

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await contactService.submit(formData)
    // Success handling
  } catch (error) {
    // Error handling
  }
}
```

## Responsive Design

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Navigation

Header includes responsive navigation:
- Desktop: Horizontal nav bar
- Mobile: Hamburger menu with slide-out nav

```tsx
{isOpen && (
  <motion.nav
    className="md:hidden"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
  >
    {/* Mobile nav items */}
  </motion.nav>
)}
```

## Debugging

### React Developer Tools

Install React DevTools browser extension for:
- Component tree inspection
- Props/State debugging
- Performance profiling

### TypeScript Errors

Run type checking before building:
```bash
npm run type-check
```

### Network Debugging

Use browser DevTools Network tab to inspect API calls and responses.

## Performance Optimization

### Code Splitting

React Router enables automatic code splitting for each page route.

### Image Optimization

Placeholder images in components - replace with actual optimized images:
- Use WebP format where possible
- Optimize with tools like TinyPNG or ImageOptim
- Use proper dimensions

### Bundle Analysis

```bash
npm install --save-dev vite-plugin-visualizer
# Add to vite.config.ts and run build
```

## Common Tasks

### Add New Page

1. Create component in `src/pages/PageName.tsx`
2. Add route in `App.tsx`
3. Add navigation link in `Header.tsx`

### Add New Component

1. Create component file: `src/components/common/ComponentName.tsx`
2. Export from component
3. Import and use in pages

### Add New API Endpoint

1. Add service method in `src/services/serviceFile.ts`
2. Use in component with proper error handling
3. Add types/interfaces for data

### Update Styling

All styling is in Tailwind. To modify:
1. Update `tailwind.config.js` for global changes
2. Use Tailwind classes in components
3. Add custom CSS to `src/styles/index.css` if needed

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Ensure backend is running on `localhost:8080`
- Check VITE_API_URL in .env
- Check browser console for CORS errors
- Verify backend CORS configuration

### Build Errors
- Check for TypeScript errors: `npm run type-check`
- Clear Vite cache: `rm -rf dist node_modules/.vite`
- Try fresh install: `npm cache clean --force && npm install`

## Production Deployment

### Build Optimization
```bash
npm run build
```

Creates `dist/` folder ready for deployment.

### Deployment Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**AWS S3 + CloudFront:**
```bash
# Build
npm run build

# Deploy to S3
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Vite Documentation](https://vitejs.dev)
