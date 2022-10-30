//module import start
import "../styles/App.css";
import LoginUser from "../components/Login/login";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../components/Login/logo";
//module import end

export default function Login() {
  const title = "Login";
  document.title = "Inventory | " + title;
  return (
    <Box sx={{ width: "100vw" }}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Logo />
        <LoginUser />
      </Stack>
    </Box>
  );
}
