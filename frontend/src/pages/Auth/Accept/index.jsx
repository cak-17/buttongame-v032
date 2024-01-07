import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAcceptInvite, selectInvite } from "../../../store/auth/inviteSlice";


export default function Accept() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(selectInvite)

    React.useEffect(() => {
        dispatch(fetchAcceptInvite(uid, token))
    }, [])

    const loadingMsg = state.loading ? <p>We are veryfing your token... it will only take a second!</p> : null
    const errorMsg = state.error ? <div style={{ color: 'red'}}>{state.error}</div> : null

    const getTokenColor = () => {
        if (!state.isValid && !state.error) return '#0f0f0f'
        if (state.isValid) return 'green'
        return 'red'
    }
    return (
        <section style={{
            display: 'grid',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <h3>Thank you for accepting our invitation</h3>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    margin: '2rem',
                    padding: '.5rem',
                    color: getTokenColor(),
                    borderRadius: '.4rem',
                    backgroundColor: '#CfBf9f',
                }}>{uid}/{token}</div>
                {loadingMsg}

                {state.isValid && !state.error ? (
                    <div>
                        <p>Your token was verified. Please continue to register your account</p>
                        <button onClick={() => navigate("/auth/register")}>Register</button>
                    </div>
                ) : null }
                {errorMsg}
            </div>
        </section>
    )
}