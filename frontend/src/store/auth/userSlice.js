/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../../api/auth";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: "",
        isAuth: false,
        loading: false,
        error: "",
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuth = true
            state.data = action.payload
            state.loading = false
        },
        loginRequest: state => {
            state.loading = true
        },
        loginFailure: (state, action) => {
            state.isAuth = false
            state.loading = false
            state.error = action.payload
        },
        logoutRequest: state => { state.loading = true },
        logoutSuccess: state => {
            state.isAuth = false
            state.loading = false
            state.data = ""
        },
    },
});

export const {
    loginSuccess,
    loginRequest,
    loginFailure,
    logoutRequest,
    logoutSuccess,
} = userSlice.actions

export const selectUser = state => state.user

export const login = (credentials, redirectTo) => {
    return async (dispatch) => {

        dispatch(loginRequest(credentials))
        await AuthAPI.login(credentials)
            .then(data => {
                dispatch(loginSuccess(data.user))
                redirectTo('/')
            })
            .catch(err =>
                dispatch(loginFailure(err.response.data.message))
            )
    }
}

export const logout = (redirectTo) => {
    return (dispatch) => {
        dispatch(logoutRequest())
        AuthAPI.logout()
            .then(() => {
                redirectTo("/")
                dispatch(logoutSuccess())
            })
    }
}

export default userSlice.reducer