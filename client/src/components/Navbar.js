import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { navbarData } from './NavbarData';
import NavbarItem from './NavbarItem';

function Navbar() {
  return (
    <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            color: '#ffffff',
            bgcolor: '#00002a'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
          <Typography variant="h6" noWrap component="div">
            Numerical Method
          </Typography>
        </Toolbar >
        <Divider sx={{bgcolor: "#ffffff"}}/>
        {navbarData.map((item) => {
          return (  
            <List key={item.id} sx={{padding: 0}}>
              <NavbarItem item={item}/>
            </List>
          )
        })}
    </Drawer>
  )
}

export default Navbar