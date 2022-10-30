import React from "react";
import cssModules from "../styles/detail.module.css";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import { API } from "../config/api";
import { UserContext } from "../context/user";
import { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import TablePagination from "@mui/material/TablePagination";
import { ImList2 } from "react-icons/im";
import ShowMoreText from "react-show-more-text";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid gray",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const Search = styled("div")(({ theme }) => ({
  border: "1px solid black",
  marginBottom: "1vh",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const Logger = (theme) => {
  const title = "Logger";
  document.title = "Inventory | " + title;
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [barangs, setBarangs] = useState();
  const [keyword, setKeyword] = useState("");

  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get(`/getLog?search_query=${keyword}`);
    setBarangs(response.data.result);
    console.log("anjing");
  });

  const DataBarang = barangs;
  const length = DataBarang?.length;
  console.log("len", length);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  console.log("idFlow", DataBarang);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0;

  // console.log("home", theme);
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // const handleSubmit = (e) => {

  // };
  useEffect(() => {
    refetch();
  }, [keyword]);
  console.log("theme", theme);
  return (
    <Box>
      <Container style={{ marginBottom: "5vh" }}>
        <div>
          <div>
            <div
              style={{
                width: "70vw",
                maxHeight: "80vh",
                marginLeft: "3vw",
                marginTop: "5vh",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  name="data"
                  value={keyword}
                  onChange={handleChange}
                  id="data"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
            <TableContainer
              style={{
                width: "70vw",
                maxHeight: "80vh",
                marginLeft: "3vw",
                marginTop: "1vh",
              }}
            >
              {/* {DataBarang?.length !== 0 ? ( */}
              <Paper align="center" sx={{ width: "100%" }}>
                <div className={cssModules.listItem}>
                  <div>
                    <ImList2 />
                  </div>
                  <span className={cssModules.h5}>Logger list</span>
                </div>
                <Table
                  sx={{ minWidth: 150, maxWidth: "80vw" }}
                  aria-label="simple table"
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  style={
                    theme.theme === "light"
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#E6E6E6" }
                  }
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Error Id</TableCell>
                      <TableCell>User Id</TableCell>
                      <TableCell>UserName</TableCell>
                      <TableCell>status code</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Request Url</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Response Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(DataBarang, getComparator(order, orderBy))
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        return (
                          <TableRow
                            key={index}
                            hover
                            tabIndex={-1}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.userId}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.username}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.method}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.statusCode}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.url}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.date}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.error}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  style={
                    theme.theme === "light"
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#E6E6E6" }
                  }
                />
              </Paper>
              {/* ) : (
                <div>
                  <Box
                    flex={6}
                    p={3}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    <div className="text-center pt-5">
                      <img
                        alt="img"
                        style={{ width: "730px" }}
                        src="https://www.reinforcedesigns.com/onlinemin/default-img/empty1.png"
                      />
                    </div>
                  </Box>
                  <Box
                    flex={6}
                    p={-6}
                    sx={{ display: { xs: "block", sm: "none" } }}
                  >
                    <div className="text-center pt-5">
                      <img
                        alt="img"
                        src="https://www.reinforcedesigns.com/onlinemin/default-img/empty1.png"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </Box>
                </div>
              )} */}
            </TableContainer>
          </div>
        </div>
      </Container>
    </Box>
  );
};
export default Logger;
