import { useEffect } from 'react'

const useOutsideClick = (ref: any, action: Function) => {
  useEffect(() => {
    // TODO: Any type 수정하기
    const handleClickOutside = (event: any): void => {
      if (ref.current && !ref.current.contains(event.target)) {
        action()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, action])
}

export default useOutsideClick
