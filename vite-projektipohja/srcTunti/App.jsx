//import MatkakorttiMUI from './components/MatkakorttiMUI';
//import MatkalistaMUI from './components/MatkalistaMUI';
//import MatkalomakeMUI from './components/MatkalomakeMUI';
import { Box, CssBaseline, Typography } from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
//import MatkakorttiMUI from './muicomponents/MatkakorttiMUI';
import MatkalistaMUI from './muicomponents/MatkalistaMUI';
import TabMUI from './muinavi/TabMUI';
//import DrawerMUI from './muinavi/DrawerMUI';
import MenuMUI from './muinavi/MenuMUI';
import { amber, green, purple, red, yellow } from '@mui/material/colors';
import { createBrowserRouter, isRouteErrorResponse, RouterProvider, useRouteError, Link } from 'react-router-dom';
import MatkalomakeMUI from './muicomponents/MatkalomakeMUI';
import MatkalomakeEditMUI from './muicomponents/MatkalomakeEditMUI';

const mat = [
  {
    id: 1,
    otsikko: 'Lomalla',
    paiva: '26.5.2024',
    paikka: 'Lohja',
    saa: 'Aurinkoista, 10',
    kuvaus: 'Lomalla Lohjalla',
    kuva: 'kuvia/tammi.png'
  },
  {
    id: 2,
    otsikko: 'Mökillä',
    paiva: '8.6.2024',
    paikka: 'Savonlinna',
    saa: 'Aurinkoinen, 21',
    kuvaus: 'Mökillä Itä-Suomessa',
    kuva: 'kuvia/lumme.png'
  },
  {
    id: 3,
    otsikko: 'Sukuloimassa',
    paiva: '20.5.2024',
    paikka: 'Vantaa',
    saa: 'Pilvinen, 9',
    kuvaus: 'Kahvihetki',
    kuva: 'kuvia/kakku.jpg'
  }
];

const theme = createTheme({
  palette: {
    primary: {main: amber[700]},
    secondary: {main: yellow[500]},
    text: {primary: green[400]}
  },
  typography:{
    fontFamily: "'Comic Neue', cursive"
  }
})

function Error() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (<Box>
      {error.status} {error.data}
    <Link to='/'> Etusivulle</Link>
    </Box>
    );
  }
  return (<Box>
    {error.message}
    <Link to='/'> Etusivulle</Link>
  </Box>);
}

const router = createBrowserRouter([
  {
  element: <TabMUI />,
  errorElement: <Error />,

  children: [{
    path: '/',
    element: <Typography>Matkasovellus</Typography>,
  },
  {
    path: 'lisaa',
    element: <MatkalomakeMUI />,
  },
  {
    path: 'listaa', 
    element: <MatkalistaMUI matkat={mat}/>,
  },
  {
    path: 'listaa/:id/:otsikko/:paiva/:paikka/:saa/:kuvaus',
    element: <MatkalomakeEditMUI />
  }
]
}])

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Box>
      <CssBaseline />
      {/*
      <MatkakorttiMUI />
      <MatkalistaMUI matkat={mat} />
      <MatkalomakeMUI />
      <TabMUI matkat={mat} />
      <DrawerMUI />
     */}
      
      <RouterProvider router={router} />
    </Box>
    </ThemeProvider>
  );
}

export default App;