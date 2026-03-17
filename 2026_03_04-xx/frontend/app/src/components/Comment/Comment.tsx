import type CommentType from "../../types/Comment/Comment.ts";
import styles from "./Comment.module.scss"
// import {useParams} from "react-router";

export default function Comment(comment: CommentType)
{
    // const comment: Comment = useParams().comment;
    // console.log(comment.name, comment.body)
    return (
        <div className={styles.Comment}>
            <h6 className={styles.CommentUsername}>{comment.name}</h6>
            <p className={styles.CommentContent}>{comment.body}</p>
        </div>
    )
}