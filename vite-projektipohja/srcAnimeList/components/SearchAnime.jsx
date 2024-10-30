import { useState, useEffect } from "react";
import {
    Box, Paper, TextField, Button, Typography, Card, CardHeader, Tooltip, CardMedia,
    CardContent, Rating, Accordion, AccordionSummary, AccordionDetails, List, ListItem,
    ListItemText
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAnimes, getCategory, getStreamingService } from './animes';

function SearchAnime() {
    const navigate = useNavigate();
    const [animes, setAnime] = useState([]);
    const [results, setResults] = useState([]);
    const [aname, setAname] = useState('');
    const [searching, setSearching] = useState(false);

    const searchAnimes = async () => {
        try {
            const response = await getAnimes();
            if (response.status === 200) {
                setAnime(response.data);
            } else {
                navigate('/error/Error in searching animes');
            }
        } catch (error) {
            navigate('/error/Error in searching animes');
        }
    };

    useEffect(() => {
        searchAnimes();
    }, []);

    const change = (e) => {
        setAname(e.target.value);
        setSearching(false);
    };

    const search = () => {
        setSearching(true);
        if (aname.trim() !== '') {
            let result = animes.filter(anime => anime.name.toLowerCase().includes(aname.toLowerCase()));
            setResults(result);
        } else {
            setResults([]);
        }
    };

    const setCredits = (credits) => (
        <Box>
            <Typography>Picture by: <Link to={credits.homepage}>{credits.artist}</Link></Typography>
            <Typography>License: <Link to={credits.info}>{credits.license}</Link></Typography>
        </Box>
    )

    const dateparse = (date) => {

        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

        if (date != null) {
            if (date.split('.')[0] == 0) {
                return date.split('.')[2]
            } else if (isoRegex.test(date)) {
                const isoDate = new Date(date);
                const day = isoDate.getUTCDate();
                const month = isoDate.getUTCMonth() + 1;
                const year = isoDate.getUTCFullYear();
                return `${day.toString()}.${month.toString()}.${year}`;
            } else {
                return date
            }
        }

        return 0;
    }

    const stringparse = (category) => {
        if (category != null) {
            return category.charAt(0).toUpperCase() + category.slice(1);
        }

        return 'Unknown';
    };

    const seasonparse = (season) => {
        if (season != null) {
            const seasonstr = season.substring(0, 6);
            const number = season.substring(6);
            return seasonstr.charAt(0).toUpperCase() + seasonstr.slice(1) + ' ' + number;
        }

        return 'Unknown';
    }

    const AnimeCard = ({ anime, credits, entries }) => {

        const [streamingService, setStreamingService] = useState('');
        const [categoryName, setCategoryName] = useState('');

        useEffect(() => {
            const fetchStreamingService = async () => {
                try {
                    const response = await getStreamingService(anime.wheretowatch);
                    if (response.status === 200) {
                        setStreamingService(response.data.name);
                    } else {
                        setStreamingService('Unknown');
                    }
                } catch (error) {
                    navigate('/error/Error in searching streaming service');
                }
            };

            const fetchCategory = async () => {
                try {
                    const response = await getCategory(anime.category);
                    if (response.status === 200) {
                        setCategoryName(response.data.name);
                    } else {
                        setCategoryName('Unknown');
                    }
                } catch (error) {
                    navigate('/error/Error in searching category');
                }
            };

            fetchStreamingService();
            fetchCategory();
        }, [anime.wheretowatch, anime.category]);

        return (

            <Card sx={{ width: 400, marginLeft: 2, marginRight: 2 }}>
                <CardHeader title={anime.name} subheader={'on ' + streamingService} />


                <Tooltip title={setCredits(credits)}>
                    <CardMedia sx={{ width: 400 }} component='img'
                        image={'http://localhost:8080/download/' + anime.picture}
                        alt={'Image not found'} />
                </Tooltip>

                <CardContent>

                    <Typography> {stringparse(categoryName)} </Typography>

                    <Rating value={anime.grade} size='large' precision={0.5} readOnly></Rating>

                    <Accordion sx={{ width: 400 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}>
                            Description
                        </AccordionSummary>
                        <AccordionDetails>
                            {anime.description}
                        </AccordionDetails>
                    </Accordion>

                    <Accordion sx={{ width: 400 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}>
                            Seasons
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {entries.map((season) => {
                                    return <ListItem key={season}>
                                        <ListItemText primary={seasonparse(season[0])}
                                            secondary={dateparse(season[1])}></ListItemText>
                                    </ListItem>
                                })
                                }
                            </List>
                        </AccordionDetails>
                    </Accordion>

                </CardContent>
            </Card>
        );
    };

    return (
        <Paper sx={{ p: 2, textAlign: 'center' }} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
        }}>
            <Box display="flex" component="form" autoComplete="off" alignContent="center" justifyContent="center">
                <TextField sx={{ marginRight: 2, width: 500 }} name="aname" value={aname} onChange={change}></TextField>
                <Button onClick={() => search()} variant="contained" color="secondary">Search</Button>
            </Box>
            <Box justifyContent="center" display="flex" flexWrap="wrap" sx={{ padding: 2 }}>
                {searching && results.length === 0 ? (
                    <Typography sx={{ paddingTop: 2 }}>Animes not found with given name</Typography>
                ) : (
                    results.map(anime => {
                        const seasonData = JSON.parse(anime.seasons)
                        const credits = JSON.parse(anime.credits);
                        return (
                            <AnimeCard key={anime.id} anime={anime} entries={Object.entries(seasonData)} credits={credits} />
                        )
                    })
                )}
            </Box>
        </Paper>
    );
}

export default SearchAnime;
