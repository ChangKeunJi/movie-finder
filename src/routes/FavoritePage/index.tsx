import styles from './FavoritePage.module.scss'
import { useRecoilValue } from 'recoil'
import { SetStateAction } from 'react'

import { favoriteData } from 'state'
import { IMovieData } from 'types'

import Modal from 'components/Modal'
import List from 'components/List'

interface Props {
  handleClickCheck: (data: IMovieData, _isFavorite: boolean) => void
  handleClickList: (item: IMovieData, _isFavorite: SetStateAction<boolean>) => void
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
  clicked: IMovieData
  isModalOpen: boolean
}

const FavoritePage = ({ clicked, setIsModalOpen, isModalOpen, handleClickList, handleClickCheck }: Props) => {
  const recoilFavorite = useRecoilValue(favoriteData)

  const renderList = (list: IMovieData[]) => {
    if (list.length === 0) return <p className={styles.message}>즐겨찾기가 없습니다 ‼️</p>

    return recoilFavorite.map((item: any) => (
      <List isFavorite handleClickList={handleClickList} key={item.imdbID} data={item} />
    ))
  }
  return (
    <>
      <p className={styles.title}>즐겨찾기 목록</p>
      <section className={styles.container}>
        {renderList(recoilFavorite)}
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
