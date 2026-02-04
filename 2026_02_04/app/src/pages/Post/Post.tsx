import {useParams} from "react-router"
import styles from './Post.module.scss'

export default function Post() {
    const id:number = parseInt(useParams().id as string)
    return (
        <>
            <article className={styles.Post}>
                <h2>Lorem {id}</h2>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque ea eaque eius exercitationem hic, illum inventore magni nam, natus numquam optio praesentium quas, quia recusandae rem soluta sunt vitae.
                </div>
            </article>
        </>
    )
}