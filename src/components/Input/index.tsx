import { ChangeEvent, useRef } from 'react'

import { SearchInput } from 'assets/icon'
import styles from './Input.module.scss'

interface Props {
  inputValue: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ handleChange, inputValue }: Props) => {
  const inputRef = useRef(null)

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <SearchInput />
      </div>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        placeholder='영화를 검색해보세요'
        className={styles.input}
      />
    </div>
  )
}

export default Input
