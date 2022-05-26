import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import GaussJordancode from '../code/GaussJordancode';

function GaussJordan() {
    return (
        <Container align={"center"}>
          <CssBaseline />
          <Headerbar headername='Gauss Jordan'/>
          <Box
            component="main"
            justifyContent="center"
            alignItems="center"
            sx={{ display: "flex", flexGrow: 1, flexDirection: "column", bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <GaussJordancode />
          </Box>
        </Container>
      )
}

export default GaussJordan