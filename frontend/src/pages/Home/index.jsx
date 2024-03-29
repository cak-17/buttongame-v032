import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

export default function Home({socket}) {

    const [id, setID] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(id)
    }
    return (
        <Container>
            <Typography variant="h3">HOME</Typography>
            <form onSubmit={handleSubmit}>
                <input type="test" value={id} onChange={(e) => setID(e.target.value)} />
                <Button variant="outlined" type="submit">Enter</Button>
            </form>
        </Container>
    )
}