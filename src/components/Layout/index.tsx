import { ReactNode } from 'react'

import styles from './Layout.module.scss'
import Tab from '../Tab/index'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
      <footer className={styles.tab}>
        <Tab />
      </footer>
    </div>
  )
}

export default Layout
