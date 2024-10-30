import {Button, Box, Paper, Slider, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";


function Lomake() {

    const [lomake, setValues] = useState({
        nimi: '',
        arvosana: 0,
        suosittelu: false
    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setValues({
            ...lomake,
            [e.target.name]: e.target.value
        });

        setViesti('');
    }

    const vaihdaArvosana = (e, arvosana1) => {
        setValues({
            ...lomake,
            arvosana: arvosana1
        })
    }


    const lisaa = () => {
        setValues({
            nimi: '',
            arvosana: 0,
            suosittelu: false
        });

        setViesti('Lisätiin');
    }

    const peruuta = () => {
        setValues({
            nimi: '',
            arvosana: 0,
            suosittelu: false
        });

        setViesti('');
    }

    const marks = [
        {
            value: 0,
            label: '0'
        },
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        }
      ]

    return (
        <Paper sx={{padding: '10px', margin: '10px'}}>
            <Box component='form' sx={{ '& .MuiTextField-root': {marginBottom: 2}, width: 300}}>

            <TextField label='Nimi' name="nimi" value={lomake.nimi} onChange={muuta} autoFocus fullWidth/>
            <Typography>Arvosana</Typography>
            <Slider step={1} marks={marks} min={0} max={5} value={lomake.arvosana} onChange={vaihdaArvosana}/>
            <Typography sx={{display: 'inline'}}>Suosittelen</Typography>
            <Switch value={lomake.suosittelu} onChange={muuta}/> <br />
            <Button variant="outlined" color="primary" sx={{marginRight: 2}} onClick={lisaa}>Lisää</Button>
            <Button variant="outlined" color="secondary" onClick={peruuta}>Peruuta</Button>
            </Box>

        <Typography sx ={{marginTop: 3}}>{viesti}</Typography>
        </Paper>
    )

}

export default Lomake;