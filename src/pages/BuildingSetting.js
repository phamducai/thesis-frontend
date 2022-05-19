import React from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Typography,
  Stack,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";

import { getDevices, getBuilding, updateBuildingById } from "../api";

export default function BuildingSetting() {
  const { data: relayAdes } = useQuery(
    "ades",
    () => getDevices({ params: { type: "RelayAde" } }),
    { initialData: [] }
  );
  const { data: building } = useQuery("building", getBuilding);
  const [refRelayAde, setRefRelayAde] = React.useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation(updateBuildingById, {
    onSuccess: () => {
      queryClient.invalidateQueries("building");
    },
  });

  function handleSave() {
    mutation.mutate({
      id: building._id,
      payload: { refRelayAde: refRelayAde },
    });
  }

  React.useEffect(() => {
    if (building && building.refRelayAde) setRefRelayAde(building.refRelayAde);
  }, [building]);

  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      <Typography variant="h4">Building setting</Typography>

      <TextField
        select
        label="Main RelayAde"
        value={refRelayAde}
        onChange={(e) => {
          setRefRelayAde(e.target.value);
        }}
        helperText="Select main RelayAde"
      >
        {relayAdes.map((relayAde) => (
          <MenuItem value={relayAde._id} key={relayAde._id}>
            {relayAde.name}
          </MenuItem>
        ))}
      </TextField>

      <Divider />

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Stack>
  );
}
