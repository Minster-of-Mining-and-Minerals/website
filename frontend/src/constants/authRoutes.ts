export const AUTH_GATEWAY = "/access/identity/gateway";

export const AUTH_LOGIN = AUTH_GATEWAY;

export const AUTH_FORGOT_PASSWORD = `${AUTH_GATEWAY}/forgot-password`;

export const AUTH_CHANGE_PASSWORD = `${AUTH_GATEWAY}/change-password`;

export const AUTH_GATEWAY_ROUTES = [
  AUTH_LOGIN,
  AUTH_FORGOT_PASSWORD,
] as const;

/** Legacy paths kept for redirects from bookmarks and old links. */
export const LEGACY_AUTH_REDIRECTS: Record<string, string> = {
  "/login": "/",
  "/forgot-password": AUTH_FORGOT_PASSWORD,
  "/change-password": AUTH_CHANGE_PASSWORD,
};
