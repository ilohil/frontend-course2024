import { Grid, Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getMatkat } from '../components/matkat';
import { useNavigate } from 'react-router-dom';

//function MatkalistaMUI({ matkat }) {
function MatkalistaMUI() {
  const navigate = useNavigate();

  const [matkat, setMatka] = useState([]);

  const haeKaikkimatkat = async () => {
    try {
      const response = await getMatkat();
      if (response.status === 200) {
        setMatka(response.data);
      } else {
        navigate('/virhe/Haku ei onnistunut');
      }
    } catch (error) {
      navigate('/virhe/Haku ei onnistunut');
    }
  }

  useEffect(() => {
    haeKaikkimatkat();
  }, []);


  return (
    <Grid container spacing={2} sx={{ marginTop: 1, marginLeft: 1 }}>
      {
        matkat.map(matka => {
          return (
            <Grid item key={matka.id}>
              <Card sx={{ width: 230 }}>

                <CardHeader title={matka.otsikko} subheader={matka.paiva} />
                {
                  matka.kuva ?
                    <CardMedia sx={{ height: 100, width: 230 }} component='img'
                      image={'http://localhost:8080/download/' + matka.kuva}
                      alt={matka.kuvaus} />
                    :
                    <CardContent>
                      <Typography>Ei kuvaa</Typography>
                    </CardContent>
                }

                <CardContent>
                  <Typography>{matka.paikka}</Typography>
                  <Typography>{matka.saa}</Typography>
                </CardContent>

                <CardActions>
                  {/* Parametrine välittäminen, kuvasta laitetaan tyhjää eli '' */}
                  <IconButton color='primary' component={Link} to={'/muokkaa/' + matka.id + '/' + matka.otsikko +
                    '/' + matka.paiva + '/' + matka.paikka + '/' + matka.saa + '/' + matka.kuvaus + '/' + ''}><EditIcon /></IconButton>
                  <IconButton color='secondary'><DeleteIcon /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default MatkalistaMUI;
