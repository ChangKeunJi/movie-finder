import { useEffect, useState, useCallback } from 'react'
import styles from './SearchPage.module.scss'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import _ from 'lodash'

import { IMovieData } from 'types'
import { requestData, favoriteData } from 'state'
import Layout from 'components/Layout'
import Input from 'components/Input'
import List from 'components/List'
import Modal from 'components/Modal'

const initial = {
  Title: '',
  Year: '',
  imdbID: '',
  Type: '',
  Poster: '',
  favorite: false,
}

const SearchPage = () => {
  const [list, setList] = useState<IMovieData[]>([])
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const res = useRecoilValueLoadable(requestData)
  const favoriteList = useRecoilValue(favoriteData)
  console.log(favoriteList)

  // 즐겨찾기 목록을 받아온 뒤 List에 favorite 속성을 추가
  useEffect(() => {
    if (!_.isArray(res.contents.Search)) {
      setList([])
      return
    }
    const copied = res.contents.Search.slice()
    const copiedFav = favoriteList.slice()
    const newList = copied.map((movie: IMovieData) => {
      const bool = copiedFav.includes(movie.imdbID)
      return {
        ...movie,
        favorite: bool,
      }
    })
    setList(newList)
  }, [res, favoriteList])

  // 클릭하면 해당 Item을 Favorite에 추가
  const handleClickList = useCallback(
    (item: IMovieData): void => {
      setClicked(item)
      // 모달 open
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  return (
    <Layout>
      <Input />
      <main className={styles.main}>
        {_.isArray(list) && list.map((item: any) => <List onClick={handleClickList} key={item.imdbID} data={item} />)}
        {!_.isArray(list) && (
          <div className={styles.message}>
            <p>검색결과가 없습니다 ‼️</p>
          </div>
        )}
        {isModalOpen && <Modal data={clicked} setIsModalOpen={setIsModalOpen} />}
      </main>
    </Layout>
  )
}

export default SearchPage
