import React, {useState, useRef, useCallback} from 'react'

const LikeButton = () => {
  // states
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(10);
  const [error, setError] = useState(null);
  
  // refs
  const requestIdRef = useRef(0)
  const prevStateRef = useRef({})

  // fakeApi
  const fakeApi = async (sholuldFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(sholuldFail) {
                reject(new Error('Something went wrong'))
            } else {
                resolve('OK')
            }
        }, Math.random() * 1000)
    })
  }

  // handleClick 
 const handleClick = async () => {
    // request id
    const requestId = ++requestIdRef.current;

    // guardo  estado previo al request
    prevStateRef.current[requestId] = {liked, count}

    //optimistic update
    const nextCount = liked ? count + 1 : count - 1;

    setCount(nextCount)
    setLiked((prev) => !prev)
    setError(null)

    try {
        await fakeApi(Math.random() < 0.3)
        // ignoramos si no es el ultimo request
        if(requestId !== requestIdRef.current) return;
    } catch (error) {
        // ignorar errores viejos
        if(requestId !== requestIdRef.current) return;

        // roll back
        const prev = prevStateRef.current[requestId];
        setCount(prev.count)
        setLiked(prev.liked)
        setError(error.message)
    } finally {
        // delete prevState
        delete prevStateRef.current[requestId]
    }
 }

  return (
    <div>
        <button onClick={() => handleClick()}>
            {liked ? 'Unlike ❤️' : 'Like 🤍'}
        </button>
        {error && <p>Error: {error}</p>}
    </div>
  )
}

export default LikeButton