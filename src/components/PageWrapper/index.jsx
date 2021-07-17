import PageHeader from '../PageHeader'
import PageSidebar from '../PageSidebar'
import { GlobalProvider } from '../../context/global'

import { useGlobalLoader } from '../../hooks/useGlobalLoader'
import { useEagerConnect } from '../../hooks/useEagerConnect'
import { PageLoader } from '../shared/PageLoader'

import styles from './index.module.css'

const Content = ({ children }) => {
  const { isLoading, percent } = useGlobalLoader()
  useEagerConnect()

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
  return (
    <GlobalProvider>
      <Content>{children}</Content>
    </GlobalProvider>
  )
}

export default PageWrapper