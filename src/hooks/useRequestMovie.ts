import { useEffect, useState } from 'react'
import { IMovieData } from 'types'
import { instance } from 'api/axios'

export default function useReqestMovie(query: string, page: number = 1) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [list, setList] = useState<IMovieData[]>([])
  const [, setCount] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setList([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    instance.get(`${query}&page=${page}`).then((res) => {
      if (res.data.Search) {
        setList((prev) => {
          return [...prev, ...res.data.Search]
        })
        setCount((prevCount) => {
          setHasMore(prevCount + res.data.Search.length < res.data.totalResults)
          return prevCount + res.data.Search.length
        })
      }

      setLoading(false)
    })
  }, [query, page])
  return { loading, error, list, setLoading, setList, hasMore }
}
