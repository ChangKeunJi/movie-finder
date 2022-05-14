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

  // 즐겨찾기 목록을 받아온 뒤 List에 favorite 속성을 추가
  useEffect(() => {
    if (!_.isArray(res.contents.Search)) {
      setList([])
      return
    }
    const copied = res.contents.Search.slice()
    const copiedFav = favoriteList.slice()
    const newList = copied.map((movie: IMovieData) => {
      const bool = copiedFav.find((fav) => fav.imdbID === movie.imdbID)
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
      // 클릭된 Item 상태에 업데이트
      setClicked(item)
      // 모달 open
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  return (
    <Layout>
      <Input />
      <ul className={styles.ul}>
        {list.length > 0 && list.map((item: any) => <List onClick={handleClickList} key={item.imdbID} data={item} />)}
        {list.length === 0 && <p className={styles.message}>검색결과가 없습니다 ‼️</p>}
        {isModalOpen && <Modal data={clicked} setIsModalOpen={setIsModalOpen} />}
      </ul>
    </Layout>
  )
}

export default SearchPage
