import { atom } from 'recoil'

export const queryData = atom<string>({
  key: 'queryData',
  default: '',
})
