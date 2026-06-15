import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D00',
        secondary: '#FF6B00',
        accent: '#FF9500',
        background: '#050505',
        surface: '#101010',
        card: '#161616',
        border: 'rgba(255,255,255,0.08)',
        text: {
          primary: '#FFFFFF',
          secondary: '#BDBDBD',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF2A00, #FF6B00, #FF9500)',
        'gradient-dark': 'linear-gradient(135deg, #050505, #101010)',
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        display: '72px',
        h1: '64px',
        h2: '48px',
        h3: '36px',
        h4: '28px',
        body: '18px',
        small: '14px',
      },
      spacing: {
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        64: '64px',
        96: '96px',
        128: '128px',
      },
      maxWidth: {
        'container': '1400px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 77, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 77, 0, 0.8)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(255, 77, 0, 0.3)',
        'glow-primary-lg': '0 0 60px rgba(255, 77, 0, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(255, 77, 0, 0.1)',
      },
      backdropBlur: {
        'glass': 'blur(20px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
