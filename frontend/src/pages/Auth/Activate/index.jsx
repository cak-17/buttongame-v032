import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthAPI from "../../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectInvite, fetchActivation } from "../../../store/auth/inviteSlice";


export default function ActivateAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {uid, token} = useParams();
    const state = useSelector(selectInvite)

    let counter = 5
    const [count, setCounter] = React.useState(counter)
    
    function startCountdown() {
        const interval = setInterval(() => {
            counter--;
            setCounter(counter)
            if (counter < 0) {
                clearInterval(interval);
                navigate('/')
            }
        }, 1000);
    }

    React.useEffect(() => {
        dispatch(fetchActivation(uid, token))
    }, [])

    React.useEffect(() => {
        if (state.isActivated)
            startCountdown()
    }, [state.isActivated])

    const renderedSuccessActivation = state.isActivated 
        ? <React.Fragment>
                <h2>Congrats!</h2>
                <p>Your account has been activated.</p>
                <p>You will be redirected to the login page in {count}</p>
                <p>If the redirect doesn&apos;t work <a href="/">Click here.</a></p>
            </React.Fragment>
        : state.error 
            ? <p>{state.error}</p>
            : null

    return (
        <div>
            {!state.loading 
                ? renderedSuccessActivation
                : <p>We are veryting your tokens, please wait a second.</p>
            }
        </div>
    )
}