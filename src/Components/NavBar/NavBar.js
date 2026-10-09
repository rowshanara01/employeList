import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        padding: "12px",
        backgroundColor: "lightblue",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/manager">Manager</Link>
    </Box>
  );
};

export default NavBar;
