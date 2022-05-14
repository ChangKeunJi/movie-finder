import { useEffect, useState, useCallback } from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import _ from 'lodash'

import styles from './SearchPage.module.scss'
import { IMovieData } from 'types'
import { requestApi, favoriteData, pageData } from 'state'
import { initial } from '../../constant/index'

import Loading from 'components/Loading'
import Layout from 'components/Layout'
import Input from 'components/Input'
import List from 'components/List'
import Modal from 'components/Modal'

const SearchPage = () => {
  const [list, setList] = useState<IMovieData[]>([])
  const [clicked, setClicked] = useState<IMovieData>(initial)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const res = useRecoilValueLoadable(requestApi)
  const favoriteList = useRecoilValue(favoriteData)
  const [page, setPage] = useRecoilState(pageData)

  // 즐겨찾기 목록과 api response를 받아온 뒤 List에 favorite 속성을 추가
  useEffect(() => {
    if (res.contents.Response !== 'True') return

    const copied = res.contents.Search.slice() // api response
    const copiedFav = favoriteList.slice() // 즐겨찾기 목록

    // response 중 즐겨찾기 목록과 동일한 Movie가 있다면 'favorite:true' 속성 추가
    const newList = copied.map((movie: IMovieData) => {
      const bool = copiedFav.find((fav) => fav.imdbID === movie.imdbID)
      return {
        ...movie,
        favorite: bool,
      }
    })

    setList((prev) => [...prev, ...newList])
  }, [res, favoriteList, page])

  // 클릭하면 해당 Item을 Modal 컴포넌트에 전달해주고 Modal을 렌더링
  const handleClickList = useCallback(
    (item: IMovieData): void => {
      // 클릭된 Item 상태에 업데이트
      setClicked(item)
      // 모달 open
      setIsModalOpen(!isModalOpen)
    },
    [isModalOpen]
  )

  const getMoreItem = useCallback(async () => {
    setIsLoaded(true)
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 400))
    setPage(page + 1)
    setIsLoaded(false)
  }, [page, setPage])

  const onIntersect = useCallback(
    async ([entry]: any, observer: any) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target)
        await getMoreItem()
        observer.observe(entry.target)
      }
    },
    [isLoaded, getMoreItem]
  )

  useEffect(() => {
    let observer: any
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target, onIntersect])

  return (
    <Layout>
      <Input setList={setList} />
      <ul className={styles.ul}>
        {list.length > 0 && list.map((item: any) => <List onClick={handleClickList} key={item.imdbID} data={item} />)}
        {list.length === 0 && <p className={styles.message}>검색결과가 없습니다 ‼️</p>}
        <div ref={setTarget} className={styles.target}>
          {isLoaded && <Loading />}
        </div>
        {isModalOpen && <Modal data={clicked} setIsModalOpen={setIsModalOpen} />}
      </ul>
    </Layout>
  )
}

export default SearchPage

// 무한 스크롤 참조
// https://velog.io/@jce1407/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-Intersection-Observer
