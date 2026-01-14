import Navbar from '../Navbar/Navbar.tsx'
import {useState} from 'react'
import Post from '../Post/Post.tsx'
import styles from './Posts.module.scss'

export default function Posts()
{
    const [posts, setPosts] = useState(1);

    return (
        <>
            <Navbar/>
            <h1 className={styles.Heading}>Blog</h1>
            <div className={styles.Container}>
                {Array.from({ length: posts }, (_, i) => (
                    <Post key={i} />
                ))}
                <button className={styles.Button} onClick={() => setPosts(posts => posts+1)}>Dodaj posta</button>
            </div>
        </>
    )
}