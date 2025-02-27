import { OrganizationMembersTable } from "@/components/modules/organization/organization-members-table";
import { Button } from "@/components/ui/button";
import { PaginationWidget } from "@/components/ui/pagination-widget";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationUsersQuery } from "@/hooks/tanstack/query/user/organization-users";
import { ApplicationPageParams, ApplicationUrls } from "@/libs/router-dom";
import { Link, useParams } from "react-router-dom";

const MembersPage = () => {
  const params = useParams();
  const organizationId = params[ApplicationPageParams.organizationId] as string;
  const { data: users, isLoading: isUsersLoading } = useOrganizationUsersQuery({
    organizationId,
  });

  return (
    <main className="container py-10">
      <header className="flex items-center justify-between flex-wrap">
        <div>
          <h1 className="font-bold text-2xl">Organization members</h1>
          <p>Here you can find all members of the organization</p>
        </div>
        <Button size={"sm"} asChild>
          <Link
            to={ApplicationUrls.application.organization.invites(
              organizationId
            )}
          >
            Invite new member
          </Link>
        </Button>
      </header>

      {!isUsersLoading && (
        <section className="mt-10">
          <OrganizationMembersTable data={users?.users || []} />
          <PaginationWidget
            onPageChange={() => {}}
            page={users?.meta.page || 1}
            totalPages={users?.meta.totalPages || 1}
            className="mt-10"
          />
        </section>
      )}

      {isUsersLoading && (
        <section className="mt-10">
          <Skeleton className="h-96" />
          <Skeleton className="mt-2 h-10" />
        </section>
      )}
    </main>
  );
};

export default MembersPage;
