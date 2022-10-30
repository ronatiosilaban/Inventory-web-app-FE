import Sidebar from "../components/Sidebar/Sidebar";
import ListBarang from "../components/listbarang/HomePage";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import Length from "../components/listbarang/length";
import { useState } from "react";

export default function Home(theme) {
  const title = "Home";
  document.title = "Inventory | " + title;
  const [fresh, setFresh] = useState(false);

  return (
    <Box>
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}> */}
      <Stack direction="row" spacing={1}>
        <ListBarang setFresh={setFresh} theme={theme} />
        <Length fresh={fresh} theme={theme} />
      </Stack>
      {/* </Sidebar> */}
    </Box>
  );
}
