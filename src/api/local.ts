import { IMovieData } from 'types'

export const local = {
  setLocalStorage(favorite: IMovieData[]) {
    const data = JSON.stringify(favorite)
    localStorage.setItem('favorite', data)
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('favorite') || '[]')
  },
}
