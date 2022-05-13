import { useState } from 'react'
import { useMount } from 'react-use'

export { useClickAway, useInterval, usePrevious, useMount, useUnmount } from 'react-use'

export { useState, useEffect, useLayoutEffect, useCallback, useContext, useMemo, useReducer, useRef } from 'react'

// useEffect(() => {},[])와 동일
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))
  return mounted
}
