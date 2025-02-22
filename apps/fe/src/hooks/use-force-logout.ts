import { forceLogout } from "@/utils/force-logout";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useForceLogout = () => {
  const client = useQueryClient();

  return useCallback(() => {
    forceLogout();
    client.clear();
  }, [client]);
};
