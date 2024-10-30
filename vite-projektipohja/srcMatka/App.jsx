import Matkalomake from "../srcTuntiMatka/components/Matkalomake";
import Matka from "./components/Matka";
import Matkalista from "./components/Matkalista";
import MatkalistaHaku from "./components/MatkalistaHaku";

const matka1 =
{
  id: 1,
  otsikko: 'Lomalla',
  paiva: '30.1.2024',
  paikka: 'Lohja',
  saa: 'Aurinkoista,  2',
  kuvaus: 'Lomalla Lohjalla'
};

const matkat = [
  {
  id: 1, otsikko: 'Lomalla',
  paiva: '26.5.2023', paikka: 'Lohja',
  saa: 'Aurinkoista, 10',
  kuvaus: 'Lomalla Lohjalla',
  },
  {
  id: 2, otsikko: 'Mökillä',
  paiva: '8.6.2023', paikka: 'Savonlinna',
  saa: 'Aurinkoinen, 21',
  kuvaus: 'Mökillä Itä-Suomessa',
  },
  {
  id: 3, otsikko: 'Sukuloimassa',
  paiva: '20.5.2023', paikka: 'Vantaa',
  saa: 'Pilvinen, 9',
  kuvaus: 'Kahvihetki',
  }
  ];


function App() {

  return (
    <>{/*
      <Matka matka={matka1} paiva={'30.01.24'}/>
  */}

   <Matkalista lista={matkat} />
   <Matkalomake />
   <MatkalistaHaku matkat={matkat} />

    </>
  )
}

export default App
