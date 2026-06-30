import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/user/login", { email, password });
  return res.data.data;
};
