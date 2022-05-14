import styles from './FavoritePage.module.scss'
import Layout from 'components/Layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { favoriteData, queryData } from 'state'
import { useCallback, useEffect, useState } from 'react'
import { IMovieData } from 'types'
import Modal from 'components/Modal'
import List from 'components/List'

const initial = {
  Title: '',
  Year: '',
  imdbID: '',
  Type: '',
  Poster: '',
  favorite: false,
}

const FavoritePage = () => {
  const [list, setList] = useState<IMovieData[]>([])
  const recoilFavorite = useRecoilValue(favoriteData)
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setQuery] = useRecoilState(queryData)

  // 즐겨찾기 페이지에서 다시 돌아올 때 상태 초기화
  useEffect(() => {
    setQuery('')
  }, [setQuery])

  useEffect(() => {
    setList(recoilFavorite)
  }, [recoilFavorite])

  // 클릭하면 해당 Item을 Favorite에 추가
  const handleClickList = useCallback(
    (item: IMovieData): void => {
      // 클릭된 Item 상태에 업데이트
      setClicked(item)
      // 모달 open
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  return (
    <Layout>
      <section className={styles.container}>
        <p className={styles.title}>즐겨찾기 목록</p>
        <ul className={styles.ul}>
          {list.length > 0 && list.map((item: any) => <List onClick={handleClickList} key={item.imdbID} data={item} />)}
          {list.length === 0 && <p className={styles.message}>즐겨찾기가 없습니다 ‼️</p>}
          {isModalOpen && <Modal data={clicked} setIsModalOpen={setIsModalOpen} />}
        </ul>
      </section>
    </Layout>
  )
}

export default FavoritePage
