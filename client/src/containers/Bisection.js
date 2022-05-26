import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import Bisectioncode from "../code/Bisectioncode"; 

function Bisection() {
  return (
    <Container align={"center"}>
      <CssBaseline />
      <Headerbar headername='Bisection'/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Bisectioncode />
      </Box>
    </Container>
  );
}

export default Bisection;