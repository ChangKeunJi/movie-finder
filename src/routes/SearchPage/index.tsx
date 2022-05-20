import { useEffect, useState, useCallback, useMemo, ChangeEvent, ReactElement, SetStateAction } from 'react'
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { requestApi, favoriteData, queryData } from 'state'

import Loading from 'components/Loading'
import Input from 'components/Input'
import List from 'components/List'
import Modal from 'components/Modal'

interface Props {
  handleClickCheck: (data: IMovieData, _isFavorite: boolean) => void
  handleClickList: (item: IMovieData, _isFavorite: SetStateAction<boolean>) => void
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
  clicked: IMovieData
  isModalOpen: boolean
  isFavorite: boolean
}

const SearchPage = ({ clicked, setIsModalOpen, isModalOpen, isFavorite, handleClickList, handleClickCheck }: Props) => {
  const [list, setList] = useState<IMovieData[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const res = useRecoilValueLoadable(requestApi)
  const favoriteList = useRecoilValue(favoriteData)
  const setQuery = useSetRecoilState(queryData)

  useEffect(() => {
    if (res.contents.Response === 'False') {
      setError(true)
      return
    }
    if (res.contents.Response !== 'True') {
      return
    }
    setList(res.contents.Search)
    setIsLoading(false)
  }, [res])

  const debounceCall = useMemo(
    () =>
      _.debounce((q) => {
        setQuery(q)
      }, 500),
    [setQuery]
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.currentTarget
      setInputValue(value)
      setIsLoading(true)
      setError(false)
      debounceCall(value)

      if (value.length === 0) {
        setList([])
        setIsLoading(false)
      }
    },
    [debounceCall]
  )

  const renderList = useCallback((): JSX.Element | ReactElement[] | null => {
    if (error) return <p className={styles.message}>결과가 너무 많거나 잘못된 입력어 입니다. </p>
    if (isLoading) return <Loading />
    if (list.length === 0) return <p className={styles.message}>결과가 없습니다.!!</p>
    return list.map((item: any) => {
      const isFavoriteBool = favoriteList.filter((el) => el.imdbID === item.imdbID).length
      return <List isFavorite={!!isFavoriteBool} handleClickList={handleClickList} key={item.imdbID} data={item} />
    })
  }, [list, handleClickList, favoriteList, isLoading, error])

  return (
    <>
      <Input handleChange={handleChange} inputValue={inputValue} />
      <ul className={styles.ul}>
        {renderList()}
        <Modal
          clicked={clicked}
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
