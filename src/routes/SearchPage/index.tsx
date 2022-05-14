import { useEffect, useState, useCallback } from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { requestData, favoriteData, queryData } from 'state'
import { initial } from '../../constant/index'

import Layout from 'components/Layout'
import Input from 'components/Input'
import List from 'components/List'
import Modal from 'components/Modal'

const SearchPage = () => {
  const [list, setList] = useState<IMovieData[]>([])
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const res = useRecoilValueLoadable(requestData)
  const favoriteList = useRecoilValue(favoriteData)
  const [, setQuery] = useRecoilState(queryData)

  // 즐겨찾기 페이지에서 다시 돌아올 때 목록 초기화
  useEffect(() => {
    setQuery('')
  }, [setQuery])

  // 즐겨찾기 목록과 api response를 받아온 뒤 List에 favorite 속성을 추가
  useEffect(() => {
    if (!_.isArray(res.contents.Search)) {
      setList([])
      return
    }
    const copied = res.contents.Search.slice() // api response
    const copiedFav = favoriteList.slice() // 즐겨찾기 목록

    // response 중 즐겨찾기 목록과 동일한 Movie가 있다면 'favorite:true' 속성 추가
    const newList = copied.map((movie: IMovieData) => {
      const bool = copiedFav.find((fav) => fav.imdbID === movie.imdbID)
      return {
        ...movie,
        favorite: bool,
      }
    })
    setList(newList)
  }, [res, favoriteList])

  // 클릭하면 해당 Item을 Modal 컴포넌트에 전달해주고 Modal을 렌더링
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
