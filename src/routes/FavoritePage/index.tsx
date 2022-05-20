import styles from './FavoritePage.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useCallback, useState } from 'react'

import { favoriteData } from 'state'
import { IMovieData } from 'types'
import { initial } from '../../constant/index'
import { local } from 'api/local'

import Modal from 'components/Modal'
import List from 'components/List'

const FavoritePage = () => {
  const recoilFavorite = useRecoilValue(favoriteData)
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorite, setFavorite] = useRecoilState(favoriteData)

  const handleClickList = useCallback(
    (item: IMovieData): void => {
      setClicked(item)
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  const handleClickCheck = useCallback(() => {
    const prev = [...favorite].filter((fav) => fav.imdbID !== clicked.imdbID)
    setFavorite(prev)
    local.setLocalStorage(prev)

    setIsModalOpen(!isModalOpen)
  }, [clicked.imdbID, favorite, isModalOpen, setFavorite])

  return (
    <>
      <p className={styles.title}>즐겨찾기 목록</p>
      <section className={styles.container}>
        {recoilFavorite.length > 0 &&
          recoilFavorite.map((item: any) => (
            <List isFavorite handleClickList={handleClickList} key={item.imdbID} data={item} />
          ))}
        {recoilFavorite.length === 0 && <p className={styles.message}>즐겨찾기가 없습니다 ‼️</p>}
        <Modal
          isFavorite
          handleClickCheck={handleClickCheck}
          clicked={clicked}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </section>
    </>
  )
}

export default FavoritePage
