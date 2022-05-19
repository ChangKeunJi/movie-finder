import styles from './Layout.module.scss'
import Tab from '../Tab/index'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <footer className={styles.tab}>
        <Tab />
      </footer>
    </div>
  )
}

export default Layout
