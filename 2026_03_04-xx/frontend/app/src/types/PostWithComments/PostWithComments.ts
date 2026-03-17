import type Post from "../Post/Post.ts";
import type Comment from "../Comment/Comment.ts"

export default interface PostWithComments {
    post: Post,
    comments: Array<Comment>
}