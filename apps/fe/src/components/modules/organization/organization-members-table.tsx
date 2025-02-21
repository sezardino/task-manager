import { UserRole } from "@/api/user/types";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { USER_ROLES_COPY } from "@/const/user-roles-copy";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type TableData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type OrganizationMembersTableProps = Omit<
  DataTableProps<TableData>,
  "columns"
>;

export const OrganizationMembersTable = (
  props: OrganizationMembersTableProps
) => {
  const { ...rest } = props;

  const columns = useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: "email",
        header: () => "Email",
        cell: ({ row }) => row.original.email,
      },
      {
        accessorKey: "fullName",
        header: () => "Full Name",
        cell: ({ row }) => {
          const original = row.original;

          if (!original.firstName && !original.lastName) return "-";

          const fullName = `${original.firstName} ${original.lastName}`;

          return fullName.trim();
        },
      },
      {
        accessorKey: "role",
        header: () => "Role",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.role !== UserRole.OWNER ? "secondary" : undefined
            }
          >
            {USER_ROLES_COPY[row.original.role]}
          </Badge>
        ),
      },
    ],
    []
  );

  return <DataTable {...rest} columns={columns} />;
};
