import { UserEntity } from "@/types/entity";
import { getAvatarFallback } from "@/utils/get-avatar-fallback";
import { cn } from "@/utils/shadcn";

import { ComponentPropsWithoutRef } from "react";
import { Avatar, AvatarFallback } from "./avatar";
import { TruncatedTypography } from "./typography";

type PickedUserProps = Pick<UserEntity, "email" | "firstName" | "lastName">;

export type UserDataProps = ComponentPropsWithoutRef<"div"> & PickedUserProps;

export const UserData = (props: UserDataProps) => {
  const { email, firstName, lastName, className, ...rest } = props;

  const fullName = `${firstName} ${lastName}`;
  const hasFullName = firstName?.trim().length;
  const fallback = hasFullName
    ? getAvatarFallback(fullName)
    : getAvatarFallback(email);

  return (
    <div {...rest} className={cn("flex items-center gap-2", className)}>
      <Avatar className="size-10">
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        {hasFullName && (
          <TruncatedTypography text={fullName} className="text-sm" />
        )}
        <TruncatedTypography text={email} className="text-sm" />
      </div>
    </div>
  );
};
