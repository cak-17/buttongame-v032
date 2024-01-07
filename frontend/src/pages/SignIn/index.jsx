
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import { login, selectUser } from "../../store/auth/userSlice";
import './styles.css'

const SignInForm = () => {
    const [ formData, setFormData ] = React.useState({
        "email": "",
        "password": ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData, navigate))
    }

    return (
        <form className="form loginForm" onSubmit={e => handleSubmit(e)}>
                <div className="formField">
                    <label htmlFor="email" className="formInput">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email Address:"
                            pattern=".*@.*\.(it|com)"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange(e)}
                        />
                        <svg width="280px" height="18px" viewBox="0 0 280 18" className="border">
                            <path d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12"></path>
                        </svg>
                        <svg width="14px" height="12px" viewBox="0 0 14 12" className="check">
                            <path d="M1 7 5.5 11 L13 1"></path>
                        </svg>
                    </label>
                </div>
                <div className="formField">
                    <label htmlFor="password" className="formInput">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            pattern=".{6,}"
                            required
                            value={formData.password}
                            onChange={(e) => handleChange(e)}
                        />
                        <svg width="280px" height="18px" viewBox="0 0 280 18" className="border">
                            <path d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12"></path>
                        </svg>
                        <svg width="14px" height="12px" viewBox="0 0 14 12" className="check">
                            <path d="M1 7 5.5 11 L13 1"></path>
                        </svg>
                    </label>
                </div>
                <button className="btn bgSecondary" type="submit">Sign-In</button>
            </form>
        )
    }


export default function SignIn() {
    const auth = useSelector(selectUser)

    return (
        <div className="singlePage">
            <h2 className="pageTitle">Cartin@</h2>
            <SignInForm />
            {auth.error ? <p>{auth.error}</p> : null}
        </div>
    )
}