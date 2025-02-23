import { CardsList } from "@/components/modules/common/cards-list";
import { OrganizationCard } from "@/components/modules/organization/organization-card";
import { Button } from "@/components/ui/button";
import { CreateOrganizationWrapper } from "@/components/wrappers/create-organization";
import { useOrganizationsListQuery } from "@/hooks/tanstack/query/organization/list";

const OrganizationsPage = () => {
  const { data: organizationsData, isLoading: isOrganizationsDataLoading } =
    useOrganizationsListQuery({});

  return (
    <main className="container mx-auto py-10">
      <header className="flex items-center gap-3 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Organizations</h1>
          <p className="mt-2">Here you can found all organizations</p>
        </div>
        <CreateOrganizationWrapper>
          <Button size="sm">Create organization</Button>
        </CreateOrganizationWrapper>
      </header>

      <section className="mt-10">
        <CardsList
          isLoading={isOrganizationsDataLoading}
          emptyState={
            <div className="text-center">
              <h2 className="text-xl text-bold">No organizations found</h2>
              <CreateOrganizationWrapper>
                <Button size={"sm"} className="mt-5">
                  Create new organization
                </Button>
              </CreateOrganizationWrapper>
            </div>
          }
          items={organizationsData?.organizations || []}
          render={(organization) => (
            <OrganizationCard
              id={organization.id}
              name={organization.name}
              membersCount={organization.membersCount}
              owner={organization.owner}
            />
          )}
        />
      </section>
    </main>
  );
};

export default OrganizationsPage;
