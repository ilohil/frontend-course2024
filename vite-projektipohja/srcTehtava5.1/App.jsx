import { Box } from "@mui/material"
import Listaus from "./components/Listaus"


function App() {

  const data = [
    {
    id: 1, otsikko: 'Assi', paiva: '2024-02-29',
    picture: 'kuvia/assi.jpg'
    },
    {
    id: 2, otsikko: 'Myynti', paiva: '2024-03-01',
    picture: 'kuvia/myynti.jpg'
    },
    {
    id: 3, otsikko: 'Tiko', paiva: '2024-06-24',
    picture: 'kuvia/tiko.jpg'
    },
    {
    id: 4, otsikko: 'Bite', paiva: '2024-05-31',
    picture: 'kuvia/yleinen1.jpg'
    },
    {
    id: 5, otsikko: 'Muu', paiva: '2024-02-29',
    picture: 'kuvia/yleinen2.jpg'
    },
    ]

  return (
    <Box>
      <Listaus data={data} />   
    </Box>
  )
}

export default App
