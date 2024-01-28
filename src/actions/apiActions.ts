import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { ProfileResponse } from "../pages/opt/account/Account";

export const logInReq = async (data: {
  username: string;
  password: string;
}) => {
  const res = await axios.post(apiRoutes.auth.signIn, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const signUp = async (data: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}) => {
  const res = await axios.post(apiRoutes.auth.signUp, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const fetchAccount = async () => {
  const res = await axios.get(apiRoutes.account.profile, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const updateAccount = async (data: ProfileResponse) => {
  const res = await axios.put(apiRoutes.account.profile, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const getRegisteration = async () => {
  const res = await axios.get(apiRoutes.system.registeration, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const changeRegisteration = async (status: boolean) => {
  const res = await axios.put(
    apiRoutes.system.registeration,
    { newStatus: status },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res;
};

export const getUserStorage = async () => {
  const res = await axios.get(apiRoutes.system.userStorage, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const updateUserStorage = async (size: number) => {
  const res = await axios.put(
    apiRoutes.system.userStorage,
    { newSize: size * 1000000000 },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res;
};

export const getStorageUsage = async () => {
  const res = await axios.get(apiRoutes.system.storageUsage, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};
