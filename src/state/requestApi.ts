import { queryData, pageData } from 'state'
import { selector } from 'recoil'

import { instance } from 'api/axios'

export interface ISearchItem {
  Title: String
  Year: String
  imdbID: String
  Type: String
  Poster: String
}

export interface IResponseData {
  Search: ISearchItem[]
  totalResults: number
  Response: Boolean
}

// '={검색어}&page={페이지번호(1~100)}'
export const requestApi = selector<IResponseData>({
  key: 'requestApi',
  get: async ({ get }) => {
    const query = get(queryData)
    const page = get(pageData)
    try {
      console.log('query', query)
      if (query.length === 0) return []
      const res = await instance.get(`${query}&page=${page}`)
      return res.data
    } catch (error: unknown) {
      /* eslint no-useless-catch: "off" */
      throw error
    }
  },
})

/*
{
  "Search": [
  {
  "Title": String,
  "Year": String,
  "imdbID": String,
  "Type": String,
  "Poster": String(URL)
  },
  ...
],
"totalResults": Int, // 검색 결과 전체 개수, 현재까지 받아온 개수와 비교하여 다음 페이지 호출
"Response": Bool
}
*/
