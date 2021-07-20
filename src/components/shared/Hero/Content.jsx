const HeroContent = ({ children }) => {
  return (
    <p className='py-5 xl:pt-10 xl:pb-6 px-5 xl:pl-10 text-sm md:text-lg font-normal text-gray-400 max-w-prose'>
      {children}
    </p>
  )
}

export default HeroContent
