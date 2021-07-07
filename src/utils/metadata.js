const getTitlePrefix = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Home - '

    case '/pool':
      return 'Pool - '

    case '/bond':
      return 'Bond - '

    case '/cover':
      return 'Cover - '

    case '/prediction-market':
      return 'Bridge - '

    case '/choose':
      return 'Participate - '

    default:
      return ''
  }
}

const getOgImg = (pathname) => {
  switch (pathname) {
    case '/':
      return 'https://neptunemutual.com/og/home.png'

    case '/pool':
      return 'https://neptunemutual.com/og/home.png'

    case '/bond':
      return 'https://neptunemutual.com/og/home.png'

    case '/cover':
      return 'https://neptunemutual.com/og/home.png'

    case '/prediction-market':
      return 'https://neptunemutual.com/og/home.png'

    case '/choose':
      return 'https://neptunemutual.com/og/home.png'

    default:
      return 'https://neptunemutual.com/og/home.png'
  }
}

export const getMetadata = (pathname) => {
  return {
    title: getTitlePrefix(pathname) + 'Neptune Mutual',
    description:
      'Neptune Mutual provides you with guaranteed stablecoin liquidity to reduce your risk exposure by hedging against possible capital risks and smart contract vulnerabilities.',
    ogImg: getOgImg(pathname)
  }
}
