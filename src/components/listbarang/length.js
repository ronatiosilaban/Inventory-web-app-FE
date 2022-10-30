//module import start
import React from "react";
import cssModules from "../../styles/dashboard.module.css";
import { CgExtension, CgAlbum, CgUserList, CgFormatLeft } from "react-icons/cg";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Button } from "@mui/material";
//module import end
const Length = ({ fresh, theme }) => {
  const Length = localStorage.length;

  //router get data
  let { data: lengths, refetch } = useQuery("LengthChace", async () => {
    const response = await API.get("getLength");
    return response.data.data;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [fresh, open]);

  return (
    <Box flex={3} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      {open ? (
        <div>
          <Button startIcon={<ListAltIcon />} onClick={() => setOpen(false)}>
            Hide Details
          </Button>
          <div
            className={cssModules.Length}
            style={
              theme.theme === "light"
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#EAEAEA" }
            }
          >
            <div className={cssModules.divs}>
              <CgExtension className={cssModules.iconLength} />
            </div>
            <div className={cssModules.jumlah}>
              <h1>{lengths?.productData}</h1>
              <span>Item List</span>
            </div>
          </div>
          <div
            className={cssModules.Length}
            style={
              theme.theme === "light"
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#EAEAEA" }
            }
          >
            <div className={cssModules.divs}>
              <CgAlbum className={cssModules.iconLength} />
            </div>
            <div className={cssModules.jumlah}>
              <h1>{lengths?.productCategory}</h1>
              <span>Categories List</span>
            </div>
          </div>
          <div
            className={cssModules.Length}
            style={
              theme.theme === "light"
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#EAEAEA" }
            }
          >
            <div className={cssModules.divs}>
              <CgUserList className={cssModules.iconLength} />
            </div>
            <div className={cssModules.jumlah}>
              <h1>{lengths?.productSuplier}</h1>
              <span>Suplier List</span>
            </div>
          </div>
          <div
            className={cssModules.Length}
            style={
              theme.theme === "light"
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#EAEAEA" }
            }
          >
            <div className={cssModules.divs}>
              <CgFormatLeft className={cssModules.iconLength} />
            </div>
            <div className={cssModules.jumlah}>
              <h1>{lengths?.productUser}</h1>
              <span>User List</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ alignContent: "center" }}>
          <Button startIcon={<ListAltIcon />} onClick={() => setOpen(true)}>
            View Details
          </Button>
        </div>
      )}
    </Box>
  );
};

export default Length;
