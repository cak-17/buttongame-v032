import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/userSlice';
import Invite from "../Invite";

export default function Dashboard() {

    const user = useSelector((state) => state.user.data)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout((navigate)))
    }
    return (
        <div>
            <h2>Welcome to the dashboard {`${user}`}</h2>
            <p>pssst... this is a secret page!</p>
            <button onClick={() => handleLogout()}>Logout</button>
            <Invite />
        </div>
    )
}