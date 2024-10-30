import {
    Box, Checkbox, Tooltip, Card, CardHeader, CardContent, CardMedia, Typography, CardActions,
    Accordion, AccordionSummary, AccordionDetails, Rating, List, ListItem, ListItemText, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { getAnimes, getCategory, getStreamingService, deleteAnime, editAnime } from './animes';
import { useNavigate } from 'react-router-dom';

function Animelist() {

    const navigate = useNavigate();

    const [animes, setAnime] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [newVote, setNewVote] = useState(1);

    const handleChange = (e) => {
        setNewVote(e.target.value)
    };

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
    }

    useEffect(() => {
        searchAnimes();
    }, []);

    const [open, setOpen] = useState(false);

    const handleOpen = (anime) => {
        setSelectedAnime(anime);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [sopen, setSopen] = useState(false);

    const handleClick = () => {
        setSopen(true);
    };

    const handleSClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSopen(false);
    }

    const handleDelete = async (id) => {

        try {
            const response = await deleteAnime(id);
            if (response.status === 200) {
                window.location.reload();
            } else {
                navigate('error/Error deleting anime');
            }
        } catch (error) {
            navigate('error/Error deleting anime');
        }
    }



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
    }

    const seasonparse = (season) => {
        if (season != null) {
            const seasonstr = season.substring(0, 6);
            const number = season.substring(6);
            return seasonstr.charAt(0).toUpperCase() + seasonstr.slice(1) + ' ' + number;
        }

        return 'Unknown';
    }

    const handleVoting = async (newVote) => {
        if (!selectedAnime) {
            console.error('Anime is undefined');
            return;
        }

        try {
            let grade1 = selectedAnime.grade * selectedAnime.votecount;
            let grade2 = Number(grade1) + Number(newVote);
            let newVoteCount = Number(selectedAnime.votecount + 1);
            let newGrade = Number(grade2 / newVoteCount);

            const updatedAnime = {
                ...selectedAnime,
                grade: newGrade,
                votecount: newVoteCount
            };

            const response = await editAnime(selectedAnime.id, updatedAnime);

            if (response.status === 200) {
                window.location.reload();
            } else {
                navigate('error/Error voting anime')
            }
        } catch (error) {
            navigate('error/Error voting anime')
        }
    };

    const Vote = () => {

        return (<Dialog
            onClose={handleClose}
            open={open}>

            <DialogTitle>Grade</DialogTitle>

            <IconButton
                onClick={handleClose}
                sx={{ position: 'absolute', right: 8, top: 8, }}> <CloseIcon /> </IconButton>

            <DialogContent >
                <Rating label='Grade'
                    name="grade"
                    value={Number(newVote)}
                    onChange={handleChange}
                    size="large"
                    precision={0.5}>
                </Rating>
            </DialogContent>

            <DialogActions>
                <Button color='secondary' onClick={() => handleVoting(newVote)}>
                    Vote
                </Button>
            </DialogActions>

        </Dialog>
        )
    }

    const Anime = ({ anime, credits, entries }) => {

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

            <Card sx={{ width: 400, marginLeft: 2, marginRight: 2 }} >
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
                <CardActions>
                    <Button startIcon={<Favorite />} color='secondary' onClick={handleClick}>Favorite</Button>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={sopen} autoHideDuration={2500} onClose={handleSClose}>
                        <Alert icon={<FavoriteBorder />}>
                            Anime added to favorites!
                        </Alert>
                    </Snackbar>
                    <Button startIcon={<GradeIcon />} color='secondary' onClick={() => handleOpen(anime)}>Grade</Button>
                    <Vote anime={selectedAnime} />
                    <Button startIcon={<EditIcon />} color='secondary' component={Link} to={'/edit/' + anime.id}>Edit</Button>
                    <Button startIcon={<DeleteIcon />} color='secondary' onClick={() => handleDelete(anime.id)}>Delete</Button>

                </CardActions>
            </Card>
        )
    }

    return (
        <Box sx={{ textAlign: 'center' }}>

            <Box justifyContent="center" display="flex" flexWrap="wrap" sx={{ padding: 2 }} >
                {
                    animes.map(anime => {
                        const seasonData = JSON.parse(anime.seasons)
                        const credits = JSON.parse(anime.credits);

                        return (
                            <Anime key={anime.id} anime={anime} entries={Object.entries(seasonData)} credits={credits} />
                        )
                    })
                }

            </Box>

            <Typography variant='h4'>Total anime: {animes.length}</Typography>

        </Box>
    )

}

export default Animelist;