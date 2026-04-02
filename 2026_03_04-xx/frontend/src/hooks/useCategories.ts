import {useQuery} from "@tanstack/react-query";
import type Category from "../types/Category/CategoryType.ts";

const getCategories = async (): Promise<Array<Category>> => {
    const response = await fetch('/api/v1/categories', {
        method: 'GET'
    })

    if(!response.ok)
    {
        throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
}

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })
}