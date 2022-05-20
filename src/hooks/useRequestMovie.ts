import { useEffect, useMemo, useState } from 'react'
import { instance } from 'api/axios'
import _ from 'lodash'

export default function useReqestMovie(query: string, page: number = 1) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [list, setList] = useState([])
  // const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setList([])
  }, [query])

  const debounceCall = useMemo(
    () =>
      _.debounce((_query: string, _page: number) => {
        instance.get(`${_query}&page=${_page}`).then((res) => {
          setList(res.data.Search)
          setLoading(false)
        })
      }, 500),
    []
  )

  useEffect(() => {
    setLoading(true)
    setError(false)
    debounceCall(query, page)
  }, [query, page, debounceCall])

  return { loading, error, list }
}
