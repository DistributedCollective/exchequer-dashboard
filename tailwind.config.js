module.exports = {
  purge: ['./src/components/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
  future: {
    purgeLayersByDefault: true,
  },
  // darkMode: 'media', // 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      dark: '#222222', // background
      light: '#E9EAE9', // text
      yellow: {
        DEFAULT: '#FED559', // button (borders, text)
        light: '#FED55940', // button (bg)
      },
      green: '#47D43D',
      red: '#FF4B4B',
    },
    extend: {
      cursor: ['disabled'],
    },
  },
  variants: {
    opacity: ['responsive', 'hover'],
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
