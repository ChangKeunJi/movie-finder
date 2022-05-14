import { useEffect, useState } from 'react'

import { favoriteData } from 'state'
import styles from './Modal.module.scss'
import { IMovieData } from 'types'
import { useRecoilState } from 'recoil'

interface Props {
  data: IMovieData
  setIsModalOpen: Function
}

const Modal = ({ data, setIsModalOpen }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorite, setFavorite] = useRecoilState(favoriteData)

  useEffect(() => {
    if (data.favorite) setIsFavorite(true)
  }, [data.favorite])

  const renderText = () => {
    if (data.favorite) {
      return <p>즐겨찾기에서 &nbsp; 제거하시겠습니까?</p>
    }
    return <p>즐겨찾기에 &nbsp; 추가하시겠습니까?</p>
  }

  // TODO: 바깥 클릭하면 닫아준다

  // 모달 닫아준다
  const handleClickCancel = () => {
    setIsModalOpen((prev: boolean) => !prev)
  }

  // 즐겨찾기 상태에 추가하거나 제거해준다
  const handleClickCheck = () => {
    if (!isFavorite) {
      setFavorite([...favorite, data.imdbID])
      // TODO: 로컬 스토리지에 추가
    } else {
      const prev = [...favorite].filter((fav) => fav !== data.imdbID)
      setFavorite(prev)
      // TODO: 로컬 스토리지에서 삭제
    }

    setIsModalOpen((prev: boolean) => !prev)
  }

  return (
    <div className={styles.container}>
      <section className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.text}>{renderText()}</div>
          <div className={styles.buttonWrapper}>
            <button onClick={handleClickCheck} className={styles.button} type='button'>
              {isFavorite ? '삭제' : '추가'}
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
