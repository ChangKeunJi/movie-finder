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

/* debounce 참조
https://velog.io/@edie_ko/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81-%EC%8B%9C%ED%82%A4%EA%B8%B0-feat.-Lodash-throttle-debounce
*/
