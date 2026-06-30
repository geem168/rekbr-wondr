import api from "./api";

export const getListComplaint = async ({ type, status, limit, offset }) => {
    const res = await api.get("/admin/complaints",
        {
            params: {
                type,
                status,
                limit,
                offset
            }
        }
    );
    return res?.data?.data;
};

export const getComplaintDetail = async (id) => {
    const res = await api.get(`/admin/complaints/${id}`);
    return res?.data?.data;
}

export const resolveComplaintStatus = async (id, status) => {
    const res = await api.post(`/admin/complaints/${id}/${status}`);
    return res?.data?.data;
}

