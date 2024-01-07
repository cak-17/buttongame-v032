import React from "react";
import { fetchRegister, selectInvite } from "../../../store/auth/inviteSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
    const dispatch = useDispatch();
    const state = useSelector(selectInvite)

    const [formData, setFormData] = React.useState({
        "password1": "",
        "password2": "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const credentials = {
            email: state.acceptedEmail,
            password1: formData.password1,
            password2: formData.password2
        }

        dispatch(fetchRegister(credentials))
    }
    return (
        <section style={{
            display: 'grid',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: 2,
        }}>
        {!state.isRegistered
            ? <div><p>Please complete the following steps to finalize your registration</p>
            <form onSubmit={(e) => handleSubmit(e)} style={{
                display: 'grid',
                gap: 2,
                justifyContent:'center',
                width: '100%',
            }}>
                <div style={{width:'100%'}}>
                    <label  htmlFor="email">
                        <p>Email:</p>
                        <input style={{ width: '100%'}} name="email" type="email" value={state.acceptedEmail} disabled />
                    </label>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    marginBottom: '1rem',
                    gap: '2rem',
                }}>
                    <label htmlFor="password1">
                        <p>Password</p>
                        <input name="password1" type="password" value={formData.password1} onChange={(e) => handleChange(e)} required />
                    </label>
                    <label htmlFor="password2">
                        <p>Re-Type Password</p>
                        <input name="password2" type="password" value={formData.password2} onChange={(e) => handleChange(e)} required />
                    </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <button type="submit">Register</button>
                </div>
            {state.error ?<p>{state.error}</p> : null}
        </form></div>
        : <div>
            <p>Your registration was successful! Please check your email for an activation link.</p>
        </div>}
    </section>
    )
}