import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from '../../utils/class-names'
import data from '../../config/nav/links'
import styles from './index.module.css'

const SidebarLink = ({ path, name, icon: Icon, activeIcon: ActiveIcon }) => {
  const router = useRouter()

  const isActive = router.pathname === path
  const activeIconWithAnimation = (
    <span className='animate-wiggle'>
      <ActiveIcon />
    </span>
  )

  return (
    <Link href={path}>
      <a
        className={classNames(
          styles.link,
          isActive && styles['link--selected']
        )}
      >
        {isActive ? activeIconWithAnimation : <Icon />}
        <div className='text-center'>{name}</div>
      </a>
    </Link>
  )
}

const PageSidebar = () => {
  return (
    <>
      {data.map((x) => (
        <SidebarLink key={x.path} {...x} />
      ))}
    </>
  )
}

export default PageSidebar
