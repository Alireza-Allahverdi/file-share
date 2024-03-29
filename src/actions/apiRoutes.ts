export const apiRoutes = {
  auth: {
    signIn: "/Auth/login",
    signUp: "/Auth/register",
    logOut: "/Auth/logout",
  },
  account: {
    profile: "/Account/profile",
    secretKey: "/Account/credentials",
    changePassword: "/Account/change-password",
  },
  system: {
    users: "/System/users",
    userStorage: "/System/user-storage",
    storageUsage: "/System/storage-usage",
    registeration: "/System/registration",
  },
  items: {
    storageUsage: "/storage-usage",
    newFolder: "/folders",
    foldersRoot: "/folders/root",
    foldersId: (id: string) => `/folders/${id}`,
    shared: "/shared",
    sharedId: (id: string) => `/shared/${id}`,
    favorites: "/favorites",
    itemsInfo: (id: string) => `/items/${id}/info`,
    itemsPath: (id: string) => `/items/${id}/full-path`,
    itemsFavorite: (id: string) => `/items/${id}/favorite`,
    itemsCustomize: (id: string) => `/items/${id}/customize`,
    uploadFiles: "/files",
    fileDownload: (id: string) => `/files/${id}/download`,
    fileMove: (id: string) => `/files/${id}/move`,
    shareUser: "/files/{id}/share/user",
    shareCustom: "/files/{id}/share/custom",
    deleteFile: (id: string) => `/files/${id}`,
    deleteFolder: (id: string) => `/folders/${id}`
  },
};
