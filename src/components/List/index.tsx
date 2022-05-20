import cx from 'classnames'

import styles from './List.module.scss'
import { IMovieData } from '../../types/index.d'
import { StarFilled, Star } from '../../assets/icon/index'
import { SetStateAction, useCallback } from 'react'

interface Props {
  data: IMovieData
  handleClickList: (item: IMovieData, _isFavorite: SetStateAction<boolean>) => void
  isFavorite: SetStateAction<boolean>
  lastElementRef?: (node: any) => void
}

const List = ({ data, handleClickList, lastElementRef, isFavorite }: Props) => {
  const renderIcon = useCallback(() => {
    if (isFavorite) return <StarFilled className={cx(styles.icon, { [styles.isActive]: isFavorite })} />

    return <Star className={styles.icon} />
  }, [isFavorite])

  return (
    <li
      ref={lastElementRef}
      aria-hidden='true'
      onClick={() => handleClickList(data, isFavorite)}
      className={styles.container}
    >
      <img className={styles.poster} src={data.Poster} alt='poster' />
      <section className={styles.info}>
        <span className={styles.dataWrapper}>
          <p className={styles.title}>{data.Title}</p>
          <p className={styles.year}>{data.Year}</p>
          <p className={styles.type}>{data.Type}</p>
        </span>
        <span className={styles.favorite}>{renderIcon()}</span>
      </section>
    </li>
  )
}

export default List
