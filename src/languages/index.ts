import RU from './ru.json'

import { E_Locale } from 'models/shared/app'

const translations = { [E_Locale.ru]: RU }

export const t = (key: string): string => {
  const keys = key.split('.')
  return getNestedTranslation(E_Locale.ru, keys) || key
}

const getNestedTranslation = (language: E_Locale, keys: string[]) => {
  return keys.reduce((obj: any, key: string) => {
    return obj?.[key]
  }, translations[language])
}
