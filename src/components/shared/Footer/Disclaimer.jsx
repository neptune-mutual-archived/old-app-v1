import styles from './Disclaimer.module.css'

const Disclaimer = ({ children }) => {
  return <div className={styles.disclaimer}>{children}</div>
}

export default Disclaimer
