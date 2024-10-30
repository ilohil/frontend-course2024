import { useState, useEffect } from "react";
import { Button, Box, Paper, TextField, Typography, Rating, MenuItem, List, ListItem, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import fi from 'date-fns/locale/fi';
import { editAnime, getCategories, getStreamingServices, getAnime } from "./animes";
import { useNavigate, useParams } from 'react-router-dom';

function EditAnime() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [anime, setAnime] = useState({
        id: 0,
        name: '',
        category: 1,
        wheretowatch: 1,
        description: '',
        seasons: {},
        grade: 1
    });

    const [categories, setCategories] = useState([]);
    const [streamingServices, setStreamingServices] = useState([]);
    const [message, setMessage] = useState('');

    const searchAnimes = async () => {
        try {
            const response = await getAnime(id);
            if (response.status === 200) {
                const animeData = response.data;
                // Populate state with anime data
                setAnime({
                    id: animeData.id,
                    name: animeData.name,
                    category: animeData.category,
                    wheretowatch: animeData.wheretowatch,
                    description: animeData.description,
                    seasons: JSON.parse(animeData.seasons),
                    grade: animeData.grade
                });
            } else {
                navigate('/error/Error in searching anime');
            }
        } catch (error) {
            navigate('/error/Error in searching anime');
        }
    };

    useEffect(() => {
        searchAnimes();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    navigate('/error/Error in searching categories');
                }
            } catch (error) {
                navigate('/error/Error in searching categories');
            }
        };

        const fetchStreamingServices = async () => {
            try {
                const response = await getStreamingServices();
                if (response.status === 200) {
                    setStreamingServices(response.data);
                } else {
                    navigate('/error/Error in searching streaming services');
                }
            } catch (error) {
                navigate('/error/Error in searching streaming services');
            }
        };

        fetchCategories();
        fetchStreamingServices();
    }, [navigate]);

    const handleChange = (e) => {
        setAnime({
            ...anime,
            [e.target.name]: e.target.value
        });
        setMessage('');
    };

    const handleDateChange = (date, seasonKey) => {
        setAnime({
            ...anime,
            seasons: { ...anime.seasons, [seasonKey]: date }
        });
    };

    const addSeason = () => {
        const newSeasonKey = `season${Object.keys(anime.seasons).length + 1}`;
        setAnime({
            ...anime,
            seasons: { ...anime.seasons, [newSeasonKey]: null }
        });
    };

    const handleAddAnime = async () => {
        const seasonsJSON = JSON.stringify(anime.seasons);
        console.log(anime.seasons);

        const updatedAnime = {
            ...anime,
            seasons: seasonsJSON
        };

        try {
            const response = await editAnime(id, updatedAnime);

            if (response.status === 200) {
                navigate('/list');
            } else {
                console.error('Failed to edit anime');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <Paper sx={{ p: 2, textAlign: 'center' }} style={{
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
        }}>
            <Typography variant="h4">Edit anime</Typography>
            <Box component='form' sx={{ paddingTop: 2 }}>
                <Typography align="left">Title</Typography>
                <TextField
                    sx={{ paddingBottom: 2 }}
                    placeholder="Title"
                    name="name"
                    value={anime.name}
                    onChange={handleChange}
                    autoFocus
                    fullWidth
                />

                <Typography align="left">Category</Typography>
                <TextField
                    name="category"
                    onChange={handleChange}
                    value={anime.category}
                    sx={{ paddingBottom: 2 }}
                    select
                    fullWidth
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </TextField>

                <Typography align="left">Where to watch</Typography>
                <TextField
                    name="wheretowatch"
                    onChange={handleChange}
                    value={anime.wheretowatch}
                    sx={{ paddingBottom: 2 }}
                    select
                    fullWidth
                >
                    {streamingServices.map((service) => (
                        <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                    ))}
                </TextField>

                <Typography align="left">Description</Typography>
                <TextField
                    sx={{ paddingBottom: 2 }}
                    multiline
                    rows={3}
                    placeholder="Description"
                    name="description"
                    value={anime.description}
                    onChange={handleChange}
                    fullWidth
                />

                <Typography>Seasons</Typography>
                <Box>
                    <List>
                        {anime.seasons && Object.entries(anime.seasons).map(([seasonKey, date]) => (
                            <ListItem key={seasonKey}>
                                <ListItemText sx={{ textWrap: 'nowrap', paddingRight: 2 }} primary={seasonKey} />
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                                    <DesktopDatePicker
                                        value={date}
                                        onChange={(date) => handleDateChange(date, seasonKey)}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            </ListItem>
                        ))}
                    </List>
                    <Button startIcon={<AddIcon />} onClick={addSeason} color='secondary' >Add a new season</Button>
                </Box>

                <Typography sx={{ paddingTop: 2 }}>Your grade</Typography>
                <Rating
                    label='Grade'
                    name="grade"
                    value={Number(anime.grade)}
                    onChange={handleChange}
                    size="large"
                    precision={0.5}
                /> <br />

                <Button onClick={handleAddAnime} sx={{ marginRight: 2, marginTop: 2 }} variant="contained" color="primary">Save Changes</Button>
                {message && <Typography color="error">{message}</Typography>}
            </Box>
        </Paper>
    );
}

export default EditAnime;