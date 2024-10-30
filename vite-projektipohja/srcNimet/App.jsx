import ListaaNimet from "./components/ListaaNimet";

function App() {

const nimet =
  [
    {
    nimi: "Virtanen Matti",
    alkupaiva: "2023-06-01",
    loppupaiva: "2023-06-30",
    },
    {
    nimi: "Laaksonen Lisaa",
    alkupaiva: "2023-06-26",
    loppupaiva: "2023-07-27",
    },
    {
    nimi: "Korhonen Maija",
    alkupaiva: "2023-08-03",
    loppupaiva: "2023-08-30",
    },
   ];


  return (
    <>
    <ListaaNimet nimet={nimet} />
    </>
  )
}

export default App
