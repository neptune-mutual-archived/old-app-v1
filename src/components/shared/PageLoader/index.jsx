import ProgressBar from '../ProgressBar'

export const PageLoader = ({ percent = 50 }) => {
  const progressBarProps = {
    min: 0,
    max: 100,
    now: percent
  }

  return (
    <div className='fixed bg-gray-900 inset-0 flex'>
      <div className='m-auto flex flex-col items-center gap-4'>
        <div className='mb-4'>
          <img src='/nep-icon.svg' alt='Neptune Mutual' />
        </div>
        <div className='w-screen max-w-lg px-8'>
          <ProgressBar {...progressBarProps} />
        </div>
        <div className='text-lg'>Neptune Mutual</div>
        <noscript>
          <div className='text-base'>
            Please enable JavaScript in your browser
          </div>
        </noscript>
      </div>
    </div>
  )
}
