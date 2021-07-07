import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getLinks, getNEPToken } from '../../config/stats'

export const Banner = () => {
  const { chainId } = useWeb3React()
  const [img, setImg] = useState(1)

  const nepToken = getNEPToken(chainId)
  const links = getLinks(chainId)

  useEffect(() => {
    const timer = setInterval(() => {
      if (img === 1) {
        setImg(2)
      } else {
        setImg(1)
      }
    }, 3000)

    return () => clearInterval(timer)
  })

  const href =
    img === 1
      ? links.tokenOnPancakeExchange.replace('%s', nepToken.address)
      : '/bond'

  const target = img === 1 ? '_blank' : undefined

  return (
    <Link href={href}>
      <a
        target={target}
        className='rounded-2xl flex  justify-center items-center'
        style={{ minHeight: '300px' }}
      >
        <img
          src={`/pancake-banner/img-${img}.png`}
          alt='PancakeSwap'
          className='w-full'
        />
      </a>
    </Link>
  )
}
