import React from "react";

import { useQuery } from "react-query";

import { Stack, Paper, Box } from "@mui/material";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Main from "./components/Main";

import { getAuthStatus } from "./api";
import LoginForm from "./components/LoginForm";

function App() {
  const { data: user, status } = useQuery("user", getAuthStatus);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  if (status === "loading")
    return <Stack sx={{ minHeight: "100vh" }}>Checking if logged in</Stack>;

  if (status === "error")
    return <Stack sx={{ minHeight: "100vh" }}>Server Error</Stack>;

  if (!user)
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Stack gap={2}>
            <LoginForm />
          </Stack>
        </Paper>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Main />
    </Box>
  );
}

export default App;
