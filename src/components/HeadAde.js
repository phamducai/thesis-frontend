// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "react-query";

// import { Link } from "react-router-dom";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Button,
//   ListItemIcon,
// } from "@mui/material";

// import VisibilityIcon from "@mui/icons-material/Visibility";

// import { getDeviceById, deleteDeviceById } from "../api";

// export default function HeadAde() {
//   const deviceId = "6278c48a12ccdde504ae8f3e";
//   const { data: devices } = useQuery(
//     "RelayAdes",
//     () => getDeviceById(deviceId, "RelayAdes"),
//     { initialData: [] }
//   );

//   const queryClient = useQueryClient();
//   const mutation = useMutation(deleteDeviceById, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("RelayAdes");
//     },
//   });

//   function handleDelete(deviceId) {
//     mutation.mutate(deviceId);
//   }

//   return (
//     <Table>
//       <TableBody>
//         {devices.map((device, indexx) => (
//           <TableRow key={indexx}>
//             <TableCell>{device.name}</TableCell>
//             <TableCell>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 component={Link}
//                 to={`/Ade/${device._id}`}
//               >
//                 <ListItemIcon>
//                   <VisibilityIcon />
//                 </ListItemIcon>
//               </Button>
//               <Button
//                 color="secondary"
//                 variant="contained"
//                 component={Link}
//                 to={`/device/${device._id}`}
//               >
//                 Edit
//               </Button>
//               <Button
//                 color="error"
//                 variant="contained"
//                 onClick={() => handleDelete(device._id)}
//               >
//                 Delete
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
