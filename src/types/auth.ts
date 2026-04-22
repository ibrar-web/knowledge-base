export type UserRole = "admin" | "user";

export type AuthUser = {
  name: string;
  role: UserRole;
};
