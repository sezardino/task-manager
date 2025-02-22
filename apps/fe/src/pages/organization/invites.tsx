import { OrganizationInvitesTable } from "@/components/modules/organization/organization-invites-table";
import { Button } from "@/components/ui/button";
import { PaginationWidget } from "@/components/ui/pagination-widget";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInviteWrapper } from "@/components/wrappers/user-invite";
import { useOrganizationInvitesQuery } from "@/hooks/tanstack/query/organization-invites/organization-invites";
import { ApplicationPageParams } from "@/libs/router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

const InvitesPage = () => {
  const params = useParams();
  const organizationId = params[ApplicationPageParams.organizationId] as string;

  const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);

  const { data: invites, isLoading: isInvitesLoading } =
    useOrganizationInvitesQuery({
      organizationId,
    });

  return (
    <>
      <main className="container py-10">
        <header className="flex items-center justify-between flex-wrap">
          <div>
            <h1 className="font-bold text-2xl">Sended invites</h1>
            <p>Here you can find all invites that you send</p>
          </div>
          <Button size={"sm"} onClick={() => setIsInviteModalOpened(true)}>
            Invite new member
          </Button>
        </header>

        {!isInvitesLoading && (
          <section className="mt-10">
            <OrganizationInvitesTable data={invites?.invites || []} />
            <PaginationWidget
              onPageChange={() => {}}
              page={invites?.meta.page || 1}
              totalPages={invites?.meta.totalPages || 1}
              className="mt-10"
            />
          </section>
        )}

        {isInvitesLoading && (
          <section className="mt-10">
            <Skeleton className="h-96" />
            <Skeleton className="mt-2 h-10" />
          </section>
        )}
      </main>

      <UserInviteWrapper
        isOpen={isInviteModalOpened}
        onClose={() => setIsInviteModalOpened(false)}
        organizationId={organizationId}
      />
    </>
  );
};

export default InvitesPage;
