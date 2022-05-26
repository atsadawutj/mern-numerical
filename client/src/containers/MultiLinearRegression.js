import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import MultiLinearRegressioncode from '../code/MultiLinearRegressioncode';

function MultiLinearRegression() {
    return (
        <Container align={"center"}>
          <CssBaseline />
          <Headerbar headername='Multiple linear regression'/>
          <Box
            component="main"
            justifyContent="center"
            alignItems="center"
            sx={{ display: "flex", flexGrow: 1, flexDirection: "column", bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <MultiLinearRegressioncode />
          </Box>
        </Container>
      );
}

export default MultiLinearRegression