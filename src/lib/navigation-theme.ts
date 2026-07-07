import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const navigationThemes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2563eb',
      background: '#ffffff',
      card: '#ffffff',
      text: '#0a0a0a',
      border: '#e5e5e5',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#60a5fa',
      background: '#0a0a0a',
      card: '#171717',
      text: '#fafafa',
      border: '#2e2e2e',
    },
  },
};
