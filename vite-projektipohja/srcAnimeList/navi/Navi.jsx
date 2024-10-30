import {Box,AppBar, List, Drawer, Typography, ListItem, ListItemButton, Toolbar, IconButton, ListItemIcon, ListItemText} from '@mui/material';
import { useState } from 'react';
import { Link, Outlet} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';



function TabNavi() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      }
    
      const handleClose = () => {
        setOpen(false);
      }
    
    const [anchorMenu, setOpenNavi] = useState(null);


    const drawer = 
    <Box sx={{width: 230, alignItems:'center', marginTop:7}} onClick={handleClose}> 
    <List>
    <ListItem >
        <ListItemButton component={Link} to='/'>
        <ListItemIcon><HomeIcon/></ListItemIcon>
        <ListItemText primary='Home' />
        </ListItemButton>
    </ListItem>

    <ListItem>
        <ListItemButton component={Link} to='list'>
        <ListItemIcon><ListIcon/></ListItemIcon>
        <ListItemText primary='Animelist' />
        </ListItemButton>
    </ListItem>

    <ListItem>
        <ListItemButton component={Link} to='add'>
        <ListItemIcon><AddIcon/></ListItemIcon>
        <ListItemText primary='Add anime' />
        </ListItemButton>
    </ListItem>

    <ListItem>
        <ListItemButton component={Link} to='search'>
        <ListItemIcon><SearchIcon/></ListItemIcon>
        <ListItemText primary='Search anime' />
        </ListItemButton>
    </ListItem>

    <ListItem>
        <ListItemButton component={Link} to='statistics'>
        <ListItemIcon><EqualizerIcon /></ListItemIcon>
        <ListItemText primary='Statistics' />
        </ListItemButton>
    </ListItem>

    </List>
    </Box>


    return (
        <Box>
            <AppBar position='relative' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton 
                    onClick={handleOpen}
                    color='inherit'>
                    <MenuIcon />
                    </IconButton>
                    <Drawer
                    anchor='left'
                    open={open}
                    onClick={handleClose}>
                    {drawer}  
                    </Drawer>
                    
                    <Typography variant='h5'
                    sx={{textAlign: 'center', flexGrow:1}}>
                    Anime list</Typography>

                </Toolbar>
            </AppBar>

        <Outlet />
        </Box>
    )
}

export default TabNavi;