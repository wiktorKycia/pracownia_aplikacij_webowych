import {Link, useParams} from "react-router"
import styles from './Post.module.scss'
import {usePost} from '../../hooks/usePost.ts'
import Comment from "../../components/Comment/Comment.tsx";
import type CommentType from "../../types/Comment/Comment.ts";
import type PostType from "../../types/Post/Post.ts"

export function Post() {
    const id: number = parseInt(useParams().id as string)
    console.log(id)

    const {data, isLoading, isError} = usePost(id);
    const post: PostType | null = data || null;

    return (
        <>
            {isLoading && (
                <div className={styles.PostLoading}>Trwa ładowanie wpisu</div>
            )}
            {isError && (
                <div className={styles.PostError}>Wystąpił błąd podczas ładowania wpisu</div>
            )}
            {!isLoading && !isError && (
                <>
                    {(post == null) && (
                        <div className={styles.PostError}>Brak wpisów</div>
                    )}
                    {post !== undefined && post !== null && (
                        <div className={styles.Post} key={post.id}>
                            <h1 className={styles.PostTitle}>{post.title}</h1>
                            <p className={styles.PostBody}>{post.content}</p>

                            <Link to={"/posts/"} className={styles.PostLink}>Wróć do wpisów</Link>
                            <article className={styles.PostCommentContainer}>
                                {post.comments && (
                                    post.comments.map((c: CommentType) => <Comment key={c.id} {...c}/>)
                                )}
                            </article>
                        </div>
                    )}
                </>
            )}
        </>
    )
}