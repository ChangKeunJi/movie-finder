import { atom } from 'recoil'

export const favoriteData = atom<string[]>({
  key: 'favoriteData',
  default: [],
})
