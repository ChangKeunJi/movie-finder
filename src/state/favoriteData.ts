import { atom } from 'recoil'
import { IMovieData } from 'types'

export const favoriteData = atom<IMovieData[]>({
  key: 'favoriteData',
  default: [],
})
