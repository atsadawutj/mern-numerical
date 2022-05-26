import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import PolynomialRegressioncode from '../code/PolynomialRegressioncode';

function PolynomialRegression() {
  return (
    <Container align={"center"}>
    <CssBaseline />
    <Headerbar headername='Polynomial Regression'/>
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <PolynomialRegressioncode />
    </Box>
  </Container>
  )
}

export default PolynomialRegression