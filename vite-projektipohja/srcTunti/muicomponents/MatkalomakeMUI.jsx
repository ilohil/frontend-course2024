import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, InputLabel } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import fi from 'date-fns/locale/fi';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function MatkalomakeMUI() {

  const [matka, setValues] = useState({
    otsikko: '',
    paiva: new Date(),
    paikka: '',
    saa: '',
    kuvaus: '',
    kuva: []
  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });

    setViesti('');
  };

  const muutaSuurella = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value.toUpperCase()
    });

    setViesti('');
  };

  const muutaKuva = (e) => {
    setValues({
      ...matka,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

  /* Tämä otetaan käyttöön myöhemmin */
  const muutaPaiva = (e) => {
    setValues({
      ...matka,
      paiva: e
    });

    setViesti('');
  };


  const lisaaMatka = () => {

    setValues({
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: ''
    });

    setViesti('Lisättiin');
  }

  const tyhjenna = () => {

    setValues({
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: ''
    });

    setViesti('');
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
          onChange={(e) => muutaSuurella(e)} required fullWidth autoFocus />

{/*
        <TextField label='Päivä' name='paiva' value={matka.paiva}
          onChange={muuta} required fullWidth />
*/}

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DesktopDatePicker name='paiva' value={matka.paiva}
            onChange={(e) => muutaPaiva(e)} sx={{ width: '100%' }} />
        </LocalizationProvider>

        <TextField label='Paikka' name='paikka' value={matka.paikka}
          onChange={(e) => muuta(e)} required fullWidth />

        <TextField label='Sää' name='saa' value={matka.saa}
          onChange={muuta} required fullWidth />

        <TextField label='Kuvaus' name='kuvaus' value={matka.kuvaus}
          onChange={(e) => muuta(e)} multiline rows='4' fullWidth />

        <input accept='image/*' name='kuva' id='kuva' type='file'
          onChange={(e) => muutaKuva(e)} hidden />

        <InputLabel htmlFor='kuva'>
          <Typography sx={{ display: 'inline' }}>Kuva</Typography>
          <Button component='span'>
            <AttachmentIcon />
          </Button>
          <Typography sx={{ display: 'inline' }}>{kuvaNimi}</Typography>
        </InputLabel>

        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={() => lisaaMatka()} variant='contained' sx={{ marginRight: 3 }} startIcon={<CreateIcon />}>Lisää</Button>
          <Button onClick={() => tyhjenna()} variant='contained' color='secondary' startIcon={<ClearIcon />}>Tyhjennä</Button>
        </Box>
      </Box>
      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>

    </Paper >
  );
}

export default MatkalomakeMUI;
