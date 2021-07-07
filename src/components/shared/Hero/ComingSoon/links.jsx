const iconLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/neptune-mutual',
    iconSrc: '/icons/footer/github.svg'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/neptunemutual',
    iconSrc: '/icons/footer/twitter.svg'
  },
  {
    name: 'Reddit',
    href: 'https://www.reddit.com/r/NeptuneMutual/',
    iconSrc: '/icons/footer/reddit.svg'
  },
  // {
  //   name: 'LinkedIn',
  //   href: 'https://www.linkedin.com/company/neptune-mutual',
  //   iconSrc: '/icons/footer/linkedin.svg'
  // },
  // {
  //   name: 'Figma',
  //   href: '',
  //   iconSrc: '/icons/footer/figma.svg'
  // },
  // {
  //   name: 'BSCScan',
  //   href:
  //     'https://bscscan.com/token/0xce3805a443ebb27b2a4058ec9d94dc4f9c000633',
  //   iconSrc: '/icons/footer/bscscan.svg'
  // },
  {
    name: 'Medium',
    href: 'https://neptunemutual.medium.com/',
    iconSrc: '/icons/footer/medium.svg'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/neptunemutual',
    iconSrc: '/icons/footer/telegram.svg'
  }
]

export const Links = () => {
  return (
    <div className='w-full flex flex-wrap justify-center gap-8 my-8'>
      {iconLinks
        .filter((x) => x.href)
        .map((x, i) => (
          <div key={i}>
            <a
              href={x.href}
              target='_blank'
              rel='noopener noreferrer'
              title={x.name}
            >
              <img
                src={x.iconSrc}
                alt={x.name}
                className='transition duration-300 ease-in-out transform hover:scale-125 w-6 h-6'
              />
            </a>
          </div>
        ))}
    </div>
  )
}
