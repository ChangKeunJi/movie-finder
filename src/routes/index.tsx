import { useEffect } from 'react'
import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import { favoriteData } from 'state'
import { useRecoilState } from 'recoil'
import { local } from 'api/local'

import SearchPage from './SearchPage'
import FavoritePage from './FavoritePage'

const App = () => {
  const [, setRecoilFavorite] = useRecoilState(favoriteData)

  // 로컬에서 favorite 데이터 가져와 recoil 상태 업데이트
  useEffect(() => {
    const localFavorite = local.getLocalStorage()

    setRecoilFavorite(localFavorite)
  }, [setRecoilFavorite])

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/favorite' element={<FavoritePage />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
