import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import Onepointcode from "../code/Onepointcode";

function OnePointIteration() {
  return (
    <Container align={"center"}>
    <CssBaseline />
    <Headerbar headername='One Point Iteration'/>
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Onepointcode />
    </Box>
  </Container>
  )
}

export default OnePointIteration