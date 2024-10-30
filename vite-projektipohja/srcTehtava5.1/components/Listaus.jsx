import {Grid, Card, CardHeader, CardMedia, CardActions, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Listaus({data}) {
    return (
        <Grid container spacing={2} sx={{marginTop: 1, marginLeft: 1}}>
        {
            data.map(tieto => {
                return (
                    <Grid item key={tieto.id}>
                    
                    <Card sx={{width: 200}}>
                        <CardActions>
                        <Button color="primary" startIcon={<AccountCircleIcon/>}>Näytä</Button>
                        <Button color="secondary" startIcon={<DeleteIcon />}>Poista</Button>
                        </CardActions>
                        <CardHeader title={tieto.otsikko} subheader={tieto.paiva}/>
                        <CardMedia sx={{height: 150, width: 200}} component='img' image={tieto.picture} alt={tieto.otsikko} />


                    </Card>

                    </Grid>
                )
            })
        }

        </Grid>
    )
}

export default Listaus;