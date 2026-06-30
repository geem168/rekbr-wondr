// src/services/transaksi.service.js
import api from "./api";

export const getAllTransactions = async ({
  page,
  limit,
  search,
  status,
  fundReleaseStatus,
  createdFrom,
  createdTo,
}) => {
  const params = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status }),
    ...(fundReleaseStatus && { fundReleaseStatus }),
    ...(createdFrom && { createdFrom }),
    ...(createdTo && { createdTo }),
  };

  const res = await api.get("/admin/transactions", { params });
  return res.data;
};

export const getTransactionById = async (transactionId) => {
  const res = await api.get(`/admin/transactions/${transactionId}`);
  return res.data;
};

export const postFundRelease = async (transactionId, action) => {
  const res = await api.post(
    `/admin/transactions/${transactionId}/fund-release/${action}`
  );
  return res.data;
};
