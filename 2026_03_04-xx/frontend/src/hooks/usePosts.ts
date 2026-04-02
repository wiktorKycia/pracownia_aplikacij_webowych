import type Post from '../types/Post/Post.ts'
import {useQuery} from "@tanstack/react-query";

// const HOST = import.meta.env.VITE_BACKEND_HOST
// const PORT = import.meta.env.VITE_BACKEND_PORT

// const url = `${HOST}:${PORT}/api/v1/posts`

const getPosts = async (): Promise<Array<Post>> => {
    const response = await fetch('/api/v1/posts', {
        method: 'GET'
    })

    if (!response.ok)
    {
        throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
    // return await fetch(url).then(r => r.json())
}

export const usePosts = () => {
    return useQuery<Array<Post>>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
}