import type CommentType from "../Comment/Comment.ts";
import type CategoryType from "../Category/CategoryType.ts";

export default interface PostType {
    id: number,
    craetedAt: Date,
    updatedAt: Date,
    title: string,
    content: string | null,
    published: boolean,
    comments: CommentType[],
    category: CategoryType,
    categoryId: number
}