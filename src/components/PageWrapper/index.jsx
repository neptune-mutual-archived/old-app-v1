import { useState, useEffect } from 'react'
import Headroom from 'react-headroom'

import PageHeader from '../PageHeader'
import PageSidebar from '../PageSidebar'
import { GlobalProvider } from '../../context/global'
import { useGlobalLoader } from '../../hooks/useGlobalLoader'
import { useEagerConnect } from '../../hooks/useEagerConnect'
import { useInactiveListener } from '../../hooks/useInactiveListener'
import { PageLoader } from '../shared/PageLoader'

import styles from './index.module.css'

const Content = ({ children }) => {
  const { isLoading, percent } = useGlobalLoader()
  const [tried, setTried] = useState(false)

  useEagerConnect()
  useInactiveListener(tried)
  useEffect(() => {
    setTried(true)
  }, [])

  if (isLoading) {
    return <PageLoader percent={percent} />
  }

  return (
    <>
      <header className={styles.header}>
        <PageHeader />
      </header>
      <div className={styles.content_wrapper}>
        <Headroom className={styles.sidebar} disableInlineStyles>
          <PageSidebar />
        </Headroom>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

const PageWrapper = ({ children }) => {
  return (
    <GlobalProvider>
      <Content>{children}</Content>
    </GlobalProvider>
  )
}

export default PageWrapper
