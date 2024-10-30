import { useState, useEffect } from "react";
import { Button, Box, Paper, TextField, Typography, Rating, MenuItem, InputLabel, List, ListItem, ListItemText } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import fi from 'date-fns/locale/fi';
import { addAnime, getCategories, getStreamingServices } from "./animes";
import { useNavigate } from 'react-router-dom';

function AddAnime() {
    const navigate = useNavigate();

    const [anime, setAnime] = useState({
        name: '',
        category: 1,
        picture: [],
        credits: { artist: '', homepage: '', license: '', info: '' },
        description: '',
        seasons: { season1: '' },
        wheretowatch: 1,
        grade: 1,
        votecount: 1
    });

    const [categories, setCategories] = useState([]);
    const [streamingServices, setStreamingServices] = useState([]);
    const [message, setMessage] = useState('');
    const [picName, setPicName] = useState('');

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

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAnime({
                ...anime,
                picture: file
            });
            setPicName(file.name);
            setMessage('');
        }
    };

    const handleDateChange = (date, seasonKey) => {
        setAnime({
            ...anime,
            seasons: { ...anime.seasons, [seasonKey]: date }
        });
    };

    const changeCredits = (e) => {
        const { name, value } = e.target;
        setAnime({
            ...anime,
            credits: {
                ...anime.credits,
                [name]: value
            }
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

        const formData = new FormData();
        formData.append('name', anime.name);
        formData.append('category', anime.category);
        if (anime.picture) {
            formData.append('picture', anime.picture);
        }
        formData.append('credits', JSON.stringify(anime.credits));
        formData.append('description', anime.description);
        formData.append('seasons', JSON.stringify(anime.seasons));
        formData.append('wheretowatch', anime.wheretowatch);
        formData.append('grade', anime.grade);
        formData.append('votecount', anime.votecount);

        try {
            const response = await addAnime(formData);
            if (response.status === 200) {
                navigate('/list');
            } else {
                navigate('/error/Error adding anime');
            }
        } catch (error) {
            navigate('/error/Error adding anime');
        }
    };




    const handleEmptyValues = () => {
        setAnime({
            name: '',
            category: 1,
            picture: [],
            credits: { artist: '', homepage: '', license: '', info: '' },
            description: '',
            seasons: { season1: '' },
            wheretowatch: 1,
            grade: 1,
            votecount: 1
        });
        setPicName('');
        setMessage('');
    };

    return (
        <Paper sx={{ p: 2, textAlign: 'center' }} style={{
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
        }}>
            <Typography variant="h4">Add a new anime</Typography>
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
                        {Object.entries(anime.seasons).map(([seasonKey, date]) => (
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
                    <Button startIcon={<AddIcon />} onClick={addSeason} color='secondary'>Add a new season</Button>
                </Box>

                <Typography sx={{ paddingTop: 2 }}>Your grade</Typography>
                <Rating
                    label='Grade'
                    name="grade"
                    value={Number(anime.grade)}
                    onChange={handleChange}
                    size="large"
                    precision={0.5}
                />

                <input
                    accept="image/*"
                    name="picture"
                    id="picture"
                    type="file"
                    onChange={handlePictureChange}
                    hidden
                />
                <InputLabel htmlFor="picture" sx={{ paddingBottom: 2 }}>
                    <Button component="span" color='secondary' startIcon={<ImageIcon />}>Add a picture</Button>
                    <Typography variant="inline">{picName}</Typography>
                </InputLabel>

                <Typography sx={{ paddingBottom: 1 }}>Picture credits:</Typography>
                <Box display="flex" alignContent="center" justifyContent="center" sx={{ paddingBottom: 2 }}>
                    <Typography sx={{ padding: 2, textWrap: 'nowrap' }} >Artist's name:</Typography>
                    <TextField name="artist" placeholder="Artist's name" value={anime.picture.artist} onChange={changeCredits} fullWidth />
                    <Typography sx={{ padding: 2, textWrap: 'nowrap' }}>Artist's web page:</Typography>
                    <TextField name="homepage" placeholder="Link to artist's web page" value={anime.picture.homepage} onChange={changeCredits} fullWidth />
                    <Typography sx={{ padding: 2, textWrap: 'nowrap' }}>License:</Typography>
                    <TextField name="license" placeholder="License" value={anime.picture.license} onChange={changeCredits} fullWidth />
                    <Typography sx={{ padding: 2, textWrap: 'nowrap' }}>Link to license:</Typography>
                    <TextField name="info" placeholder="Link to license" value={anime.picture.info} onChange={changeCredits} fullWidth />
                </Box>

                <Button onClick={handleAddAnime} sx={{ marginRight: 2 }} variant="contained" color="primary">Add Anime</Button>
                <Button onClick={handleEmptyValues} variant="contained" color="secondary">Empty values</Button>
                {message && <Typography color="error">{message}</Typography>}
            </Box>
        </Paper>
    );
}

export default AddAnime;