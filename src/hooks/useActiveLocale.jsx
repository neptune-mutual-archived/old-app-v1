import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../config/constants/locales'

const parseLocale = (maybeSupportedLocale) => {
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase()
  return SUPPORTED_LOCALES.find(
    (locale) =>
      locale.toLowerCase() === lowerMaybeSupportedLocale ||
      locale.split('-')[0] === lowerMaybeSupportedLocale
  )
}

export const navigatorLocale = () => {
  if (!process.browser || !window || !navigator || !navigator.language)
    return undefined

  const [language, region] = navigator.language.split('-')

  if (region) {
    return (
      parseLocale(`${language}-${region.toUpperCase()}`) ??
      parseLocale(language)
    )
  }

  return parseLocale(language)
}

export const useActiveLocale = () => {
  return navigatorLocale() ?? DEFAULT_LOCALE
}
