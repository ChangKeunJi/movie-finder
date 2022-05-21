export interface IMovieData {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  favorite?: boolean
}

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