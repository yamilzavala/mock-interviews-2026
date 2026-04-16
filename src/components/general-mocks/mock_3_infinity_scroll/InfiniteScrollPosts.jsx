import { useState, useEffect, useCallback } from 'react'
import useInfinityScroll from './useInfinityScroll'

const baseURL = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_page='

const InfiniteScrollPosts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const fetchPost = useCallback(async () => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true)
            setError(null)

            const resp = await fetch(`${baseURL}${page}`)
            if (!resp.ok) throw new Error('Error fetching data')

            const data = await resp.json()
            setPosts((prev) => [...prev, ...data])

            if (data.length === 0) {
                setHasMore(false)
            } else {
                setPage((prev) => prev + 1)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [page, hasMore, isLoading])

    useEffect(() => {
        fetchPost()
    }, [])

    const lastElementRef = useInfinityScroll(fetchPost, isLoading, hasMore)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Posts</h1>

            {posts?.map((post, idx) => {
                if (idx === posts.length - 1) {
                    return (
                        <div ref={lastElementRef} key={post.id}>
                            <h3>{post.title}</h3>
                            <h3>{post.body}</h3>
                        </div>
                    )
                }

                return (
                    <div key={idx}>
                        <h3>{post?.id}</h3>
                        <h3>{post?.title}</h3>
                        <h3>{post?.body}</h3>
                    </div>
                )
            })}



            {!hasMore && <p>No more posts</p>}
        </div>
    )
}

export default InfiniteScrollPosts