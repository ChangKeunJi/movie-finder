import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'

import SearchPage from './SearchPage'
// import FavoritePage from './FavoritePage'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/favorite' element={<SearchPage />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
