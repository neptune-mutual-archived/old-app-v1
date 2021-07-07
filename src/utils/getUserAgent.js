import { UAParser } from 'ua-parser-js'

export const getUserAgent = () => {
  const parser = new UAParser(window.navigator.userAgent)
  return parser.getResult()
}
