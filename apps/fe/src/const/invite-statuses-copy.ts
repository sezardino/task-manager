import { InviteStatus } from "@/types/enums";

export const INVITE_STATUSES_COPY: Record<InviteStatus, string> = {
  ADMIN_REJECT: "Rejected by admin",
  PENDING: "Pending",
  USER_ACCEPT: "Accepted",
  USER_REJECT: "Rejected",
};
