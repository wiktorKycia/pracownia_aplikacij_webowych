import type CommentType from "../../types/Comment/Comment.ts";
import styles from "./Comment.module.scss"

export default function Comment(comment: CommentType)
{
    return (
        <div className={styles.Comment}>
            {/*<h6 className={styles.CommentUsername}>{comment.name}</h6>*/}
            <p className={styles.CommentContent}>{comment.content}</p>
        </div>
    )
}