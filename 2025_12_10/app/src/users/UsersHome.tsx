export default function UsersHome()
{
    let users = ["user1", "user2", "user3"]
    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </>
    )
}
