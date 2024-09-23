import { type Config } from 'tailwindcss';

export default {
  content: [
    '{routes,islands,components}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'leckerli': ['"Leckerli One"', 'cursive'],
        'poppins': ['"Poppins"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
    },
  },
} satisfies Config;
