import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'alkhoeiDark',
    themes: {
      alkhoeiDark: {
        dark: true,
        colors: {
          background: '#061916',
          surface: '#0A2924',
          'surface-variant': '#133E37',
          primary: '#C5A059',
          'primary-darken-1': '#A37F3B',
          secondary: '#1A4D45',
          accent: '#E5C483',
          error: '#E53935',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          'on-background': '#F9F6F0',
          'on-surface': '#FFFFFF',
          'on-primary': '#061916',
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
