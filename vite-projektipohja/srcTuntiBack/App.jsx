import { Box, CssBaseline, Typography } from '@mui/material';
//import MatkakorttiMUI from './muicomponents/MatkakorttiMUI';
import MatkalistaMUI from './muicomponents/MatkalistaMUI';
import MatkalomakeMUI from './muicomponents/MatkalomakeMUI';
import MatkalomakeEditMUI from './muicomponents/MatkalomakeEditMUI';
import TabMUI from './muinavi/TabMUI';
//import DrawerMUI from './muinavi/DrawerMUI';
//import MenuMUI from './muinavi/MenuMUI';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { yellow, amber, green } from '@mui/material/colors';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

import Virhe from './muicomponents/Virhe';

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
    // primary: { main: amber[700], contrastText: '#FFFFFF' },
    // secondary: { main: yellow[400], contrastText: '#FFFFFF' },
    // text: {primary: green[400], secondary: yellow[400] }, 
  },  // Värimaailma 
  typography: {
    fontFamily: "'Dancing Script', cursive",
  },  // Fontti 
});

function Error() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Box>
        {error.status} {error.data}
        <Link to='/'> Etusivulle</Link>
      </Box>
    );
  }
  return (<Box>
    {error.message}
    <Link to='/'>Etusivulle</Link>
  </Box>
  );
}

// Reititysihjeet
const router = createBrowserRouter([
  {
    element: <TabMUI />,  // Navigaatiokomponentti
    errorElement: <Error />,  // Virheiden käsittelijä
    children: [
      {
        path: '/',
        element: <Typography>Matkasovellus</Typography>
      },
      {
        path: 'lisaa',
        element: <MatkalomakeMUI />,
      },
      {
        path: 'listaa',
        element: <MatkalistaMUI matkat={mat} />,
      },
      // Parametrien käyttö
      {
        path: 'muokkaa/:id/:otsikko/:paiva/:paikka/:saa/:kuvaus',
        element: <MatkalomakeEditMUI />,
      },
      {
        path: 'virhe/:viesti',
        element: <Virhe />,
      },
    ]
  },
]);


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
       <MenuMUI />
     */}
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;