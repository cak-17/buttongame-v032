import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectInvite, fetchInvite } from "../../store/auth/inviteSlice"


function InviteBox({callback}) {
    const [email, setEmail] = React.useState('')
    const dispatch = useDispatch();
    const error = useSelector(selectInvite).error

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchInvite(email))
        callback(false)
    }

    return (
        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="userEmail">
                User Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Invite</button>
            {error && <p style={{ color: 'red'}}>{error}</p>}
        </form>
    )
}

export default function Invite() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <button onClick={() => setOpen(!open)}>Invite</button>
            {open && <InviteBox callback={setOpen}/>}
        </div>
    )
} 

