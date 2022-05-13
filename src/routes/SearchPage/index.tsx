import styles from './SearchPage.module.scss'
import { useRecoilValueLoadable } from 'recoil'

import { requestData } from 'state'
import Layout from 'components/Layout'
import Input from 'components/Input'
import List from 'components/List'

const data = {
  Title: 'Iron Man: Armored Adventures',
  Year: '2008-2012',
  imdbID: 'tt0837143',
  Type: 'series',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
}

const SearchPage = () => {
  const res = useRecoilValueLoadable(requestData)
  console.log('res', res)

  return (
    <Layout>
      <Input />
      <main className={styles.main}>
        {res.contents.Search && res.contents.Search.map((item: any) => <List key={item.imdbID} data={item} />)}

        {!res.contents.Search && (
          <div className={styles.message}>
            <p>검색결과가 없습니다 ‼️</p>
          </div>
        )}
      </main>
    </Layout>
  )
}

export default SearchPage
