import { createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../../api/auth";

export const inviteSlice = createSlice({
    name: "invite",
    initialState: {
        loading: false,
        isValid: false,
        isActivated: false,
        isRegistered: false,
        error: '',
        acceptedEmail: '',
    },
    reducers: {
        handleRequest: state => {
            state.loading = true
        },
        handleError: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        handleInviteSuccess: state => {
            state.loading = false
        },
        handleAcceptSuccess: (state, action) => {
            state.loading = false,
            state.isValid = true,
            state.acceptedEmail = action.payload
        },
        handleRegistrationSuccess: state => {
            state.loading = false
            state.isRegistered = true
        },
        handleActivationSuccess: (state) => {
            state.loading = false
            state.isActivated = true
        }
    } 
})

export const {
    handleRequest,
    handleError,
    handleInviteSuccess,
    handleAcceptSuccess,
    handleActivationSuccess,
    handleRegistrationSuccess
} = inviteSlice.actions

export const selectInvite = state => state.invite

export const fetchInvite = (email) => {
    return (dispatch) => {
        dispatch(handleRequest())
        AuthAPI.invite(email)
            .then(() => {
                dispatch(handleInviteSuccess())
            })
            .catch(err => {
                dispatch(handleError(err.message))
                console.log(err)
            })
    }
}

export const fetchAcceptInvite = (uid, token) => {
    return (dispatch => {
        dispatch(handleRequest())
        AuthAPI.accept(uid, token)
            .then(data => {
                dispatch(handleAcceptSuccess(data.email))
            })
            .catch(err => {
                dispatch(handleError(err.message))
                console.log(err)
            })
    })
} 

export const fetchRegister = (credentials) => {
    return async (dispatch) => {
        dispatch(handleRequest())
        await AuthAPI.register(credentials)
            .then(data => {
                dispatch(handleRegistrationSuccess())
            })
            .catch(err => {
                dispatch(handleError(err.message))
                console.log(err)
            })
    }
}

export const fetchActivation = (uid, token) => {
    return (dispatch) => {
        dispatch(handleRequest())
        AuthAPI.activate(uid, token)
            .then(() => {
                dispatch(handleActivationSuccess())
            })
            .catch(err => {
                dispatch(handleError(err.message))
                console.log(err)
            })
    }
}


export default inviteSlice.reducer