import { useEffect, useState, useCallback, useMemo, ChangeEvent, ReactElement, SetStateAction } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { favoriteData, queryData } from 'state'
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
  const favoriteList = useRecoilValue(favoriteData)
  const setQuery = useSetRecoilState(queryData)

  const { loading, error, list } = useReqestMovie(inputValue)

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
      debounceCall(value)
    },
    [debounceCall]
  )

  const renderList = useCallback((): JSX.Element | ReactElement[] | null => {
    if (error) return <p className={styles.message}>결과가 너무 많거나 잘못된 입력어 입니다. </p>
    if (loading) return <Loading />
    if (!list) return <p className={styles.message}>결과가 없습니다.!!</p>
    return list.map((item: any) => {
      const isFavoriteBool = favoriteList.filter((el) => el.imdbID === item.imdbID).length
      return <List isFavorite={!!isFavoriteBool} handleClickList={handleClickList} key={item.imdbID} data={item} />
    })
  }, [list, handleClickList, favoriteList, loading, error])

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
