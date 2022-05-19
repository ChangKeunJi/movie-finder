import { useEffect, useState, useCallback, useMemo, ChangeEvent, ReactElement, SetStateAction } from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { requestApi, favoriteData, queryData } from 'state'
import { initial } from '../../constant/index'
import { local } from 'api/local'

import Input from 'components/Input'
import List from 'components/List'
import Modal from 'components/Modal'

const SearchPage = () => {
  const [list, setList] = useState<IMovieData[]>([])
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  const res = useRecoilValueLoadable(requestApi)
  const favoriteList = useRecoilValue(favoriteData)
  const setQuery = useSetRecoilState(queryData)
  const [favorite, setFavorite] = useRecoilState(favoriteData)

  useEffect(() => {
    if (res.contents.Response !== 'True') return
    setList(res.contents.Search)
  }, [res])

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
    (item: IMovieData, _isFavorite: SetStateAction<boolean>): void => {
      setClicked(item)
      setIsFavorite(_isFavorite)
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  const renderList = useCallback((): JSX.Element | ReactElement[] => {
    if (list.length === 0) return <p className={styles.message}>검색결과가 없습니다 ‼️</p>
    return list.map((item: any) => {
      const isFavoriteBool = favoriteList.filter((el) => el.imdbID === item.imdbID).length
      return <List isFavorite={!!isFavoriteBool} handleClickList={handleClickList} key={item.imdbID} data={item} />
    })
  }, [list, handleClickList, favoriteList])

  const handleClickCheck = useCallback(
    (data: IMovieData) => {
      if (!isFavorite) {
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
    [isFavorite, favorite, setFavorite, isModalOpen]
  )

  return (
    <>
      <Input handleChange={handleChange} inputValue={inputValue} />
      <ul className={styles.ul}>
        {renderList()}
        <Modal
          data={clicked}
          handleClickCheck={handleClickCheck}
          isModalOpen={isModalOpen}
          isFavorite={isFavorite}
          setIsModalOpen={setIsModalOpen}
        />
      </ul>
    </>
  )
}

export default SearchPage

// 무한 스크롤 참조
// https://velog.io/@jce1407/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-Intersection-Observer
