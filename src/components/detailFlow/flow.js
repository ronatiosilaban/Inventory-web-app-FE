//import module start
import React from "react";
import cssModules from "../../styles/detail.module.css";
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
import ShowMoreText from "react-show-more-text";
import { useParams } from "react-router-dom";
import AddFlow from "./addFlow";
import EditFlow from "./editFlow";
//import module end

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

const Flow = ({ setFresh }) => {
  const [message, setMessage] = useState();
  const [idFlow, setIdFlow] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [barangs, setBarangs] = useState();
  const [show, setShow] = useState();
  const [idShow, setIdShow] = useState();
  const { id } = useParams();

  //router get data & set data to state

  let { data: barang, refetch } = useQuery("flowsCache", async () => {
    const response = await API.get("/getFlow/" + id);
    // setMember([response.data.data])
    setBarangs(response.data.data.productData);
    console.log("res", response.data.data);
    return response.data.data;

    // navigate('/product')
  });

  const DataBarang = barang?.user;
  const length = DataBarang?.length;

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

  const handleOpen = async (id) => {
    setOpen(true);
    setIdFlow(id);
    setFresh(true);
  };

  const handleOpenEdit = async (id) => {
    setShow(true);
    setIdShow(id);
    setFresh(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShow(false);
    setFresh(false);
  };
  useEffect(() => {
    refetch();
  }, [open, show]);

  //handle modal action end
  return (
    <Box>
      <Container style={{ marginBottom: "10vh" }}>
        <div>
          <div>
            <TableContainer
              sx={{
                maxWidth: "70vw",
                marginTop: "30px",
                position: "relative",
                left: "50%",
                transform: "translate(-50%)",
              }}
              style={{ width: "760px" }}
            >
              <h1 className={cssModules.header}>Detail Transaction</h1>
              <div className={cssModules.item}>
                <Button
                  variant="contained"
                  className={cssModules.buttons}
                  startIcon={<AddBoxIcon />}
                  onClick={() => handleOpen()}
                  style={{ textDecoration: "none" }}
                >
                  Add List
                </Button>
              </div>
              {DataBarang?.length !== 0 ? (
                <Paper align="center" sx={{ width: "100%" }}>
                  <div className={cssModules.listItem}>
                    <div>
                      <ImList2 />
                    </div>
                    <span className={cssModules.h5}>Flow list</span>
                  </div>
                  <Table
                    sx={{ minWidth: 150, maxWidth: "70vw" }}
                    aria-label="simple table"
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Code</TableCell>
                        <TableCell>Recipients Name</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Qty</TableCell>

                        <TableCell className={cssModules.buttons}></TableCell>
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
                                0{item.id}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <ShowMoreText
                                  /* Default options */
                                  lines={1}
                                  more="show"
                                  less="hide"
                                  className="content-css"
                                  anchorClass="my-anchor-css-class"
                                  expanded={false}
                                  width={100}
                                >
                                  {item.nameRecipients}
                                </ShowMoreText>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.status}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.date}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.amount !== null ? (
                                  <p>{item.amount}</p>
                                ) : (
                                  <p>1</p>
                                )}
                              </TableCell>

                              <TableCell component="th" scope="row">
                                <Button
                                  variant="contained"
                                  onClick={() => handleOpenEdit(item.id)}
                                >
                                  <EditIcon />
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
                    style={{ backgroundColor: "#fff" }}
                  />
                </Paper>
              ) : (
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
              )}
            </TableContainer>
            <AddFlow
              show={open}
              handleClose={handleClose}
              setMessage={setMessage}
              message={message}
            />
            <EditFlow
              show={show}
              handleClose={handleClose}
              setMessage={setMessage}
              message={message}
              idShow={idShow}
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Flow;
