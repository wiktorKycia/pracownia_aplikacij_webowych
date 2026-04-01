import type Post from '../types/Post/Post.ts'
import {useQuery} from "@tanstack/react-query";

const HOST = import.meta.env.BACKEND_HOST
const PORT = import.meta.env.BACKEND_PORT

const url = `${HOST}:${PORT}/api/v1/posts`

const getPosts = async () => {
    return await fetch(url).then(r => r.json())
}

export const usePosts = () => {
    return useQuery<Array<Post>>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
}