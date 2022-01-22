// fix the redux store..
import { configureStore } from "@reduxjs/toolkit";
// import all reducers...
import userReducer from "../features/userSlice";



export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

