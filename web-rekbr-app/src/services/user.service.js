// src/services/user.service.js
import api from "./api";

export const getAllUsers = async ({
  page,
  limit,
  search,
  kycStatus,
  createdFrom,
  createdTo,
}) => {
  const params = {
    page,
    limit,
    ...(search && { search }),
    ...(kycStatus && { kycStatus }),
    ...(createdFrom && { createdFrom }),
    ...(createdTo && { createdTo }),
  };

  const res = await api.get("/admin/users", { params });
  return res.data;
};

export const getUserById = async (usersId) => {
  const res = await api.get(`/admin/users/${usersId}`);
  return res.data;
};