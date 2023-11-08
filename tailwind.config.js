/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sky-50": "#f0f9ff",
        "sky-100": "#e0f2fe",
        "sky-200": "#bae6fd",
        "sky-300": "#7dd3fc",
        "sky-400": "#38bdf8",
        "sky-500": "#0ea5e9",
        "sky-600": "#0284c7",
        "sky-700": "#0369a1",
        "sky-800": "#075985",
        "sky-900": "#0c4a6e",
        "sky-950": "#082f49",

        "blue-50": "#eff6ff",
        "blue-100": "#dbeafe",
        "blue-200": "#bfdbfe",
        "blue-300": "#93c5fd",
        "blue-400": "#60a5fa",
        "blue-500": "#3b82f6",
        "blue-600": "#2563eb",
        "blue-700": "#1d4ed8",
        "blue-800": "#1e40af",
        "blue-900": "#1e3a8a",
        "blue-950": "#172554",

        "amber-50": "#fffbeb",
        "amber-100": "#fef3c7",
        "amber-200": "#fde68a",
        "amber-300": "#fcd34d",
        "amber-400": "#fbbf24",
        "amber-500": "#f59e0b",
        "amber-600": "#d97706",
        "amber-700": "#b45309",
        "amber-800": "#92400e",
        "amber-900": "#78350f",
        "amber-950": "#451a03",

        "slate-50": "#f8fafc",
        "slate-100": "#f1f5f9",
        "slate-200": "#e2e8f0",
        "slate-300": "#cbd5e1",
        "slate-400": "#94a3b8",
        "slate-500": "#64748b",
        "slate-600": "#475569",
        "slate-700": "#334155",
        "slate-800": "#1e293b",
        "slate-900": "#0f172a",
        "slate-950": "#020617",
      },
      boxShadow: {
        figma: "0 4px 4px 0px rgba(0,0,0,0.25)",
      },
      animation: {
        "bounce-slow": "bounce 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
});
