/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    data: {
      expanded: 'expanded~="true"'
    },
    extend: {
      fontFamily: {
        inherit: 'inherit'
      },
      borderRadius: {
        DEFAULT: '20px'
      },
      backgroundImage: {
        'border-dashed': `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%239CA3AF' strokeWidth='1' stroke-dasharray='8' stroke-dashoffset='2' stroke-linecap='round'/%3e%3c/svg%3e")`,
        'error-border-dashed': `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23FF2525' strokeWidth='1' stroke-dasharray='8' stroke-dashoffset='2' stroke-linecap='round'/%3e%3c/svg%3e")`
      },
      fontSize: {
        'sm': ['12px', '18px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '26px'],
        'xl': ['20px', '30px'],
        '3xl': ['40px', '44px']
      },
      colors: {
        'black': '#030712',
        'gray': '#374151',
        'light-gray': '#9CA3AF',
        'input-gray': '#F3F4F6',
        'border-gray': '#E5E7EB',
        'check-gray': '#6B7280',
        'purple': '#4F46E5',
        'hover-purple': '#6366F1',
        'error': '#FF2525',
        'background': 'rgba(3, 7, 18, 0.72)'
      },
      rotate: {
        'arrow': ''
      }
    }
  },
  plugins: [],
};
