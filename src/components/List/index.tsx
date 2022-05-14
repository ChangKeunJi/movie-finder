import cx from 'classnames'

import styles from './List.module.scss'
import { IMovieData } from '../../types/index.d'
import { Star } from '../../assets/icon/index'

interface Props {
  data: IMovieData
  onClick: Function
}

const List = ({ data, onClick }: Props) => {
  return (
    <div aria-hidden='true' onClick={() => onClick(data)} className={styles.container}>
      <img className={styles.poster} src={data.Poster} alt='poster' />
      <section className={styles.info}>
        <span className={styles.dataWrapper}>
          <p className={styles.title}>{data.Title}</p>
          <p className={styles.year}>{data.Year}</p>
          <p className={styles.type}>{data.Type}</p>
        </span>
        <span className={styles.favorite}>
          <Star className={cx(styles.icon, { [styles.isActive]: data.favorite })} />
        </span>
      </section>
    </div>
  )
}

export default List
