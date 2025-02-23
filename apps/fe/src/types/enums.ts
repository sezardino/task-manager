export enum InviteStatus {
  PENDING = "PENDING",
  USER_ACCEPT = "USER_ACCEPT",
  USER_REJECT = "USER_REJECT",
  ADMIN_REJECT = "ADMIN_REJECT",
}

export enum OrganizationRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum UserRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export enum ProjectRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
}

export enum TaskStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED",
}
