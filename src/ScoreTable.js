import React from "react";
import {
  Button,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
} from "@material-ui/core";

const ScoreTable = ({ joueurs, roundScores }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {joueurs.map((e) => (
              <TableCell>{e}</TableCell>
            ))}
            <TableCell>#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            {Object.values(roundScores).map((e) => (
              <TableCell align="center">{e}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
