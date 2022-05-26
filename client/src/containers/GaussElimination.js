import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Headerbar from "../components/Headerbar";
import GaussEliminationcode from "../code/GaussEliminationcode";

function GaussElimination() {
    return (
        <Container align={"center"}>
          <CssBaseline />
          <Headerbar headername='Gauss Elimination'/>
          <Box
            component="main"
            justifyContent="center"
            alignItems="center"
            sx={{ display: "flex", flexGrow: 1, flexDirection: "column", bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <GaussEliminationcode />
          </Box>
        </Container>
      )
}

export default GaussElimination