import { Container, Typography, Button, TextField, Box, Paper, Divider } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import "./style.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Message = ({ messageObject, socket }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, []);

    const user = messageObject.username === (socket.id).slice(1, 6)
        ? <em>You</em>
        : messageObject.username

    return (
        <ListItem ref={ref} sx={{ position: 'relative'}}>
            <ListItemAvatar>
                <Avatar>
                    <i class={messageObject.isSystemMessage ? "fa-solid fa-hashtag" : "fa-solid fa-user"}></i>
                </Avatar>
            </ListItemAvatar>
            {!messageObject.isSystemMessage
                ? <ListItemText primary={<><strong>{user}</strong>: {messageObject.msg}</>} secondary={messageObject.timestamp} sx={{
                    float: messageObject.isSystemMessage ? 'right': 'left',
                    position: 'relative'
                }}/>
                : <em>{messageObject.msg}</em>
            }
        </ListItem>

    )
};

export default function ChatRoom({ socket, receivedMessages, message, setMessage }) {
    const { roomID } = useParams();
    console.log(roomID)
    console.log(socket)



    const handleSendMessage = () => {
        // Emit 'chat message' event with the current message
        socket.emit('chat message', message);
        setMessage('')
    };
    
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Received Messages:</Typography>
            <Paper xs={12} elevation={3} sx={{ display: 'grid'}}>
                <List sx={{
                    height: '40vh',
                    overflowBlock: 'scroll'
                    }}
                >
                        {receivedMessages && receivedMessages.map((messageObject, index) =>
                            <Message key={index} messageObject={messageObject} socket={socket} />
                        )}
                </List>
                <Box       
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 1,
                    }}
                >
                    <TextField
                        id="messageIput"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        label="Type your message here"
                        color='secondary'
                        variant="filled"
                        sx={{
                            width:'80%'
                        }}
                    />
                    <Button  sx={{ flexGrow: 2}} variant='contained' color="secondary" onClick={handleSendMessage}>Send Message</Button>
                </Box>
            </Paper>
        </>
    )
}