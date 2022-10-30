//module import start
import React from "react";
import cssModules from "../../styles/categories.module.css";
import ModalCategories from "./modal/addCategories";
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
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API } from "../../config/api";
import { UserContext } from "../../context/user";
import { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import TablePagination from "@mui/material/TablePagination";
import { ImList2 } from "react-icons/im";
import { CgUserList } from "react-icons/cg";
import CategoryEdit from "./modal/editCategory";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
//module import end

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

const ListCategory = (theme) => {
  const [idCategory, setIdCategory] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [show, setShow] = useState(false);
  const handleCloses = () => setShow(false);
  const handleShows = () => setShow(true);
  const [message, setMessage] = useState();
  const [keyword, setKeyword] = useState("");

  //router get data

  let { data: suplier, refetch } = useQuery("categoriesCache", async () => {
    const response = await API.get(`/getCategorys?search_query=${keyword}`);
    return response.data.data.user;
  });

  const length = suplier?.length;

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0;

  //handle modal action start

  const handleAdd = () => {
    handleShows();
  };

  const handleOpen = async (id) => {
    setOpen(true);
    setIdCategory(id);
  };

  const handleOpenEdit = async (id) => {
    setOpenEdit(true);
    setIdCategory(id);
  };

  const handleDelete = async () => {
    const response = await API.delete(`/deleteCategory/${idCategory}`);
    setOpen(false);
    refetch();
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    refetch();
    setMessage();
  }, [openEdit, keyword, show]);

  //handle modal action end
  return (
    <Box flex={3}>
      {message && message}
      <Container>
        <div>
          <Modal
            open={open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 600 }}>
              <h2 id="parent-modal-title">Delete</h2>
              <p id="parent-modal-description">Sure want to delete??</p>
              <div className={cssModules.buttonModals}>
                <Button
                  onClick={handleClose}
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  color="error"
                >
                  No
                </Button>
                <Button
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="success"
                >
                  Yes
                </Button>
              </div>
            </Box>
          </Modal>
        </div>

        <div
          className={cssModules.Container}
          style={
            theme.theme === "light"
              ? { backgroundColor: "#E6E6E6" }
              : { backgroundColor: "#393E46" }
          }
        >
          <div className={cssModules.item}>
            <Button
              variant="contained"
              startIcon={<AddBoxIcon />}
              style={{ textDecoration: "none", marginBottom: "1vh" }}
              onClick={() => {
                handleAdd();
              }}
            >
              Add Category
            </Button>
          </div>
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
          <TableContainer
            sx={{
              width: "29vw",
              height: "70vh",
              marginTop: "30px",
              position: "relative",
            }}
          >
            {suplier?.length !== 0 ? (
              <Paper align="center" sx={{ width: "100%" }}>
                <div className={cssModules.listItem}>
                  <div>
                    <CgUserList />
                  </div>
                  <span className={cssModules.h5}>Category list</span>
                </div>
                <Table
                  sx={{ width: "100%" }}
                  aria-label="simple table"
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Categories Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell className={cssModules.buttons}></TableCell>
                      <TableCell className={cssModules.buttons}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(suplier, getComparator(order, orderBy))
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
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              0{item.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.category}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Button
                                variant="contained"
                                onClick={() => handleOpenEdit(item.id)}
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => handleOpen(item.id)}
                              >
                                <DeleteIcon />
                              </Button>
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
                  rowsPerPageOptions={[4, 10, 25]}
                  component="div"
                  count={length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            ) : (
              <div>
                <Box
                  flex={3}
                  p={3}
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  <div className="text-center pt-5">
                    <img
                      alt="img"
                      style={{ width: "20vw" }}
                      src="https://www.reinforcedesigns.com/onlinemin/default-img/empty1.png"
                    />
                  </div>
                </Box>
                <Box
                  flex={3}
                  p={-3}
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  <div className="text-center pt-5">
                    <img
                      alt="img"
                      src="https://www.reinforcedesigns.com/onlinemin/default-img/empty1.png"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                </Box>
              </div>
            )}
          </TableContainer>
        </div>
        <ModalCategories
          show={show}
          handleClose={handleCloses}
          setMessage={setMessage}
          message={message}
        />
        <CategoryEdit
          show={openEdit}
          handleClose={handleClose}
          setMessage={setMessage}
          message={message}
          id={idCategory}
        />
      </Container>
    </Box>
  );
};

export default ListCategory;
