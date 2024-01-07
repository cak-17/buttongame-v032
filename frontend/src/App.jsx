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

import SignIn from "./pages/SignIn";
import Invite from "./pages/Invite";
import Accept from './pages/Auth/Accept';
import Register from './pages/Auth/Register';
import { useSelector } from 'react-redux';
import ActivateAccount from './pages/Auth/Activate';

function AdminRoute({component}) {
  const isAuth = useSelector((state) => state.user.isAuth)

  return isAuth
  ? component
  :  <Navigate to="/auth/login/" />
}

const App = ({ socket }) => {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: light)")
  const [mode, setMode] = React.useState(isSystemDarkMode ? 'dark' : 'light');
  const [message, setMessage] = React.useState('')
  const [receivedMessages, setReceivedMessages] = React.useState([])

  React.useEffect(() => {
      // Listen for events from server
      socket.on('get-last-50-msg', (msgRecords) => {
        setReceivedMessages((messages) => [
          ...msgRecords,
          ...messages
        ])
      })

      socket.on('chat message', (data) => {
        console.log('Received message from server:', data.content, data.userName, data.isSystemMessage, data.timestamp);
        setReceivedMessages((messages) => [
          ...messages,
          data
        ])
      });
      console.log("RECEIVED MSGS", receivedMessages)

      return () => {
          // Clean up event listeners
          socket.off('chatRecord');
          socket.off('chat message');
      };
  }, [socket, receivedMessages]);

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
        { index: true, element: <AdminRoute component={<ChatRoom
          socket={socket}
          message={message}
          receivedMessages={receivedMessages}
          setMessage={setMessage}
        />} />},
        { path: 'auth', children: [
          { path:"login", element: <SignIn /> },
          { path:"accept/:uid/:token", element: <Accept /> },
          { path:"register", element: <Register /> },
          { path:"activate/:uid/:token", element: <ActivateAccount />},
          { path:"invite", element: <Invite /> }
        ]}
      ],
      errorElement: <ErrorPage />
    },

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
