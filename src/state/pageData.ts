import { atom } from 'recoil'

export const pageData = atom<number>({
  key: 'pageData',
  default: 1,
})
