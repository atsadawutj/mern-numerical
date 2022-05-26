import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import LinearRegressioncode from "../code/LinearRegressioncode";

function LinearRegression() {
  return (
    <Container align={"center"}>
      <CssBaseline />
      <Headerbar headername='Linear Regression'/>
      <Box
        component="main"
        justifyContent="center"
        alignItems="center"
        sx={{ display: "flex", flexGrow: 1, flexDirection: "column", bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <LinearRegressioncode />
      </Box>
    </Container>
  );
}

export default LinearRegression