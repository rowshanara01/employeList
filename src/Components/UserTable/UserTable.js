import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Box, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import axios from "axios";

const UserTable = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
      )
      .then((res) => setUserInfo(res.data));
  }, []);

  useEffect(() => {
    const newUser = userInfo.filter((user) =>
      user.first_name.toLowerCase().includes(value.toLowerCase())
    );
    setUser(newUser);
  }, [value]);

  const [salary, setSalary] = useState(0);
  const [salary1, setSalary1] = useState(10000000);
  const handleSalary = (e) => {
    e.preventDefault();
    setSalary(e.target.salary.value);
    setSalary1(e.target.salary2.value);
  };
  useEffect(() => {
    const data = userInfo.filter(
      (user) =>
        parseInt(user?.salary.replace(/,/g, "")) > parseInt(salary) &&
        parseInt(user?.salary.replace(/,/g, "")) < parseInt(salary1)
    );
    setUser(data);
  }, [salary, salary1]);

  //

  // const i = [1, 2, 3, 4, 5, 6, 7];
  // console.log(i.filter((j) => j > 3 && j < 5));

  console.log(user);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (e) => {
    setValue(e.target.value);
  };
  const handleUserDetails = (name) => {
    navigate(`/userDetails/${name}`);
  };

  return (
    <Box sx={{ maxWidth: "1540px", padding: "15px" }}>
      <Box
        sx={{
          marginTop: "12px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          value={value}
          onChange={handleSearch}
          id="input-with-icon-textfield"
          label="Search by name"
          InputProps={{
            startAdornment: (
              <SearchIcon position="start">
                <AccountCircle />
              </SearchIcon>
            ),
          }}
          variant="standard"
        />
        <Button variant="outlined">
          {" "}
          <SearchIcon position="start" /> Search
        </Button>
      </Box>
      <form onSubmit={handleSalary}>
        <input name="salary" type="number" placeholder="Salary range" />
        <input name="salary2" type="number" placeholder="Salary range" />
        <input type="submit" value="search" />
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Date of Birth</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Date of Joining</StyledTableCell>
              <StyledTableCell align="right">Salary</StyledTableCell>
              <StyledTableCell align="right">Designation</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.first_name}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {row.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.date_of_birth}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.date_of_joining}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.salary}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.designation}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Chip
                      label="DETAILS"
                      onClick={() => handleUserDetails(row.first_name)}
                      variant="outlined"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserTable;
