import { Card, CardHeader, CardContent, CardMedia, Typography, CardActions } from '@mui/material';

const matka = {
    otsikko: 'Lomalla',
    paiva: '26.5.2024',
    paikka: 'Lohja',
    saa: 'Aurinkoista, 10',
    kuvaus: 'Lomalla Lohjalla',
    kuva: 'kuvia/tammi.png'
}

function MatkakorttiMUI() {
    return (
        <Card sx={{ width: 230 }}>
            <CardHeader title={matka.otsikko} subheader={matka.paiva} />
            <CardMedia sx={{ height: 100, width: 230 }} component='img'
                image={matka.kuva} alt={matka.kuvaus} />
            <CardContent>
                <Typography>{matka.paikka}</Typography>
                <Typography>{matka.saa}</Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
}

export default MatkakorttiMUI;