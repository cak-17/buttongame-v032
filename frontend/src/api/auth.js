import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers :{
        "Content-Type": "application/json",
    },
    // withCredentials: true,
})

class Auth {
    endpoint = "auth"
    axios = axiosInstance

    // setCSRF = async () => {
    //     const response = await this.axios.get(
    //         `${this.endpoint}/set-csrf/`
    //     )
    //     return response.data
    // }

    login = async (credentials) => {
        const response = await this.axios.post(
            `${this.endpoint}/login/`,
            credentials,
            )
        return response.data
    }

    logout = async () => {
        const response = await this.axios.get(
            `${this.endpoint}/logout/`
        )
        return response.data
    }

    invite = async (email) => {
        const response = await this.axios.post(
            `${this.endpoint}/invite/`,
            {email: email}
        )
        return response.data
    }

    register = async (credentials) => {
        const response = await this.axios.post(
            `${this.endpoint}/register/`,
            credentials
        )
        return response.data
    }

    accept = async(uid, token) => {
        const response = await this.axios.post(
            `${this.endpoint}/accept/${uid}/${token}/`
        )
        return response.data
    }

    activate = async(uid, token) => {
        const response = await this.axios.post(
            `${this.endpoint}/activate/${uid}/${token}/`
        )
        return response.data
    }
    test = async () => {
        const response = await this.axios.get(
            `${this.endpoint}/test/`
        )
        return response.data
    }
}

const AuthAPI = new Auth()
export default AuthAPI;