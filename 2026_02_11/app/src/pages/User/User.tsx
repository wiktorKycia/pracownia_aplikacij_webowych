import {useParams} from "react-router";

export default function User() {
    const id: number = parseInt(useParams().id as string)

    return (
        <div>Hello world!{id}</div>
    )
}