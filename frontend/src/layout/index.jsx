import { Container, Typography, BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Header = ({socket}) => {    
    return (
        <header style={{
            padding: '1rem 2rem',
            backgroundColor: 'aquamarine',
            display: 'inline-flex',
            gap: '2rem',
            justifyContent: 'space-between'
        }}>
            <Typography component="p" variant="h6">#header</Typography> 
            <Typography component="p" variant="h6">ID: {socket.id ? (socket.id).slice(1,6) : null}</Typography> 
        </header>
    )
}



function NavBar() {
  const [value, setValue] = React.useState("/");
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate(value)
  }, [value])

  return (
      <Paper elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
      <BottomNavigationAction value="/" label="Home" icon={<i className="fa-solid fa-home"></i>} />
        <BottomNavigationAction value="play" label="Play" icon={<i className="fa-solid fa-arrow-right"></i>} disabled/>
        <BottomNavigationAction value="chat" label="Chat" icon={<i className="fa-solid fa-message"></i>} />
        <BottomNavigationAction value="stats" label="Stats" icon={<i className="fa-solid fa-list"></i>} disabled/>
      </BottomNavigation>
      </Paper>
  );
}

export default function Layout({socket}) {
    return (
        <React.Fragment>
           <Header socket={socket}/>
           <Container sx={{

           }}>
            <Outlet/>
           </Container>
           <NavBar/>
        </React.Fragment>
    )
}
