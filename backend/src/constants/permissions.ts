import { ROLES } from "./roles";

/**
 * Permission → allowed roles
 * This is POLICY, not data.
 */
export const PERMISSIONS = {
  /* Sermons */
  SERMON_CREATE: [ROLES.CLERGY, ROLES.PASTOR],
  SERMON_APPROVE: [ROLES.PASTOR],
  SERMON_PUBLISH: [ROLES.SECRETARY],

  /* Announcements */
  ANNOUNCEMENT_CREATE: [ROLES.SECRETARY],
  ANNOUNCEMENT_PUBLISH: [ROLES.ADMIN],

  /* Events */
  EVENT_CREATE: [ROLES.SECRETARY],
  EVENT_PUBLISH: [ROLES.SECRETARY],

  /* Accounting */
  JOURNAL_CREATE: [ROLES.TREASURER],
  JOURNAL_VIEW: [ROLES.TREASURER, ROLES.ADMIN],

  /* Admin */
  ROLE_ASSIGN: [ROLES.ADMIN],
} as const;

export type Permission = keyof typeof PERMISSIONS;
