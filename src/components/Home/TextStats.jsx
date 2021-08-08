export const TextStats = ({ title, value, footer }) => {
  return (
    <div>
      <h5 className='mb-2 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
        {title}
      </h5>
      <p className='font-numbers text-xl sm:text-2xl md:text-3xl xl:text-4xl font-medium whitespace-nowrap'>
        {value}
      </p>
      {footer && (
        <p className='mt-2 text-xs xl:text-sm font-light text-gray-400'>
          {footer}
        </p>
      )}
    </div>
  )
}
