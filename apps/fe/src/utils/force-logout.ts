import { TokensService } from "@/services/tokens";

export const forceLogout = (reload = true) => {
  TokensService.clearTokens();

  if (reload) window.location.reload();
};
