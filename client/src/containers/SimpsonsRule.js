import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import SimpsonsRulecode from '../code/SimpsonsRulecode';

function SimpsonsRule() {
  return (
    <Container align={"center"}>
      <CssBaseline />
      <Headerbar headername="Simpson's Rule"/>
      <Box
        component="main"
        justifyContent="center"
        alignItems="center"
        sx={{ display: "flex", flexGrow: 1, flexDirection: "column", bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <SimpsonsRulecode />
      </Box>
    </Container>
  )
}

export default SimpsonsRule