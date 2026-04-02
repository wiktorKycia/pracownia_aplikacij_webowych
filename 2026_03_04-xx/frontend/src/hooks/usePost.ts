import type PostType from "../types/Post/Post.ts";
import type CommentType from "../types/Comment/Comment.ts"
import {useQuery} from "@tanstack/react-query";

const HOST = import.meta.env.VITE_BACKEND_HOST
const PORT = import.meta.env.VITE_BACKEND_PORT

const getPost = async (postId: number) => {
    const post: PostType = await fetch(`${HOST}:${PORT}/api/v1/posts/${postId}`).then(r => r.json())
    // const comments: Array<CommentType> = await fetch(`${HOST}:${PORT}/api/v1/comments`).then(r => r.json())
    const comments: Array<CommentType> = post.comments

    return {post, comments}
}

export const usePost = (postId: number) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPost(postId)
    })
}