import { useRef } from 'react'

import useOutsideClick from '../../hooks/useOutsideClick'
import { local } from 'api/local'
import { favoriteData } from 'state'
import styles from './Modal.module.scss'
import { IMovieData } from 'types'
import { useRecoilState } from 'recoil'

interface Props {
  data: IMovieData
  setIsModalOpen: Function
}

const Modal = ({ data, setIsModalOpen }: Props) => {
  const [favorite, setFavorite] = useRecoilState(favoriteData)
  const modalRef = useRef<HTMLElement>(null)

  // 바깥 클릭하면 닫아준다
  useOutsideClick(modalRef, () => setIsModalOpen((prev: boolean) => !prev))

  const renderText = () => {
    if (data.favorite) {
      return (
        <p>
          즐겨찾기에서 &nbsp; <span className={styles.buttonText}>삭제</span>하시겠습니까?
        </p>
      )
    }
    return (
      <p>
        즐겨찾기에 &nbsp; <span className={styles.buttonText}>추가</span>하시겠습니까?
      </p>
    )
  }

  // 취소 버튼 누르면 모달 닫아준다
  const handleClickCancel = () => {
    setIsModalOpen((prev: boolean) => !prev)
  }

  // 즐겨찾기 상태에 추가 또는 제거해준다
  const handleClickCheck = () => {
    // 즐겨찾기가 아닐 때 - 추가
    if (!data.favorite) {
      const newData = { ...data, favorite: true }
      setFavorite([...favorite, newData])
      // 로컬 스토리지에 추가
      local.setLocalStorage([...favorite, newData])
    } else {
      // 즐겨찾기일 때 - 삭제
      const prev = [...favorite].filter((fav) => fav.imdbID !== data.imdbID)
      setFavorite(prev)
      // 로컬 스토리지에서 삭제한 뒤 업데이트
      local.setLocalStorage(prev)
    }

    setIsModalOpen((prev: boolean) => !prev)
  }

  return (
    <div className={styles.container}>
      <section ref={modalRef} className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.text}>{renderText()}</div>
          <div className={styles.buttonWrapper}>
            <button onClick={handleClickCheck} className={styles.button} type='button'>
              {data.favorite ? '삭제' : '추가'}
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
