import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  ListItemIcon,
  TableHead,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDeviceById } from "../api";
export default function HeadAde() {
  const deviceId = "6285d5c83d7f15cbc14c1106";
  const { data: devices } = useQuery(
    "ADE",
    () => getDeviceById(deviceId, "ADE"),
    { initialData: [] }
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Home Name</TableCell>
          <TableCell>Dien Ap</TableCell>
          <TableCell>Dong dien</TableCell>

          <TableCell>Tieu thu</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{devices?.name}</TableCell>
          <TableCell>{devices.attributes?.channels.vrms}</TableCell>
          <TableCell>{devices.attributes?.channels.irms}</TableCell>
          <TableCell>{devices.attributes?.channels.energy}</TableCell>

          <TableCell>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={`/Adechart/${devices._id}`}
            >
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to={`/HeadAdeedit/${devices._id}`}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
