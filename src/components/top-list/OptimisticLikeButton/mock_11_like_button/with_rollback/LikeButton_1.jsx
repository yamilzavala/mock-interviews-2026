import { useState, useRef, useCallback } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(10);
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0);
  const prevStateMapRef = useRef({});

  const fakeApi = (shouldFail = false) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) reject("Error");
        else resolve("OK");
      }, Math.random() * 1000);
    });

  const handleClick = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    
    // 📌 guardar estado previo asociado al request
    prevStateMapRef.current[requestId] = { liked, count };
    
    console.log('requestIdRef.current: ', requestIdRef.current)
    console.log('prevStateMapRef: ', prevStateMapRef.current[requestId])
    
    // 📌 optimistic update
    const nextLiked = !liked;
    const nextCount = liked ? count - 1 : count + 1;

    setLiked(nextLiked);
    setCount(nextCount);
    setError(null);

    try {
      await fakeApi(Math.random() < 0.3);

      // 🔥 ignorar si no es el último request
      if (requestId !== requestIdRef.current) return;

      // success → no hacer nada (UI ya está correcta)
    } catch (err) {
      // 🔥 ignorar errores viejos
      if (requestId !== requestIdRef.current) return;

      // rollback correcto
      const prev = prevStateMapRef.current[requestId];
      setLiked(prev.liked);
      setCount(prev.count);
      setError("Something went wrong");
    } finally {
      delete prevStateMapRef.current[requestId];
    }
  }, [liked, count]);

  return (
    <div>
      <button onClick={handleClick}>
        {liked ? "💙 Unlike" : "🤍 Like"}
      </button>
      <p>{count} likes</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}