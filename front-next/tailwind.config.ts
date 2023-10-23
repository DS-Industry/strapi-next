import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors : {
      primaryColor: '#0284C7',
      secondaryColor: '#BAE6FD',
      accentColor: '#FFF',
      hideColor: '#E4E4E7',
      disabledColor: '#71717A',
      hoverColor: '#334155',
      activeColor: '#9333EA',
      backGroundColor: '#F1F5F9',
      textColor: '#000',
      primErrorColor: '#EF4444',
      secErrorColor: '#FECACA',
      primSuccessColor: '#22C55E',
      secSuccessColor: '#86EFAC',
      primWarningColor: '#EAB308',
      secWarningColor: '#FDE047',
      white: '#FFF',
      focusColor: '#2563EB',
      formColor: '#CBD5E1',
    }
  },
  plugins: [],
}
export default config
