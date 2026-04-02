import type Post from "../types/Post/Post.ts";
import {useQuery} from "@tanstack/react-query";

const getPost = async (postId: number): Promise<Post> => {
    const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'GET'
    })
    if (!response.ok)
    {
        throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
}

export const usePost = (postId: number) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPost(postId)
    })
}