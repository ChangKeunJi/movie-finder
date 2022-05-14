import { selector } from 'recoil'

import { favoriteData } from './favoriteData'

export const requestFavorite = selector<string[]>({
  key: 'requestFavorite',
  get: ({ get }) => {
    const data = get(favoriteData)

    return data
  },
})
