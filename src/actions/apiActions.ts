import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { ProfileResponse } from "../pages/opt/account/Account";

export const logInReq = async (data: {
  username: string;
  password: string;
}) => {
  const res = await axios.post(apiRoutes.auth.signIn, data);
  return res;
};

export const signUp = async (data: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}) => {
  const res = await axios.post(apiRoutes.auth.signUp, data);
  return res;
};

export const fetchAccount = async () => {
  const res = await axios.get(apiRoutes.account.profile);
  return res;
};

export const logOut = async () => {
  const res = await axios.get(apiRoutes.auth.logOut);
  return res;
};

export const updateAccount = async (data: ProfileResponse) => {
  const res = await axios.put(apiRoutes.account.profile, data);
  return res;
};

export const getRegisteration = async () => {
  const res = await axios.get(apiRoutes.system.registeration);
  return res;
};

export const changeRegisteration = async (status: boolean) => {
  const res = await axios.put(apiRoutes.system.registeration, {
    newStatus: status,
  });
  return res;
};

export const getUserStorage = async () => {
  const res = await axios.get(apiRoutes.system.userStorage);
  return res;
};

export const updateUserStorage = async (size: number) => {
  const res = await axios.put(apiRoutes.system.userStorage, {
    newSize: size * 1000000000,
  });
  return res;
};

export const getStorageUsage = async () => {
  const res = await axios.get(apiRoutes.system.storageUsage);
  return res;
};

export const getCredentials = async () => {
  const res = await axios.get(apiRoutes.account.secretKey);
  return res;
};

export const sendKey = async (key: string) => {
  const res = await axios.put(apiRoutes.account.secretKey, { key });
  return res;
};

export const getUsers = async (data: { page: number; perPage: number }) => {
  const res = await axios.get(apiRoutes.system.users, {
    params: { page: data.page, perPage: data.perPage },
  });
  return res;
};

export const addNewUser = async (data: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}) => {
  const res = await axios.post(apiRoutes.system.users, data);
  return res;
};

export const chnageREstrictaion = async (id: string, newStatus: boolean) => {
  const res = await axios.put(`${apiRoutes.system.users}/${id}`, { newStatus });
  return res;
};
