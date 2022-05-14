import { queryData } from 'state'
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

export const requestData = selector<IResponseData>({
  key: 'requestData',
  get: async ({ get }) => {
    const query = get(queryData)
    try {
      if (query.length > 0) {
        const res = await instance.get(`${query}`)
        return res.data
      }
    } catch (error: unknown) {
      /* eslint no-useless-catch: "off" */
      throw error
    }

    return ''
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
