//import MatkakorttiMUI from './components/MatkakorttiMUI';
//import MatkalistaMUI from './components/MatkalistaMUI';
//import MatkalomakeMUI from './components/MatkalomakeMUI';
import { Box, CssBaseline } from '@mui/material';
import MatkakorttiMUI from './muicomponents/MatkakorttiMUI';
import MatkalistaMUI from './muicomponents/MatkalistaMUI';
import MatkalomakeMUI from './muicomponents/MatkalomakeMUI';

const mat = [
  {
    id: 1,
    otsikko: 'Lomalla',
    paiva: '26.5.2024',
    paikka: 'Lohja',
    saa: 'Aurinkoista, 10',
    kuvaus: 'Lomalla Lohjalla',
    kuva: 'kuvia/tammi.PNG'
  },
  {
    id: 2,
    otsikko: 'Mökillä',
    paiva: '8.6.2024',
    paikka: 'Savonlinna',
    saa: 'Aurinkoinen, 21',
    kuvaus: 'Mökillä Itä-Suomessa',
    kuva: 'kuvia/lumpeet.PNG'
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

function App() {
  return (
    <Box>
      <CssBaseline />
      {/*<MatkakorttiMUI /> 
      <MatkalistaMUI matkat={mat} /> */}
      <MatkalomakeMUI />
    </Box>
  );
}

export default App;