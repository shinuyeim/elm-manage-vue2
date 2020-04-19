import fetchWrapper from "./fetchWrapper";

/**
 * 管理员列表
 */

export const getAdminList = (querys) => {
    const url = "/admins";
    return fetchWrapper(url, { querys });
};

export const deleteAdminById = (id) => {
    const url = "/admins/" + id;
    return fetchWrapper(url, { method: "DELETE" });
};
