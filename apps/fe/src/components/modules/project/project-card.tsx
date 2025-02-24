import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserData } from "@/components/ui/user-data";
import { ApplicationUrls } from "@/libs/router-dom";
import { ProjectEntity } from "@/types/entity";
import { cn } from "@/utils/shadcn";
import { ArrowRight, Users } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

export type ProjectCardProps = ComponentPropsWithoutRef<"div"> & {
  project: ProjectEntity;
  organizationId: string;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { project, organizationId, className, ...rest } = props;

  return (
    <Card {...rest} className={cn("py-4 gap-4", className)}>
      <CardHeader className="px-4">
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 mt-auto">
        <UserData
          email={project.owner.email}
          firstName={project.owner.firstName}
          lastName={project.owner.lastName}
        />
      </CardContent>
      <CardFooter className="px-4">
        <p>
          {project.membersCount}
          <Users className="ml-2 inline size-5" />
        </p>
        <Button asChild size="sm" variant={"ghost"} className="ml-auto">
          <Link
            to={ApplicationUrls.application.organization.project.index(
              project.id,
              organizationId
            )}
          >
            Open <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
