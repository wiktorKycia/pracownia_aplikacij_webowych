import {Link, useParams} from "react-router"
import styles from './Post.module.scss'
import {usePost} from '../../hooks/usePost.ts'
import Comment from "../../components/Comment/Comment.tsx";
import type CommentType from "../../types/Comment/Comment.ts";

export function Post() {
    const id: number = parseInt(useParams().id as string)
    console.log(id)

    const {data, isLoading, isError} = usePost(id);

    return (
        <>
            {isLoading && (
                <div className={styles.PostLoading}>Trwa ładowanie wpisu</div>
            )}
            {isError && (
                <div className={styles.PostError}>Wystąpił błąd podczas ładowania wpisu</div>
            )}
            {!isLoading && !isError && data && (
                <>
                    {(data.post == null) && (
                        <div className={styles.PostError}>Brak wpisów</div>
                    )}
                    {data.post !== undefined && data.post !== null && (
                        <div className={styles.Post} key={data.post.id}>
                            <h1 className={styles.PostTitle}>{data.post.title}</h1>
                            <p className={styles.PostBody}>{data.post.body}</p>
                            <Link to={"/posts/"} className={styles.PostLink}>Wróć do wpisów</Link>
                            {data.comments && (
                                data.comments.map((c: CommentType) => <Comment key={c.id} {...c}/>)
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}