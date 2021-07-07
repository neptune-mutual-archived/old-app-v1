export const TextStats = ({ title, value, footer }) => {
  return (
    <div>
      <h5 className='mb-2 text-gray-400 font-bold text-sm tracking-wider uppercase'>
        {title}
      </h5>
      <p className='font-numbers text-2xl md:text-4xl font-medium whitespace-nowrap'>
        {value}
      </p>
      {footer && (
        <p className='mt-2 text-sm font-light text-gray-400'>{footer}</p>
      )}
    </div>
  )
}
