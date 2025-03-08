import { createSlice} from "@reducjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
};

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: ( state, action ) => {
            const { auth, user } = action.payload;
            state.isAuth = auth;
            state.user = user;
        },
    },
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;