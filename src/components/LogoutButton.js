import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api";

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
      Log out
    </Button>
  );
}
