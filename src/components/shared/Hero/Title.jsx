import styles from './Title.module.css'

const HeroTitle = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>
}

export default HeroTitle
