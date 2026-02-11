import styles from './Posts.module.scss'
import {Link} from "react-router";
import {usePosts} from "../../hooks/usePosts.ts";

export default function Posts()
{
    const {data: posts, isLoading, isError} = usePosts();

    return (
        <>
            <h1 className={styles.Heading}>Blog</h1>
            <div className={styles.Posts}>
                {isLoading && (
                    <div className={styles.PostsLoading}>
                        Trwa ładowanie danych
                    </div>
                )}
                {isError && (
                    <div className={styles.PostsError}>
                        Wystąpił błąd
                    </div>
                )}
                {!isLoading && !isError && posts && (
                    <>
                        {posts.length === 0 && (
                            <div className={styles.PostsError}>
                                Brak wpisów
                            </div>
                        )}
                        {posts.map(p => (
                            <div className={styles.PostsPost} key={p.id}>
                                <h5 className={styles.PostsPostTitle}>{p.title}</h5>
                                <p className={styles.PostsPostBody}>{p.body}</p>
                                <Link to={"/posts/" + p.id} className={styles.PostsPostLink}>Przejdź do wpisu</Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}