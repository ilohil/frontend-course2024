import { useState } from 'react';

function Matkalomake() {
  const [matka, setMatka] = useState(
    {
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
    }
  );

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setMatka(
      {
        ...matka,
        [e.target.name]: e.target.value
      }
    )
    setViesti('');
    }
    
  const lisaa = () => {
    // Lisätään kantaan
    setMatka(
      {
        otsikko: '',
        paiva: new Date(),
        paikka: '',
        saa: '',
        kuvaus: '',
      }
    )
    setViesti('Lisättiin');
  }


  return (
    <>
    <form>
      <label>Otsikko
        <input type='text' name='otsikko' value={matka.otsikko} onChange={(e) => muuta(e)} /><br />
      </label>
      <label>Paikka
        <input type='text' name='paikka' value={matka.paikka} onChange={(e) => muuta(e)} /><br />
      </label>
      <label>Päivä
        <input type='text' name='paiva' value={matka.paiva} onChange={(e) => muuta(e)} /><br />
      </label>
      <label>Sää
        <input type='text' name='saa' value={matka.saa} onChange={(e) => muuta(e)} /><br />
      </label>
      <label>Kuvaus
        <input type='text' name='kuvaus' value={matka.kuvaus} onChange={(e) => muuta(e)} /><br />
      </label>
      <input type='button' value='Lisää' onClick={() => lisaa()} />
    </form>
    {viesti}
    </>
  );
}

export default Matkalomake;
