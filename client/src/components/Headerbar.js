import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

function Headerbar({headername}) {
  return (
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{bgcolor: '#000051'}}>
          <Typography variant="h4" component="div"  align="center" style={{width: "100%"}}>
            {headername}
          </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Headerbar