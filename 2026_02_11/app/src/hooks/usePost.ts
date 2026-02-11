import type PostType from "../types/Post/Post.ts";
import type Comment from "../types/Comment/Comment.ts"
import {useQuery} from "@tanstack/react-query";

const getPost = async (postId: number) => {
    const post: PostType = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(r => r.json())
    const comments: Array<Comment> = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then(r => r.json())

    return {post, comments}
}

export const usePost = (postId: number) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPost(postId)
    })
}