import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserData } from "@/components/ui/user-data";
import { ApplicationUrls } from "@/libs/router-dom";
import { OrganizationEntity, UserEntity } from "@/types/entity";
import { cn } from "@/utils/shadcn";
import { ArrowRight, Users } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

type PickerOrganizationType = Pick<
  OrganizationEntity,
  "id" | "name" | "membersCount"
>;

export type OrganizationCardProps = ComponentPropsWithoutRef<"div"> &
  PickerOrganizationType & {
    owner: Pick<UserEntity, "email" | "firstName" | "lastName">;
  };

export const OrganizationCard = (props: OrganizationCardProps) => {
  const { owner, membersCount, name, id, className, ...rest } = props;

  return (
    <Card {...rest} className={cn("py-4 gap-4", className)}>
      <CardHeader className="px-4">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <UserData
          email={owner.email}
          firstName={owner.firstName}
          lastName={owner.lastName}
        />
      </CardContent>
      <CardFooter className="px-4">
        <p>
          {membersCount}
          <Users className="ml-2 inline size-5" />
        </p>
        <Button asChild size="sm" variant={"ghost"} className="ml-auto">
          <Link to={ApplicationUrls.application.organization.index(id)}>
            Open <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
