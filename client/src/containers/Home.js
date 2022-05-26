import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Headerbar from "../components/Headerbar";

function Home() {
    return (
    <Container align="center">
      <CssBaseline />
      <Headerbar headername='Home'/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h1" mb={10}>
            Numerical
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
