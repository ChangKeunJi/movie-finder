import styles from './FavoritePage.module.scss'
import { useRecoilValue } from 'recoil'
import { useCallback, useState } from 'react'

import { favoriteData } from 'state'
import { IMovieData } from 'types'
import { initial } from '../../constant/index'

import Modal from 'components/Modal'
import List from 'components/List'

const FavoritePage = () => {
  const recoilFavorite = useRecoilValue(favoriteData)
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 클릭하면 해당 Item을 Favorite에 추가
  const handleClickList = useCallback(
    (item: IMovieData): void => {
      // 클릭된 Item 로컬 상태에 저장(Modal에 넘겨주기 위해)
      setClicked(item)
      // 모달 Open
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  return (
    <>
      <p className={styles.title}>즐겨찾기 목록</p>
      <section className={styles.container}>
        {recoilFavorite.length > 0 &&
          recoilFavorite.map((item: any) => <List onClick={handleClickList} key={item.imdbID} data={item} />)}
        {recoilFavorite.length === 0 && <p className={styles.message}>즐겨찾기가 없습니다 ‼️</p>}
        {isModalOpen && <Modal data={clicked} setIsModalOpen={setIsModalOpen} />}
      </section>
    </>
  )
}

export default FavoritePage
