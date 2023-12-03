import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
  useNavigate,
  Navigate
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import ChatRoom from './components/ChatRoom';
import { CssBaseline, useMediaQuery } from '@mui/material';
import {SnackbarProvider} from 'notistack'
import FallBack from './pages/FallBack';
import ErrorPage from './pages/ErrorPage';
import Layout from './layout';

const App = ({ socket }) => {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: light)")
  const [mode, setMode] = React.useState(isSystemDarkMode ? 'dark' : 'light');
  const [message, setMessage] = React.useState('')
  const [receivedMessages, setReceivedMessages] = React.useState([])

  React.useEffect(() => {
      // Listen for events from server
      socket.on('chat message', ({ msg, username, isSystemMessage, timestamp }) => {
          console.log('Received message from server:', msg, username, isSystemMessage, timestamp);
          setReceivedMessages((messages) => [
              ...messages,
              { msg, username, isSystemMessage, timestamp }
          ])
      });

      return () => {
          // Clean up event listeners
          socket.off('chat message');
      };
  }, [socket]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout socket={socket}/>,
      children: [
        { index: true, element: <Home socket={socket} />},
        { path: "chat", element: <ChatRoom 
          socket={socket}
          message={message}
          receivedMessages={receivedMessages}
          setMessage={setMessage}
        />}
      ],
      errorElement: <ErrorPage />
    },
    // { path: 'auth', children: [
    //   { path:"login", element: <SignIn /> },
    //   { path:"accept/:uid/:token", element: <Accept /> },
    //   { path:"register", element: <Register /> },
    //   { path:"activate/:uid/:token", element: <ActivateAccount />}
    // ]}
  ])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} fallback={<FallBack />} />
      </SnackbarProvider>
    </ThemeProvider>
    )
};

export default App;
