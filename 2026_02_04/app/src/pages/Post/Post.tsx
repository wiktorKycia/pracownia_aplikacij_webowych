import {Link, useParams} from "react-router"
import styles from './Post.module.scss'
import {useState, useEffect} from "react";
import type PostType from "../../types/Post/Post.ts";

export default function Post() {
    const id:number = parseInt(useParams().id as string)
    console.log(id)
    const [post, setPost] = useState<PostType>()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        (()=>{
            setIsLoading(true)
        })()
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then((json:PostType) => {
                setPost(json)
                console.log(id)
                console.log(json)
                console.log(post)
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
            {isLoading && (
                <div className={styles.PostLoading}>Trwa ładowanie wpisu</div>
            )}
            {isError && (
                <div className={styles.PostError}>Wystąpił błąd podczas ładowania wpisu</div>
            )}
            {!isLoading && !isError &&(
                <>
                    {(post == null) && (
                        <div className={styles.PostError}>Brak wpisów</div>
                    )}
                    {post !== undefined  && post!== null && (
                        <div className={styles.PostsPost} key={post.id}>
                            <h5 className={styles.PostsPostTitle}>{post.title}</h5>
                            <p className={styles.PostsPostBody}>{post.body}</p>
                            <Link to={"/posts/"} className={styles.PostLink}>Wróć do wpisów</Link>
                        </div>
                    )}
                </>

            )}
        </>
    )
}