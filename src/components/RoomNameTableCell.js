import { useQuery } from "react-query";
import { getRoomById } from "../api";
import { TableCell } from "@mui/material";
export default function RoomNameTableCell({ roomId }) {
  const { data: room } = useQuery(["roomName", roomId], () =>
    getRoomById(roomId)
  );

  return <TableCell>{room?.name || "No Room"}</TableCell>;
}
