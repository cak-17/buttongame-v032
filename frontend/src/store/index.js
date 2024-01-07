import { configureStore } from "@reduxjs/toolkit";
import userReducer from './auth/userSlice';
import inviteReducer from "./auth/inviteSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        invite: inviteReducer,
    }
})