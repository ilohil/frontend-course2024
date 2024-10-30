import Navi from "./muinavi/Navi"
import { Box, CssBaseline} from '@mui/material';
import { green, indigo, teal } from "@mui/material/colors";
import {createTheme, ThemeProvider} from '@mui/material/styles'

const ajopaivakirja = {
  rekisterinro: "XYZ-123",
  laatija: "Risto Reipas",
  alku: {
   lukema: "32500",
   lahtoaika: "13:30",
   paiva: "2023-01-27",
   paikka: "Ratapihantie 13, Helsinki",
  },
  loppu: {
   lukema: "32510",
   loppuaika: "13:50",
   paiva: "2023-06-27",
   paikka: "Hietakummuntie 1, Helsinki",
  }
  }

  const theme = createTheme({
    palette: {
      primary: {main: teal[400]},
      secondary: {main: green[500]},
      text: {primary: indigo[700]}
    },
    typography: {
      fontFamily: "'Comic Neue', cursive"
    }

  })

function App() {

  return (
    <ThemeProvider theme={theme}>
    <Box>
    <CssBaseline />
    <Navi ajot={ajopaivakirja} nimi={'Ilona Hiltunen'}/>
    </Box>
    </ThemeProvider>
  )
}

export default App
