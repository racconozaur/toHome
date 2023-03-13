module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cyellow': '#FFC300',
        'cblue': '#023047',
        'cwhite': '#F8F9FA',
        'cshwhite': 'rgba(250, 250, 250, 0.5)',
        'cgray': 'rgba(73, 73, 73, 0.5)'
      },
      dropShadow: {
        '3xl': '0px 0px 16px 1px rgba(0, 0, 0, 0.21)'
      }
    },
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1690px',
      }
    }
    
  },
  plugins: [],
}

