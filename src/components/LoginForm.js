import React from "react";

import { Typography, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

import { signUserUp, logUserIn } from "../api";

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
        <Typography>Signup</Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Re-Password"
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
          Signup
        </Button>
        <Button color="secondary" variant="contained" onClick={switchTab}>
          Signin with existing account
        </Button>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <Typography>Login with existing account or sign up</Typography>

      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
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
        Login
      </Button>
      <Button color="secondary" variant="contained" onClick={switchTab}>
        Signup
      </Button>
    </React.Fragment>
  );
}
