import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { DEFAULT_DATE_FORMAT } from "@/const/date-format";
import { INVITE_STATUSES_COPY } from "@/const/invite-statuses-copy";
import { ORGANIZATION_ROLES_COPY } from "@/const/organization-roles-copy";
import { InviteStatus, OrganizationRole } from "@/types/enums";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";

type TableData = {
  id: string;
  status: InviteStatus;
  name: string;
  role: OrganizationRole;
  createdAt: string;
  decideAt: string | null;
};

export type OrganizationInvitesTableProps = Omit<
  DataTableProps<TableData>,
  "columns"
>;

export const OrganizationInvitesTable = (
  props: OrganizationInvitesTableProps
) => {
  const { ...rest } = props;

  const columns = useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: "createdAt",
        header: () => "Invite date",
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format(DEFAULT_DATE_FORMAT),
      },
      {
        accessorKey: "name",
        header: () => "Name",
        cell: ({ row }) => row.original.name,
      },
      {
        accessorKey: "role",
        header: () => "Role",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.role !== OrganizationRole.OWNER
                ? "secondary"
                : undefined
            }
          >
            {ORGANIZATION_ROLES_COPY[row.original.role]}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Badge
              variant={
                [InviteStatus.ADMIN_REJECT, InviteStatus.USER_REJECT].includes(
                  row.original.status
                )
                  ? "destructive"
                  : row.original.status === InviteStatus.USER_ACCEPT
                    ? "secondary"
                    : undefined
              }
            >
              {INVITE_STATUSES_COPY[row.original.status]}
            </Badge>
            {row.original.decideAt &&
              dayjs(row.original.decideAt).format(DEFAULT_DATE_FORMAT)}
          </div>
        ),
      },
    ],
    []
  );

  return <DataTable {...rest} columns={columns} />;
};
