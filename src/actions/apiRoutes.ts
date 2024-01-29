export const apiRoutes = {
  auth: {
    signIn: "/Auth/login",
    signUp: "/Auth/register",
    logOut: "/Auth/logout",
  },
  account: {
    profile: "/Account/profile",
    secretKey: "/Account/credentials",
    changePassword: "/Account/change-password"
  },
  system: {
    users: "/System/users",
    userStorage: "/System/user-storage",
    storageUsage: "/System/storage-usage",
    registeration: "/System/registration"
  }
};
