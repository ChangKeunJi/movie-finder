import { Dispatch, SetStateAction, useRef } from 'react'

import useOutsideClick from '../../hooks/useOutsideClick'
import styles from './Modal.module.scss'
import { IMovieData } from 'types'

interface Props {
  data: IMovieData
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
  handleClickCheck: Function
  isFavorite: Boolean
}

const Modal = ({ data, setIsModalOpen, isModalOpen, isFavorite, handleClickCheck }: Props) => {
  const modalRef = useRef<HTMLElement>(null)

  useOutsideClick(modalRef, () => setIsModalOpen((prev: boolean) => !prev))

  const decideText = () => {
    if (isFavorite) return <span className={styles.buttonRemove}>제거</span>
    return <span className={styles.buttonAdd}>추가</span>
  }

  const handleClickCancel = () => {
    setIsModalOpen((prev: boolean) => !prev)
  }

  if (!isModalOpen) return null

  return (
    <div className={styles.container}>
      <section ref={modalRef} className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>즐겨찾기를 &nbsp; {decideText()} &nbsp; 하시겠습니까?</p>
          </div>
          <div className={styles.buttonWrapper}>
            <button onClick={() => handleClickCheck(data)} className={styles.button} type='button'>
              {decideText()}
            </button>
            <button onClick={handleClickCancel} className={`${styles.button} ${styles.cancel}`} type='button'>
              취소
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Modal
