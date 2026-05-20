import { commandRegistry } from "./commandRegistry";

export const registerDefaultCommands = (router, logout) => {
  commandRegistry.register({
    id: "nav.home",
    label: "Go to Home",
    action: () => router.push("/"),
    group: "Navigation",
  });

  commandRegistry.register({
    id: "nav.dashboard",
    label: "Go to Dashboard",
    action: () => router.push("/dashboard"),
    group: "Navigation",
  });

  commandRegistry.register({
    id: "nav.settings",
    label: "Go to Settings",
    action: () => router.push("/settings"),
    group: "Navigation",
  });

  commandRegistry.register({
    id: "system.refresh",
    label: "Refresh Page",
    action: () => router.reload(),
    group: "System",
  });

  commandRegistry.register({
    id: "auth.logout",
    label: "Log out",
    action: logout,
    group: "Auth",
  });
};