import CakeIcon from '../../shared/icons/CakeIcon'

const DetailsPane = ({ bottomBgSrc, children, isPancakeLinked }) => {
  return (
    <div className='p-6'>
      <div className='flex justify-end mb-4 opacity-30 h-6'>
        {isPancakeLinked && <CakeIcon />}
      </div>
      {children}
      <div className='w-32 h-32 absolute bottom-0 right-0 pointer-events-none'>
        <img src={bottomBgSrc} alt='pattern' className='w-full h-full' />
      </div>
    </div>
  )
}

export default DetailsPane
