import {useParams} from "react-router"

export default function UserById()
{
    let users = ["user1", "user2", "user3"]
    let id:number = parseInt(useParams().id as string)

    return (
        <div>{users[id]}</div>
    )
}