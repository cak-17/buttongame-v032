import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import ChatRoom from '../../components/ChatRoom';

export default function Home({socket}) {
    const [chatModal, setChatModal] = React.useState(false)

    return (
        <Container>
            <Typography variant="h3">HOME</Typography>
        </Container>
    )
}