import { ProjectUser } from "@/api/user/types";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { ORGANIZATION_ROLES_COPY } from "@/const/organization-roles-copy";
import { PROJECT_ROLES_COPY } from "@/const/project-roles-copy";
import { OrganizationRole, ProjectRole } from "@/types/enums";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type TableData = Pick<
  ProjectUser,
  "email" | "firstName" | "lastName" | "organizationRole" | "projectRole"
>;

export type ProjectMembersTableProps = Omit<
  DataTableProps<TableData>,
  "columns"
>;

export const ProjectMembersTable = (props: ProjectMembersTableProps) => {
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
        accessorKey: "organizationRole",
        header: () => "Organization Role",
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
      {
        accessorKey: "projectRole",
        header: () => "Project Role",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.projectRole !== ProjectRole.OWNER
                ? "secondary"
                : undefined
            }
          >
            {PROJECT_ROLES_COPY[row.original.projectRole]}
          </Badge>
        ),
      },
    ],
    []
  );

  return <DataTable {...rest} columns={columns} />;
};
