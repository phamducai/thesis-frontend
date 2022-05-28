import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api";
import LogoutIcon from "@mui/icons-material/Logout";
export default function LogoutButton() {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return (
    <Button
      color="secondary"
      onClick={() => {
        logoutMutation.mutate();
      }}
      variant="contained"
    >
      <LogoutIcon />
      Log out
    </Button>
  );
}
