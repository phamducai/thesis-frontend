import React from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Paper,
  Button,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { sendAddDeviceCommand } from "../api";
import QueryTable from "../components/QueryTable";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useQuery, useQueryClient, useMutation } from "react-query";
import { getDevices, deleteDeviceById } from "../api";

const SearchBar = (
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

    <Button variant="contained" onClick={sendAddDeviceCommand}>
      Add Device
    </Button>
  </Stack>
);

function Devices() {
  const devicesQuery = useQuery("alldevices", () => getDevices(), {
    initialData: [],
  });
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("alldevices");
    },
  });

  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "dev_addr", header: "dev_addr" },
    { field: "type", headerName: "Type" },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SettingsIcon />}
          label="Edit"
          showInMenu
          component={Link}
          to={`/Edit/${params.id}`}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          showInMenu
          onClick={() => handleDelete(params.dev_addr)}
        />,
      ],
    },
  ];

  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      {SearchBar}

      <Paper>
        <QueryTable
          queryProps={devicesQuery}
          tableProps={{ height: 400, columns }}
        />
      </Paper>
    </Stack>
  );
}

export default Devices;
