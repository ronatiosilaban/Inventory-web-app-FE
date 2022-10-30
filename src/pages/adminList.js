//module import start
import React from "react";
import cssModules from "../styles/admin.module.css";
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
import { API } from "../config/api";
import TablePagination from "@mui/material/TablePagination";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AddAdmin from "../components/admin/modalAdd";
import { useQuery } from "react-query";
import EditAdmin from "../components/admin/modalEdit";
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

const AdminList = (theme) => {
  const title = "Admin List";
  document.title = "Inventory | " + title;
  const [idBarang, setIdBarang] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [barang, setBarang] = React.useState([]);
  const [message, setMessage] = React.useState();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  //router get data

  let { data: admin, refetch } = useQuery("adminCache", async () => {
    let response = await API.get(`/getUser?search_query=${keyword}`);
    setBarang(response.data.data);
    return response.data.data;
  });

  const length = barang?.length;

  //handle change start
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
  //handle change end

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0;

  // modal action start
  const handleOpen = async (id) => {
    setOpen(true);
    setIdBarang(id);
  };

  const handleOpenAdd = async () => {
    setShow(true);
  };

  const handleOpenEdit = async (id) => {
    setOpenEdit(true);
    setIdBarang(id);
  };

  const handleDelete = async () => {
    const response = await API.delete(`/delete/${idBarang}`);
    refetch();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setShow(false);
    setOpenEdit(false);
  };
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // const handleSubmit = (e) => {

  // };
  useEffect(() => {
    refetch();
  }, [show, open, keyword]);
  // modal action end

  return (
    <Box flex={5}>
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
          <Button
            variant="contained"
            style={{ marginBottom: "2vh" }}
            startIcon={<AddBoxIcon />}
            onClick={() => handleOpenAdd()}
          >
            Add List
          </Button>
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
            sx={{ width: "70vw", marginTop: "1vh" }}
            style={{ width: "800px" }}
          >
            {barang?.length !== 0 ? (
              <Paper>
                <Table
                  sx={{ minWidth: 150, maxWidth: "100%" }}
                  aria-label="simple table"
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Possition</TableCell>
                      <TableCell className={cssModules.buttons}></TableCell>
                      <TableCell className={cssModules.buttons}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(barang, getComparator(order, orderBy))
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
                              <Avatar
                                alt="Remy Sharp"
                                src={
                                  "http://localhost:5000/uploads/" +
                                  item?.profile[0]?.image
                                }
                              />
                            </TableCell>

                            <TableCell component="th" scope="row">
                              0{item?.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item?.username}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item?.status}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {item?.profile[0]?.desc}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item?.profile[0]?.possition}
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
                  rowsPerPageOptions={[5, 10, 25]}
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
                  flex={4}
                  p={3}
                  sx={{ display: { xs: "none", sm: "block" } }}
                  style={{ width: "800px" }}
                >
                  <div className="text-center pt-5">
                    <img
                      alt="img"
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
            )}
          </TableContainer>
        </div>
        <AddAdmin
          show={show}
          handleClose={handleClose}
          setMessage={setMessage}
          message={message}
        />
        <EditAdmin
          show={openEdit}
          handleClose={handleClose}
          setMessage={setMessage}
          message={message}
          id={idBarang}
        />
      </Container>
    </Box>
  );
};

export default AdminList;
