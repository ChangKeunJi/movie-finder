import _ from 'lodash'

import { SearchInput } from 'assets/icon'
import { ChangeEvent, useRef, useState } from 'react'

import styles from './Input.module.scss'

const Input = () => {
  const [value, setValue] = useState<string>('')

  const inputRef = useRef(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    debounceCall(e.currentTarget.value)
  }

  // TODO: console.log 대신 recoil 상태 업데이트 함수 호출
  const debounceCall = useRef(_.debounce((q) => console.log(q), 500)).current

  return (
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
  )
}

export default Input
