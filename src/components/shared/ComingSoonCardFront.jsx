export const ComingSoonCardFront = ({ name, logo }) => {
  return (
    <div
      className='w-full h-full bg-black bg-opacity-15 relative'
      style={{
        backgroundImage: "url('/patterns/card-coming-soon.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
      }}
    >
      <div className='my-5 md:my-10 ml-5 md:ml-10'>
        <img src={logo} className='w-10 inline-block mr-4' />
        <span className='align-middle text-lg md:text-xl text-gray-400 font-medium leading-none'>
          {name}
        </span>
      </div>
      <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
        <p className='uppercase text-lg text-gray-400 text-center font-medium tracking-wider'>
          Coming Soon
        </p>
      </div>
    </div>
  )
}
