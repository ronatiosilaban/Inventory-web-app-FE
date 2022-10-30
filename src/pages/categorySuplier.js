import ListSuplier from "../components/listSuplier&category/suplier";
import ListCategory from "../components/listSuplier&category/categories";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
export default function ListCategorySuplier({ theme }) {
  const title = "Category & Suplier";
  document.title = "Inventory | " + title;
  return (
    <Box>
      <Stack direction="row" spacing={0}>
        <ListSuplier theme={theme} />
        <ListCategory theme={theme} />
      </Stack>
    </Box>
  );
}
