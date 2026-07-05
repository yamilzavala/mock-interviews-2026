import React, { useState, useRef } from 'react'

const LikeButton = () => {
  // states
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)

  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)

  // refs
  const requestIdRef = useRef(0)
  const prevStateRef = useRef({})

  const handleClick = async () => {
    // evitar spam click
    if (pending) return

    setPending(true)

    // request id incremental
    const requestId = ++requestIdRef.current

    // guardar snapshot previo
    prevStateRef.current[requestId] = {
      liked,
      count
    }

    // siguiente estado
    const nextLiked = !liked

    // optimistic update
    setLiked(nextLiked)
    setCount(prev => prev + (nextLiked ? 1 : -1))
    setError(null)

    try {

      const response = await fetch(
        `http://localhost:3000/api/likes/posts/1/like`,
        {
          method: nextLiked ? 'PUT' : 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const data = await response.json()

      // ignorar responses viejas
      if (requestId !== requestIdRef.current) {
        return
      }

      // sincronizar con backend
      setLiked(data.liked)
      setCount(data.likesCount)

    } catch (error) {

      // ignorar errores viejos
      if (requestId !== requestIdRef.current) {
        return
      }

      // rollback
      const prev = prevStateRef.current[requestId]

      setLiked(prev.liked)
      setCount(prev.count)

      setError(error.message)

    } finally {

      // limpiar snapshot
      delete prevStateRef.current[requestId]

      // liberar pending
      if (requestId === requestIdRef.current) {
        setPending(false)
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={pending}
      >
        {
          pending
            ? 'Saving...'
            : liked
              ? 'Unlike ❤️'
              : 'Like 🤍'
        }
      </button>

      <p>{count} likes</p>

      {error && (
        <p>Error: {error}</p>
      )}
    </div>
  )
}

export default LikeButton