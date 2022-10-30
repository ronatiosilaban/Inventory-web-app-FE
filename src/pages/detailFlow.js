import React from "react";
import Flow from "../components/detailFlow/flow";
import DetailList from "../components/detailFlow/detailList";
import { useState } from "react";
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
const DetailFlow = () => {
  const title = "Detail";
  document.title = "Inventory | " + title;
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <Link to="/sidebar/dashboard">
        <Button
          startIcon={<ChevronLeftIcon />}
          style={{ position: "fixed", top: 0 }}
        >
          Back
        </Button>
      </Link>
      <DetailList refresh={refresh} />
      <Flow setFresh={setRefresh} />
    </>
  );
};

export default DetailFlow;
