import { useNavigate, useRouteError } from "react-router-dom";
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

const ErrorMessage = ({error}) => {
    const navigate = useNavigate()
    return (
        <Paper sx={{
            padding: '2rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            textAlign: 'center',
        }}>
            <Box mb={4}>
                <Typography component="p" variant="h2">{'Ooops... '}<span style={{ color:'orange'}}>{error.status}!</span></Typography>
                <Typography component="p" variant="h5" >{'Something went wrong...'}</Typography>
            </Box>
            <Typography compomnent="p" variant="h4" mb={4} style={{ color: 'orange'}}>{error.message}</Typography>
            <Box mb={4}>
              <Typography component='p' sx={{fontStyle: 'italic'}}>
                {'We apologize for the inconvenience'}
              </Typography>
              <Typography component='p' sx={{fontStyle: 'italic'}}>
              {'Please try again later or contact your IT Dept. if the error persists.'}</Typography>
            </Box>
            <IconButton onClick={() => navigate(-1)}><i className='fa-solid fa-arrow-left'></i>Back</IconButton>
          </Paper>
    )
  }
  
export default function ErrorPage() {
    let error = useRouteError();
    console.error(error);
    return <ErrorMessage error={error} />
  }