import { UserRole } from '@prisma/client';

export type AccessTokenPayload = {
  sub: {
    userId: string;
    email: string;
    role: UserRole;
  };
};

export type RefreshTokenPayload = {
  sub: {
    userId: string;
    email: string;
    role: UserRole;
  };
};

export type OrganizationInviteTokenPayload = {
  sub: {
    inviteId: string;
    organizationId: string;
  };
};
