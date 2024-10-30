import { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';

function DrawerMUI() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box>
      <IconButton onClick={handleOpen}><MenuIcon /></IconButton>

      <Drawer anchor='left' open={open} onClick={handleClose}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary='Lisää' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary='Listaa' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default DrawerMUI;