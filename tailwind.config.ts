import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const kanit = ["Kanit", "sans-serif"];

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        kanit,
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        third: "var(--third)",
        fourth: "var(--fourth)",
        text_primary: "var(--text-primary)",
        text_secondary: "var(--text-secondary)",
        border_primary: "var(--border-primary)",
        border_secondary: "var(--border-secondary)",
        fastwork: {
          blue: "#0078FF",
          "deep-blue": "#0062CC",
          "light-blue": "#0F9DFF",
          "bright-blue": "#10A3FF",
        },
        verification: {
          blue: "#0078FF",
          background: "#f0f4fd",
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        admin: {
          'purple': '#6E59A5',
          'light-purple': '#E5DEFF',
          'dark': '#1A1F2C',
          'blue': '#0EA5E9',
          'light-gray': '#F1F0FB',
          'gray': '#8E9196',
        }
      },
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "modal-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "modal-fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
        },
        "backdrop-fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "backdrop-fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        loader1: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        loader2: {
          "0%": { transform: "translate(0)" },
          "100%": { transform: "translate(1.5rem)" },
        },
        loader3: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "scale-up": "scale-up 0.5s ease-out",
        "spin-fast": "spin 600ms linear infinite",
        "modal-show":
          "modal-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "modal-hide": "modal-fade-out 0.2s ease-out forwards",
        "backdrop-show": "backdrop-fade-in 0.2s ease-out forwards",
        "backdrop-hide": "backdrop-fade-out 0.2s ease-out forwards",
        loader1: "loader1 0.6s infinite",
        loader2: "loader2 0.6s infinite",
        loader3: "loader3 0.6s infinite",
        "fade-down": "fade-down 0.1s ease-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".rounded-reward-sp": {
          borderRadius: "100% 100% 0px 0px / 100% 100% 0% 0%",
        },
        ".rounded-reward-pc": {
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        },
      });
    },
  ],
};
export default config;
