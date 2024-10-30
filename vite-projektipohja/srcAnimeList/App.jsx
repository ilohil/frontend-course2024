import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddAnime from "./components/AddAnime"
import Animelist from "./components/Animelist"
import SearchAnime from "./components/SearchAnime"
import EditAnime from "./components/EditAnime"
import { Box, CssBaseline, Typography, Paper } from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Navi from './navi/Navi';
import Statistics from "./components/Statistics";
import Error from "./components/Error";
import background from "./pictures/background.jpg"


const theme = createTheme({
  palette: {
    primary: {
      main: '#e1bee7',
    },
    secondary: {
      main: '#7b1fa2',
    }
  },
  typography:{
    fontFamily: "'Roboto Condensed', 'sans-serif'"

  },
})


document.body.style.backgroundImage = `url(${background})`;
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = 'cover';

const router = createBrowserRouter([
  {
    element: <Navi />,

    children: [{
      path: '/',
      element: <Paper 
      elevation={3} 
      style={{ 
        padding: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(10px)', 
      }}
    >
      <Typography variant="h5" gutterBottom>
        Animelist
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Animelist! This is a site where you can add your favorite animes and rate them.
      </Typography>
    </Paper>
    },
    {
      path: 'list',
      element: <Animelist />
    },
    {
      path: 'edit/:id',
      element: <EditAnime />
    },
    {
      path: 'search',
      element: <SearchAnime />
    },
  {
    path: 'add',
    element: <AddAnime />
  },
  {
    path: 'statistics',
    element: <Statistics />
  },
  {
    path: 'error/:message',
    element: <Error />
  }]
  }
])


function App() {

 

  return (
    <ThemeProvider theme={theme}>
    <Box>
      <CssBaseline />
      <RouterProvider router={router} />
    
    </Box>
    </ThemeProvider>
  )
}

export default App
