import { useEffect, useState, useCallback, useMemo, ChangeEvent } from 'react'
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { requestApi, favoriteData, queryData } from 'state'
import { initial } from '../../constant/index'

import Input from 'components/Input'
import List from 'components/List'
import Modal from 'components/Modal'

const SearchPage = () => {
  const [list, setList] = useState<IMovieData[]>([])
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const res = useRecoilValueLoadable(requestApi)
  const favoriteList = useRecoilValue(favoriteData)
  const setQuery = useSetRecoilState(queryData)

  useEffect(() => {
    if (res.contents.Response !== 'True') return
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

  const debounceCall = useMemo(() => _.debounce((q) => setQuery(q), 500), [setQuery])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.currentTarget
      setInputValue(value)

      if (!value.length) setList([])

      debounceCall(value)
    },
    [debounceCall]
  )

  const handleClickList = useCallback(
    (item: IMovieData): void => {
      setClicked(item)
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  return (
    <>
      <Input handleChange={handleChange} inputValue={inputValue} />
      <ul className={styles.ul}>
        {list.length > 0 && list.map((item: any) => <List onClick={handleClickList} key={item.imdbID} data={item} />)}
        {list.length === 0 && <p className={styles.message}>검색결과가 없습니다 ‼️</p>}
        {isModalOpen && <Modal data={clicked} setIsModalOpen={setIsModalOpen} />}
      </ul>
    </>
  )
}

export default SearchPage

// 무한 스크롤 참조
// https://velog.io/@jce1407/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-Intersection-Observer
