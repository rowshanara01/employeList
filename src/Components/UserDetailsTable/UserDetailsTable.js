import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const UserDetailsTable = () => {
  const [userInfoDetails, setUserInfoDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${id}`
      )
      .then((res) => setUserInfoDetails(res.data[0]));
  }, []);
  return (
    <Box sx={{ maxWidth: "1540px", margin: "auto", padding: "12px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Data Of Birth</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Date of Joining</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{userInfoDetails.first_name}</TableCell>
              <TableCell align="right">{userInfoDetails.last_name}</TableCell>
              <TableCell align="right">
                {userInfoDetails.date_of_birth}
              </TableCell>
              <TableCell align="right">{userInfoDetails.address}</TableCell>
              <TableCell align="right">
                {userInfoDetails.date_of_joining}
              </TableCell>
              <TableCell align="right">{userInfoDetails.salary}</TableCell>
              <TableCell align="right">{userInfoDetails.designation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserDetailsTable;
