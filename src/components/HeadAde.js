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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDeviceById } from "../api";
export default function HeadAde() {
  const deviceId = "6278c48a12ccdde504ae8f3e";
  // const [devices, setDevices] = React.useState();

  // React.useEffect(() => {
  //   const loaddevice = async () => {
  //     const response = await getDeviceById(deviceId);
  //     setDevices(response.data);
  //   };
  //   loaddevice();
  // }, []);

  const { data: devices } = useQuery(
    "RelayAdes",
    () => getDeviceById(deviceId, "RelayAdes"),
    { initialData: [] }
  );
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>{devices.name}</TableCell>
          <TableCell>{devices.attributes?.channels.vrms}</TableCell>
          <TableCell>{devices.attributes?.channels.irms}</TableCell>
          <TableCell>{devices.attributes?.channels.energy}</TableCell>
          <TableCell>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={`/Ade/${devices._id}`}
            >
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to={`/device/${devices._id}`}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
