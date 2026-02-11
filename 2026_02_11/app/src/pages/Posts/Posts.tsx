import {useState, useEffect} from 'react'
import styles from './Posts.module.scss'
import type PostType from '../../types/Post/Post.ts'
import {Link} from "react-router";

export default function Posts()
{
    const [posts, setPosts] = useState<Array<PostType>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        (()=>{
            setIsLoading(true)
        })()
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then((json:Array<PostType>) => {
            setPosts(json)
        })
        .catch(()=>{
            setIsError(true)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [])

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
                {!isLoading && !isError && (
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