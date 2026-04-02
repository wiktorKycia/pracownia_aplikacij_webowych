import type PostType from '../Post/Post.ts'

export default interface CategoryType {
    id: number,
    name: string,
    posts: PostType[]
}