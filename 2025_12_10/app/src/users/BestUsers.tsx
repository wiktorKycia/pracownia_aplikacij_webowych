export default function BestUsers()
{
    let users = ["user1", "user3"]
    return (
        <ul>
            {users.map(user => (
                <li key={user}>{user}</li>
            ))}
        </ul>
    )
}