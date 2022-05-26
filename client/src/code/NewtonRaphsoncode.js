import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import FunctionPlot from "../components/FunctionPlot";
import newtonRaphson from "../utils/newtonRaphson";

function NewtonRaphsoncode() {
  const [expr, setExpr] = useState("");
  const [x, setX] = useState(0);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = newtonRaphson(parseFloat(x), expr);
    setResult(result);
    console.log(result);
    setShowResult(true);
  };

  const handleReset = () => {
    setExpr("");
    setX(0);
    setShowResult(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} columnSpacing={8} sx={{ width: "50%" }}>
          <Grid item xs={12}>
            <TextField
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              label="Expression"
              variant="outlined"
              color="secondary"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={x}
              onChange={(e) => setX(e.target.value)}
              label="X0"
              variant="outlined"
              color="secondary"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="success"
              variant="contained"
              style={{ width: "40%" }}
            >
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => handleReset()}
              color="error"
              variant="contained"
              style={{ width: "40%" }}
            >
              CLEAR
            </Button>
          </Grid>
        </Grid>
      </form>
      {showResult && (
        <Box m={10}>
          <Typography fontSize={30} color={"#ed4b82"} mb={5}>
            {`Result = ${parseFloat(result[result.length - 1].x_new).toFixed(
              10
            )}`}
          </Typography>
          <FunctionPlot
            title={`f(x) = ${expr}`}
            data={[
              {
                fn: expr,
              },
            ]}
            yAxis={{ domain: [parseFloat(x) - 10, parseFloat(x) + 10] }}
            xAxis={{ domain: [parseFloat(x) - 10, parseFloat(x) + 10] }}
          />
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#64d8cb" }}>
                <TableRow
                  sx={{
                    "& th": {
                      fontSize: "1.25rem",
                    },
                  }}
                >
                  <TableCell>Iteration</TableCell>
                  <TableCell>x_new</TableCell>
                  <TableCell>x_old</TableCell>
                  <TableCell>error</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((item) => (
                  <TableRow
                    key={item.i}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "& td": { fontSize: "1rem" },
                    }}
                  >
                    <TableCell component="td">{item.i}</TableCell>
                    <TableCell component="td">
                      {parseFloat(item.x_new.toFixed(10))}
                    </TableCell>
                    <TableCell component="td">
                      {item.x_old === ""
                        ? item.x_old
                        : parseFloat(item.x_old).toFixed(10)}
                    </TableCell>
                    <TableCell component="td">
                      {item.x_old === ""
                        ? item.x_old
                        : parseFloat(item.error).toFixed(10)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

export default NewtonRaphsoncode;
