import {useLoaderData} from "react-router-dom";

export function useData<T extends object>() {
    const data = useLoaderData() as T | { error: boolean };

    if ('error' in data && data.error) {
        return {error: true};
    }
    return {data: data as T, error: false};
}
