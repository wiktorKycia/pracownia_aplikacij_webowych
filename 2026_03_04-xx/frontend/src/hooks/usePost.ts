import type PostType from "../types/Post/Post.ts";
import type Comment from "../types/Comment/Comment.ts"
import type UserType from "../types/User/User.ts"
import {useQuery} from "@tanstack/react-query";

const HOST = import.meta.env.BACKEND_HOST
const PORT = import.meta.env.BACKEND_PORT

const getPost = async (postId: number) => {
    const post: PostType = await fetch(`${HOST}:${PORT}/api/v1/posts/${postId}`).then(r => r.json())
    const comments: Array<Comment> = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then(r => r.json())
    const creator: UserType = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(r => r.json())

    return {post, comments, creator}
}

export const usePost = (postId: number) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPost(postId)
    })
}