import { useState } from 'react';
import {Box, AppBar, Typography, Toolbar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link, Outlet } from 'react-router-dom';

function Navi() {

    const [anchorMenu, setOpenNavi] = useState(null);

    const menuOpen = (e) => {
      setOpenNavi(e.currentTarget);
    }
  
    const menuClose = () => {
      setOpenNavi(null);
    }

    const menu = 
    <Menu
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={menuClose} >

    <MenuItem onClick={menuClose} component={Link} to='arviointi' >
        <ListItemIcon><CreateIcon/></ListItemIcon>
        <ListItemText primary='Arviointi' />
    </MenuItem>

    <MenuItem onClick={menuClose} component={Link} to='ruokahaku'>
        <ListItemIcon><FastfoodIcon /></ListItemIcon>
        <ListItemText primary='Ruokahaku' />
    </MenuItem>

    <MenuItem onClick={menuClose} component={Link} to='lomake'>
        <ListItemIcon><CreateIcon/></ListItemIcon>
        <ListItemText primary='Lomake' />
    </MenuItem>

    </Menu>

return (
    <Box>
        <AppBar position='static'>
        <Toolbar>
        <IconButton onClick={menuOpen} color='inherit'><MenuIcon /></IconButton>
        {menu}
        <Typography variant='h5'>Reititys</Typography>
        </Toolbar>
        </AppBar>
        <Outlet />
    </Box>
)

}

export default Navi;