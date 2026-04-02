import type Post from '../types/Post/Post.ts'
import {useQuery} from "@tanstack/react-query";

const getPosts = async (): Promise<Array<Post>> => {
    const response = await fetch('/api/v1/posts', {
        method: 'GET'
    })

    if (!response.ok)
    {
        throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
}

export const usePosts = () => {
    return useQuery<Array<Post>>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
}