import { Grid, Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MatkalistaMUI({ matkat }) {

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
            <CardMedia sx={{ height: 100, width: 230 }} component='img' image={matka.kuva} alt={matka.kuvaus} />
            :
            <CardContent> <Typography>Ei kuvaa</Typography> </CardContent>
            }

            <CardContent>
                <Typography>{matka.paikka}</Typography>
                <Typography>{matka.saa}</Typography>
            </CardContent>

            <CardActions>
            <IconButton color='primary'><EditIcon /></IconButton>
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
