import { OrganizationUser } from "@/api/user/types";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { ORGANIZATION_ROLES_COPY } from "@/const/organization-roles-copy";
import { OrganizationRole } from "@/types/enums";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type TableData = Pick<
  OrganizationUser,
  "email" | "firstName" | "lastName" | "organizationRole"
>;

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
              row.original.organizationRole !== OrganizationRole.OWNER
                ? "secondary"
                : undefined
            }
          >
            {ORGANIZATION_ROLES_COPY[row.original.organizationRole]}
          </Badge>
        ),
      },
    ],
    []
  );

  return <DataTable {...rest} columns={columns} />;
};
