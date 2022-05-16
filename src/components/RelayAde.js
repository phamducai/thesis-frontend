import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link,useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  ListItemIcon,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDevices, deleteDeviceById,updateDeviceStatusById  } from "../api";
export default function RelayAde() {
  let navigate = useNavigate();
  const { roomId } = useParams();
  const { data: devices } = useQuery(
    "RelayAdes",
    () => getDevices({ params: { type: "RelayAde", refRoom: roomId } }),
    { initialData: [] }
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("RelayAdes");
    },
  });
  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }
  function handleUpdata(deviceData) {
    deviceData.status ? deviceData.status =false : deviceData.status =true
     updateDeviceStatusById(deviceData);
     navigate("/room/"+roomId);
  }
  return (
    <Table>
      <TableBody>
        {devices.map((device, indexx) => (
          <TableRow key={indexx}>
            <TableCell>{device.name}</TableCell>
            <TableCell>
              <Button  onClick={()=>{handleUpdata(device)}}>{device?.status ? <Button  variant="contained"  color="primary">ON</Button>:<Button  variant="contained"   color="error">Off</Button>}     
              </Button>          
              </TableCell>
            <TableCell>{device.attributes?.channels.vrms}</TableCell>
            <TableCell>{device.attributes?.channels.irms}</TableCell>
            <TableCell>{device.attributes?.channels.power}</TableCell>
            <TableCell>{device.attributes?.channels.energy}</TableCell>

            <TableCell>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/Ade/${device._id}`}
              >
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to={`/device/${device._id}`}
              >
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(device._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
