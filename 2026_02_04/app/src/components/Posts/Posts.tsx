import Navbar from '../Navbar/Navbar.tsx'
import {useState, useEffect} from 'react'
import Post from '../Post/Post.tsx'
import styles from './Posts.module.scss'
import type PostType from '../../types/Post/Post.ts'

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
            <Navbar/>
            <h1 className={styles.Heading}>Blog</h1>
            <div className={styles.Container}>
                
                {/* {Array.from({ length: posts }, (_, i) => (
                    <Post key={i} />
                ))} */}
                {/* <button className={styles.Button} onClick={() => setPosts(posts => posts+1)}>Dodaj posta</button> */}
            </div>
        </>
    )
}