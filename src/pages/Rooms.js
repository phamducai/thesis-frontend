import React from "react";
import { getRooms } from "../api";
import { useQuery } from "react-query";

import {
  Stack,
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import BuildingInfo from "../components/BuildingInfo";
import { deleteRoomById } from "../api";
import { useMutation, useQueryClient } from "react-query";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(2),
}));

export default function Rooms() {
  const { data: rooms } = useQuery("Rooms", getRooms, { initialData: [] });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteRoomById, {
    onSuccess: () => {
      queryClient.invalidateQueries("Rooms");
    },
  });

  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      <BuildingInfo />
      <Stack direction="row" padding={1} spacing={1}>
        <Box>
          <TextField
            placeholder="Search by room name"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}></Box>

        <Button variant="outlined" onClick={() => navigate("add")}>
          Add room
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {rooms.map(({ name, _id }, index) => (
          <Grid item xs={12} md={6} xl={4} key={index}>
            <Item
              elevation={2}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  boxShadow:
                    "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
                },
              }}
            >
              <Typography>{name}</Typography>

              <Stack direction="row" gap={2}>
                <Button variant="contained" onClick={() => navigate(_id)}>
                  View
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`${_id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => deleteMutation.mutate(_id)}
                >
                  Delete
                </Button>
              </Stack>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
