import styles from './List.module.scss'

interface IData {
  data: {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }
}

// const data = {
//   Title: 'Iron Man: Armored Adventures',
//   Year: '2008-2012',
//   imdbID: 'tt0837143',
//   Type: 'series',
//   Poster:
//     'https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
// }

const List = ({ data }: IData) => {
  return (
    <article className={styles.container}>
      <img className={styles.poster} src={data.Poster} alt='poster' />
      <section className={styles.textData}>
        <p className={styles.title}>{data.Title}</p>
        <p className={styles.year}>{data.Year}</p>
        <p className={styles.type}>{data.Type}</p>
      </section>
    </article>
  )
}

export default List
