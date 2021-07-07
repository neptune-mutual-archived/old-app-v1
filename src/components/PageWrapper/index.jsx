import PageHeader from '../PageHeader'
import PageSidebar from '../PageSidebar'
import { GlobalProvider } from '../../context/global'

import useActivatingConnector from '../../hooks/useActivatingConnector'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import { useGlobalLoader } from '../../hooks/useGlobalLoader'
import { PageLoader } from '../shared/PageLoader'

import styles from './index.module.css'

const Content = ({ children }) => {
  const { isLoading, percent } = useGlobalLoader()

  if (isLoading) {
    return <PageLoader percent={percent} />
  }

  return (
    <>
      <header className={styles.header}>
        <PageHeader />
      </header>
      <div className={styles.content_wrapper}>
        <div className={styles.sidebar}>
          <PageSidebar />
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

const PageWrapper = ({ children }) => {
  const [activatingConnector] = useActivatingConnector()
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <GlobalProvider>
      <Content>{children}</Content>
    </GlobalProvider>
  )
}

export default PageWrapper
