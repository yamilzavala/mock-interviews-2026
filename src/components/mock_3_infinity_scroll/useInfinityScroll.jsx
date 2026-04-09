import {useRef} from 'react'

const useInfinityScroll = (callback, isLoading, hasMore) => {
  const observerRef = useRef(null);

  const lastElementRef = (node) => {
    if(isLoading) return;

    if(observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && hasMore) {
            callback()
        }
    })

    if(node) observerRef.current.observe(node)
  }

  return lastElementRef
}

export default useInfinityScroll