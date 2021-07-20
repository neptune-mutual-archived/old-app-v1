import { useRouter } from 'next/router'
import {
  ROADMAP_URL,
  DOCUMENTATION_URL
} from '../../../../config/constants/external-links'
import { Links } from './links'
import Illustration1 from './illustrations/one'
import Illustration2 from './illustrations/two'
import Illustration3 from './illustrations/three'

const ComingSoon = ({ children }) => {
  const router = useRouter()
  let Illustration = Illustration3

  if (router.pathname === '/prediction-market') {
    Illustration = Illustration1
  }

  if (router.pathname === '/cover') {
    Illustration = Illustration2
  }

  return (
    <div
      className='w-full h-full flex justify-center items-center py-12 px-4'
      style={{ maxWidth: '100vw' }}
    >
      <div className='max-w-screen-sm text-center'>
        <div className='mx-auto mb-2 md:mb-12'>
          <Illustration className='max-w-full mx-auto' />
        </div>
        <p className='text-gray-400 text-lg'>
          Okie dokie. Turns out, this feature isn’t ready yet!
        </p>
        <h3 className='text-gray-300 text-3xl leading-normal md:text-4xl md:leading-normal'>
          Stay Tuned for the Latest
        </h3>
        <p className='text-gray-400 text-base'>
          Follow us on Github and other social channels to stay updated on our
          latest and greatest work. Check out our{' '}
          <a
            href={ROADMAP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400'
          >
            roadmap
          </a>{' '}
          and{' '}
          <a
            href={DOCUMENTATION_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400'
          >
            documentation
          </a>{' '}
          for more info. Send our admins a <em>friendly hello</em> on Telegram
          and keep the discussion going.
        </p>
        <Links />
      </div>
    </div>
  )
}

export default ComingSoon
