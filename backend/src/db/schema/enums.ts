import { pgEnum } from "drizzle-orm/pg-core";

/* Content */
export const announcementVisibilityEnum = pgEnum(
  "announcement_visibility",
  ["PUBLIC", "MEMBERS"]
);

export const eventTypeEnum = pgEnum(
  "event_type",
  ["SERVICE", "MEETING", "CONFERENCE", "OTHER"]
);

/* Accounting */
export const accountTypeEnum = pgEnum(
  "account_type",
  ["ASSET", "LIABILITY", "INCOME", "EXPENSE", "EQUITY"]
);

/* Payments */
export const paymentProviderEnum = pgEnum(
  "payment_provider",
  ["MPESA", "BANK", "OTHER"]
);

export const paymentStatusEnum = pgEnum(
  "payment_status",
  ["PENDING", "SUCCESS", "FAILED"]
);

export const sermonStatusEnum = pgEnum("sermon_status", [
  "DRAFT",
  "PENDING_APPROVAL",
  "PUBLISHED",
]);

export const announcementStatusEnum = pgEnum(
  "announcement_status",
  ["DRAFT", "PUBLISHED"]
);