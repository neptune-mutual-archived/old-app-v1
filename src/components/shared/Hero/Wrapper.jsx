import styles from './Wrapper.module.css'

const HeroWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default HeroWrapper
