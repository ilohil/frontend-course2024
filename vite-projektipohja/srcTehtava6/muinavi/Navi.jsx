import { useState } from "react";
import Reseptit from "../components/Reseptit";
import Ajot from "../components/Ajot";
import TallennaTieto from "../components/TallennaTieto";
import Lomake from "../components/Lomake";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CreateIcon from '@mui/icons-material/Create';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, AppBar, Tabs, Tab } from '@mui/material';
import MenuDrawer from "./MenuDrawer";

function Navi({ajot, nimi}) {

    const [value, setValue] = useState(0);

    const handleChange = (e, val) => {
        setValue(val);
    }

    return (
        <Box>
          <AppBar position='static'>
            <Tabs value={value} onChange={handleChange} textColor='inherit'
             centered>
              <Tab label='Ajopäiväkirja (tehtävä 2)' icon={<DirectionsCarIcon />} />
              <Tab label='Arviointi (tehtävä 3)' icon={<CreateIcon />} />
              <Tab label='Ruokahaku (tehtävä 4)' icon={<FastfoodIcon />} />
              <Tab label='Lomake (tehtävä 5)' icon={<CreateIcon />} />
              <Tab label='Menu (tehtävä 6)' icon={<MenuIcon />} />
            </Tabs>
          </AppBar>
          {value === 0 && <Ajot ajot={ajot} nimi={nimi}/>}
          {value === 1 && <TallennaTieto />}
          {value === 2 && <Reseptit />}
          {value === 3 && <Lomake />}
          {value === 4 && <MenuDrawer />}
        </Box>
      );

}

export default Navi;