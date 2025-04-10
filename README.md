This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# UI Animation Requirements

## About Page Animations

### Introduction Section
- **Text Elements**:
  - Animate with staggered entrance (100ms delay between elements)
  - Motion: Fade in (opacity 0→1) + Slide up (translateY 50px→0)
  - Easing: easeOutExpo
  - Duration: 800ms

### Skill Bars
- **Animation**:
  - Width grow from 0% to 100% 
  - Spring physics (stiffness: 1, damping: 80, mass: 10)
  - Opacity fade in (0→1)
  - Staggered delay (100ms)

### Timeline Items
- **Hover Effects**:
  - Background color transition (dark→lighter)
  - Dot indicator color change (blue→purple)
  - Smooth transition (300ms)

## Implementation Notes

1. **Dependencies**:
   - Primary: anime.js (v3.2+)
   - Fallback: Framer Motion (for complex layouts)

2. **Performance**:
   - All animations should be GPU-accelerated
   - Max animation duration: 1000ms
   - Mobile: Reduce animation complexity

3. **Accessibility**:
   - Respect `prefers-reduced-motion`
   ```js
   // Example implementation
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
     anime.set('.animated-element', { opacity: 1 });
   }