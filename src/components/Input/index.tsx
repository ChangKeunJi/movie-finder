import _ from 'lodash'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { pageData, queryData } from 'state'
import { SearchInput } from 'assets/icon'
import { Suspense, ChangeEvent, useCallback, useRef, useState } from 'react'

import styles from './Input.module.scss'

interface Props {
  setList: Function
}

const Input = ({ setList }: Props) => {
  const setQuery = useSetRecoilState(queryData)
  const resetQuery = useResetRecoilState(queryData)
  const [, setPage] = useRecoilState(pageData)
  const [value, setValue] = useState<string>('')

  const inputRef = useRef(null)
  const debounceCall = useRef(_.debounce((q) => setQuery(q), 500)).current

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      resetQuery()
      setList([])
      setValue(e.currentTarget.value)
      debounceCall(e.currentTarget.value)
      setPage(1)
    },
    [debounceCall, setPage, setList, resetQuery]
  )

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <SearchInput />
        </div>
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder='영화를 검색해보세요'
          className={styles.input}
        />
      </div>
    </Suspense>
  )
}

export default Input

/* debounce 참조
https://velog.io/@edie_ko/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81-%EC%8B%9C%ED%82%A4%EA%B8%B0-feat.-Lodash-throttle-debounce
*/
