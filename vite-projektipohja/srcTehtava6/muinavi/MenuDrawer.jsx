import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

function MenuDrawer() {

    const [anchorMenu, setOpenNavi] = useState(null);

    const menuOpen = (e) => {
        setOpenNavi(e.currentTarget);
    }

    const menuClose = () => {
        setOpenNavi(null);
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

return (
  <Box>
    <IconButton onClick={menuOpen}><MenuIcon /></IconButton>

    <Menu
    anchorEl={anchorMenu}
    open={Boolean(anchorMenu)}
    onClose={menuClose}>

        <MenuItem onClick={menuClose}>
          <ListItemIcon><InfoIcon color="primary"/></ListItemIcon>
          <ListItemText primary='Tietoja' />
        </MenuItem>

        <MenuItem onClick={menuClose}>
          <ListItemIcon><PersonIcon color="secondary" /></ListItemIcon>
          <ListItemText primary='Omat tiedot' />
        </MenuItem>

    </Menu>

    <IconButton onClick={handleOpen}><MenuIcon /></IconButton>

    <Drawer anchor='left' open={open} onClick={handleClose} >
        <List>
            <ListItem>
            <ListItemButton>
              <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
              <ListItemText primary='Tietoja' />
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton>
              <ListItemIcon><PersonIcon color="secondary" /></ListItemIcon>
              <ListItemText primary='Omat tiedot' />
            </ListItemButton>
            </ListItem>
        </List>
    </Drawer>

  </Box>  
)

}

export default MenuDrawer;