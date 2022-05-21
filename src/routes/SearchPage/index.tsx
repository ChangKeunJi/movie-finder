import { useState, useCallback, useMemo, ChangeEvent, ReactElement, SetStateAction, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { favoriteData } from 'state'
import useReqestMovie from '../../hooks/useRequestMovie'

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
  const [inputValue, setInputValue] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedInput, setDebouncedInput] = useState(inputValue)
  const favoriteList = useRecoilValue(favoriteData)

  const { loading, error, list, setLoading, setList, hasMore } = useReqestMovie(debouncedInput, page)

  const observer: any = useRef()
  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true)
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1)
          }, 800)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, setLoading]
  )

  const debounceCall = useMemo(
    () =>
      _.debounce((q) => {
        if (q.length === 0) {
          setList([])
          setLoading(false)
          return
        }
        setDebouncedInput(q)
      }, 500),
    [setDebouncedInput, setList, setLoading]
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setLoading(true)
      const { value } = e.currentTarget
      setInputValue(value)
      debounceCall(value)
    },
    [debounceCall, setLoading]
  )

  const renderList = useCallback((): JSX.Element | ReactElement[] | null => {
    if (error) return <p className={styles.message}>결과가 너무 많거나 잘못된 입력어 입니다. </p>
    if (list.length === 0 && !loading) return <p className={styles.message}>결과가 없습니다.!!</p>
    return list.map((item: any, index: number) => {
      const isFavoriteBool = favoriteList.filter((el) => el.imdbID === item.imdbID).length
      if (list.length === index + 1) {
        return (
          <List
            lastElementRef={lastElementRef}
            isFavorite={!!isFavoriteBool}
            handleClickList={handleClickList}
            key={item.imdbID}
            data={item}
          />
        )
      }
      return <List isFavorite={!!isFavoriteBool} handleClickList={handleClickList} key={item.imdbID} data={item} />
    })
  }, [list, handleClickList, favoriteList, error, loading, lastElementRef])

  const renderLoading = useCallback(() => {
    if (!hasMore) return <p className={styles.message}>마지막 자료입니다.</p>
    if (loading) return <Loading />
    return null
  }, [loading, hasMore])
  return (
    <>
      <Input handleChange={handleChange} inputValue={inputValue} />
      <ul className={styles.ul}>
        {renderList()}
        {renderLoading()}
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
