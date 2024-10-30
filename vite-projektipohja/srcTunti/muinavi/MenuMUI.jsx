import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import { Link, Outlet } from 'react-router-dom';

function MenuMUI() {

  const [anchorMenu, setOpenNavi] = useState(null);

  const menuOpen = (e) => {
    setOpenNavi(e.currentTarget);
  }

  const menuClose = () => {
    setOpenNavi(null);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton color='inherit' onClick={menuOpen}><MenuIcon /></IconButton>
          <Typography variant='h5' sx={{ flexGrow: 1, textAlign: 'center' }}>Matkat</Typography>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={menuClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}>

        <MenuItem onClick={menuClose} component={Link} to='/' >
          <ListItemIcon><CreateIcon /></ListItemIcon>
          <ListItemText primary='Etusivu' />
        </MenuItem>

        <MenuItem onClick={menuClose} component={Link} to='lisaa' >
          <ListItemIcon><CreateIcon /></ListItemIcon>
          <ListItemText primary='Lisää' />
        </MenuItem>

        <MenuItem onClick={menuClose} component={Link} to='listaa'>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary='Listaa' />
        </MenuItem>
      </Menu>
      <Outlet />
    </Box>
  );
}

export default MenuMUI;
