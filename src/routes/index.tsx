import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import styles from './Routes.module.scss'
import { favoriteData } from 'state'
import { local } from 'api/local'
import { IMovieData } from 'types'

import SearchPage from './SearchPage'
import FavoritePage from './FavoritePage'
import Layout from 'components/Layout'
import { initial } from '../constant/index'

const App = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clicked, setClicked] = useState<IMovieData>(initial)

  const [favorite, setFavorite] = useRecoilState(favoriteData)

  useEffect(() => {
    const localFavorite = local.getLocalStorage()

    setFavorite(localFavorite)
  }, [setFavorite])

  const handleClickCheck = useCallback(
    (data: IMovieData, _isFavorite: boolean) => {
      if (!_isFavorite) {
        const newData = [...favorite, data]
        setFavorite(newData)
        local.setLocalStorage(newData)
      } else {
        const prev = [...favorite].filter((fav) => fav.imdbID !== data.imdbID)
        setFavorite(prev)
        local.setLocalStorage(prev)
      }

      setIsModalOpen(!isModalOpen)
    },
    [favorite, setFavorite, isModalOpen]
  )

  const handleClickList = useCallback(
    (item: IMovieData, _isFavorite: SetStateAction<boolean>): void => {
      setClicked(item)
      setIsFavorite(_isFavorite)
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              path=''
              element={
                <SearchPage
                  handleClickCheck={handleClickCheck}
                  handleClickList={handleClickList}
                  clicked={clicked}
                  isModalOpen={isModalOpen}
                  isFavorite={isFavorite}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route
              path='favorite'
              element={
                <FavoritePage
                  handleClickCheck={handleClickCheck}
                  handleClickList={handleClickList}
                  clicked={clicked}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route path='*' element={<div>404</div>} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
