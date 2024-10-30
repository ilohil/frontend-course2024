import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, InputLabel } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import fi from 'date-fns/locale/fi';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useParams } from 'react-router';

function MatkalomakeEditMUI() {
  let { id, otsikko, paiva, paikka, saa, kuvaus, kuva } = useParams();
  let [pp, kk, vv] = paiva.split('.');  // 12.10.2024

  const [matka, setValues] = useState({
    id: id,
    otsikko: otsikko,
    paiva: new Date(vv, kk - 1, pp), // Muutetaan merkkijonona oleva päivä Dateksi 2024-10-12
    paikka: paikka,
    saa: saa,
    kuvaus: kuvaus,
    // KUVAA EI PÄIVITETÄ
    kuva: []
  });

  const [viesti, setViesti] = useState('');

  // Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });
  };

  const muutaSuurella = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });
  };

  const muutaKuva = (e) => {
    setValues({
      ...matka,
      kuva: e.target.files[0]
    });
  }

  const muutaPaiva = date => {
    setValues({
      ...matka,
      paiva: date
    });
  };

  // Funktio painikkeen painallukselle
  const muutaMatka = () => {
    setViesti('Muutosta ei tulla tekemään backiin seuraavassa osassa');
  }

  const tyhjenna = (e) => {
    e.preventDefault();

    setValues({
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: []
    });
  }

  let kuvaNimi = '';
  if (matka.kuva !== null) {
    kuvaNimi = matka.kuva.name;
  }

  return (
    <Paper sx={{ padding: '10px', margin: '10px' }}>

      <Box component='form' autoComplete='off'
        sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>

        <TextField label='Otsikko' name='otsikko' value={matka.otsikko}
          onChange={muutaSuurella} required fullWidth
          autoFocus />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DesktopDatePicker
            onChange={(e) => muutaPaiva(e)}
            name='paiva'
            value={matka.paiva}
            sx={{ width: '100%' }}
          />
        </LocalizationProvider>

        <TextField label='Paikka' name='paikka' value={matka.paikka}
          onChange={muuta} required fullWidth />

        <TextField label='Sää' name='saa' value={matka.saa}
          onChange={muuta} required fullWidth />

        <TextField label='Kuvaus' name='kuvaus' value={matka.kuvaus}
          onChange={muuta} multiline rows='4' fullWidth />

        <input accept='image/*' name='kuva' id='kuva' type='file'
          onChange={muutaKuva} hidden />

        <InputLabel htmlFor='kuva'>
          <Typography sx={{ display: 'inline' }}>Kuva</Typography>
          <Button component='span'>
            <AttachmentIcon />
          </Button>
          <Typography sx={{ display: 'inline' }}>{kuvaNimi} Kuvan päivittämistä ei ole tehtynä</Typography>
        </InputLabel>

        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={muutaMatka} variant='contained' color='primary' sx={{ marginRight: 3 }}><CreateIcon />Muokkaa</Button>
          <Button onClick={tyhjenna} variant='contained' color='secondary'><ClearIcon />Tyhjennä</Button>
        </Box>
      </Box>

      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>
    </Paper>
  );
}

export default MatkalomakeEditMUI;
