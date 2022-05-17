import { TableCell } from "@mui/material";

import { useQuery } from "react-query";
import { getRoomById } from "../api";

export default function RoomNameTableCell({ roomId }) {
  const { data: room } = useQuery(["roomName", roomId], () =>
    getRoomById(roomId)
  );

  return <TableCell>{room?.name || "--"}</TableCell>;
}
