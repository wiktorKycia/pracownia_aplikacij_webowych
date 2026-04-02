import type PostType from '../Post/Post.ts'

export default interface CommentType {
    id: number,
    content: string,
    post: PostType,
    postId: number
}