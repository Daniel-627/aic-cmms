export const ROLES = {
  ADMIN: "ADMIN",
  PASTOR: "PASTOR",
  TREASURER: "TREASURER",
  SECRETARY: "SECRETARY",
  CLERGY: "CLERGY",
  MEMBER: "MEMBER",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
