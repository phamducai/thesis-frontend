import { Stack, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";

export default function MuiPicker() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  console.log({
    selectedDateTime: selectedDateTime && selectedDateTime.toLocaleTimeString(),
  });

  return (
    <Stack spacing={4} sx={{ width: "250px" }}>
      <DateTimePicker
        label="Date Time Picker"
        value={selectedDateTime}
        onChange={(newValue) => {
          setSelectedDateTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
