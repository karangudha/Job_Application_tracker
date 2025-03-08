import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../feature/user/userSlice";


export const useLoadingWithRefresh = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getUser();
                dispatch(setAuth(data));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
};