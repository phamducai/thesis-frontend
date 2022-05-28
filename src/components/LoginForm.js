import React from "react";

import { Typography, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

import { signUserUp, logUserIn } from "../api";
import LoginIcon from "@mui/icons-material/Login";
import Divider from "@mui/material/Divider";

export default function LoginForm() {
  const [tab, setTab] = React.useState(false);

  const queryClient = useQueryClient();

  const loginMutation = useMutation(logUserIn, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const registerMutation = useMutation(signUserUp, {
    onSuccess: () => {
      loginMutation.mutate({ username, password });
    },
  });

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");

  function handleSignup() {
    registerMutation.mutate({ username, password });
  }
  function handleLogin() {
    loginMutation.mutate({ username, password });
  }

  function switchTab() {
    setUsername("");
    setPassword("");
    setRepassword("");
    setTab((tab) => !tab);
  }

  if (tab)
    return (
      <React.Fragment>
        <Typography>Register</Typography>

        <TextField
          label="User Name"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="PassWord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm PassWord"
          type="password"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />

        <Button
          color="primary"
          variant="contained"
          onClick={handleSignup}
          disabled={!username || !password || password !== repassword}
        >
          Login
        </Button>
        <Divider />

        <Button color="success" variant="contained" onClick={switchTab}>
          Already HAVE ACCOUNT ?
        </Button>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <Typography variant="h5">Login</Typography>

      <TextField
        label="User Name"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="PassWord"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleLogin}
        disabled={!username || !password}
      >
        <LoginIcon />
        Login
      </Button>
      <Divider />
      <Button color="success" variant="contained" onClick={switchTab}>
        Register
      </Button>
    </React.Fragment>
  );
}
