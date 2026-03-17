import type Post from '../types/Post/Post.ts'
import {useQuery} from "@tanstack/react-query";

const getPosts = async () => {
    return await fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json())
}

export const usePosts = () => {
    return useQuery<Array<Post>>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
}