import { E_Locale } from 'models/shared/app'

export const LocalStorage = {
  setAccessToken: (value: string) => localStorage.setItem('accessToken', value),
  getAccessToken: () => localStorage.getItem('accessToken'),
  removeAccessToken: () => localStorage.removeItem('accessToken'),

  setRefreshToken: (value: string) => localStorage.setItem('refreshToken', value),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  removeRefreshToken: () => localStorage.removeItem('refreshToken'),

  setLanguage: (locale: E_Locale) => localStorage.setItem('language', locale),
  getLanguage: () => (localStorage.getItem('language') as E_Locale) || E_Locale.ru,
}
