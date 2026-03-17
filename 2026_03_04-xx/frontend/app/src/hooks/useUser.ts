import {useQuery} from "@tanstack/react-query";
import type UserType from "../types/User";

const getUser = async (userId: number) => {
    const user: UserType = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(r => r.json())

    return {user}
}

export const useUser = (userId: number) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId)
    })
}