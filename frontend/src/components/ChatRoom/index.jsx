import React from 'react';
import { Typography, Button, TextField, Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import "./style.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InputFileUpload from '../InputFileUpload';
import axios from 'axios'

const getAvatarBackgroundColor = (isUser, isSys) => {
    let color;
    if(isSys && !isUser) {
        color = 'grey'
    } else if (isSys) {
        color = 'limegreen'
    } else if (isUser && !isSys) {
        color = 'green'
    } else {
        color = 'blue'
    }
    return color
}

const Message = ({ messageObject, socket }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [socket, messageObject]);

    const isUser = messageObject.userName === (socket.id).slice(1, 6)
    const isSys = messageObject.isSystemMessage

    const user = isUser
        ? <em>You</em>
        : messageObject.userName


    return (
        <ListItem ref={ref} sx={{ position: 'relative' }}>
            <ListItemAvatar>
                <Avatar sx={{
                    backgroundColor: getAvatarBackgroundColor(isUser, isSys)
                }}>
                    <i className={isSys ? "fa-solid fa-hashtag" : "fa-solid fa-user"}></i>
                </Avatar>
            </ListItemAvatar>
            {!isSys
                ? <ListItemText primary={<React.Fragment><strong>{user}</strong>: {messageObject.content}</React.Fragment>} secondary={messageObject.timestamp}  />
                : <em>{messageObject.content}</em>
            }
        </ListItem>
    )
};

export default function ChatRoom({ socket, receivedMessages, message, setMessage }) {
    const { roomID } = useParams();
    const [selectedFile, setSelectedFile] = React.useState(null)

    const [open, setOpen] = React.useState(false)
    // console.log(roomID)
    // console.log(socket)

    const handleSendMessage = () => {
        // Emit 'chat message' event with the current message
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile)
            axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(data => console.log("API POST UPLOAD: ", data))
                .catch(err => console.error("API POST ERROR: ", err.message))
        } else {
            socket.emit('chat message', message);
        }
        setMessage('')
        setSelectedFile(null)
    };
    const handleToggle = () => {
        setOpen(!open)
    }

    const handleFileSelect = (file) => {
        setSelectedFile(file)
    }
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Received Messages:</Typography>
            <Paper xs={12} elevation={3} sx={{ display: 'grid' }}>
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
                    encType="multipart/form-data"
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
                        width: '70%'
                    }}
                />
                <Button sx={{ flexGrow: 1 }} variant='contained' color="secondary" onClick={handleSendMessage}>Send Message</Button>
                <Button onClick={handleToggle}>Files</Button>

                </Box>
                {open
                    ? <div>
                        <form encType="multipart/form-data" method="POST">
                            <InputFileUpload sx={{ flexGrow: 1}} fileLabel={selectedFile} onFileSelect={handleFileSelect}/>
                        </form>
                    </div>
                    : ''}
            </Paper>
        </>
    )
}