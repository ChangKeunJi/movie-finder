import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { Star, Search } from '../../assets/icon/index'
import styles from './Tab.module.scss'

const ICONS = [
  {
    component: <Search />,
    path: '/',
    key: 'search',
  },
  {
    component: <Star />,
    path: '/favorite',
    key: 'favorite',
  },
]

const Tab = () => {
  return (
    <section className={styles.container}>
      {ICONS.map((icon) => {
        return (
          <NavLink
            to={icon.path}
            key={icon.key}
            className={({ isActive }) => cx(styles.icon, { [styles.isActive]: isActive })}
          >
            {icon.component}
          </NavLink>
        )
      })}
    </section>
  )
}

export default Tab
