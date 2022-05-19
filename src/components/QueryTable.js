import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Stack,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function QueryTable({ queryProps, tableProps, height }) {
  const { data = [], isFetching, isLoading, isError, refetch } = queryProps;
  let content;
  if (isLoading || isFetching) {
    content = <CircularProgress />;
  } else if (isError) {
    content = (
      <Stack>
        <Typography sx={{ color: "error.main" }}>An Error occurred.</Typography>
        <Button onClick={() => refetch()}>Refetch</Button>
      </Stack>
    );
  } else {
    content = (
      <DataGrid
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        rows={data}
        {...tableProps}
      />
    );
  }

  return (
    <Box
      sx={{
        height: height || 400,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {content}
    </Box>
  );
}
