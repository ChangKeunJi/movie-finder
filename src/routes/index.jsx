import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import Weather from './Weathers'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='weather' element={<Weather />}>
            <Route path=':city' element={<Weather />} />
          </Route>
          <Route path='*' element={<Weather />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
