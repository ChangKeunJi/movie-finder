import _ from 'lodash'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'

import { queryData, requestData } from 'state'
import { SearchInput } from 'assets/icon'
import { Suspense, ChangeEvent, useCallback, useRef, useState } from 'react'

import styles from './Input.module.scss'

const Input = () => {
  const [, setQuery] = useRecoilState(queryData)
  const [value, setValue] = useState<string>('')

  const inputRef = useRef(null)
  const debounceCall = useRef(_.debounce((q) => setQuery(q), 500)).current

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setValue(e.currentTarget.value)
      debounceCall(e.currentTarget.value)
    },
    [debounceCall]
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
