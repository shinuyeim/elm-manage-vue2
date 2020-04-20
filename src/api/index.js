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

export const getMerchantList = (querys) => {
    const url = "/v1/merchants";
    return fetchWrapper(url, { querys });
};

export const deleteMerchantById = (id) => {
    const url = "/v1/merchants/" + id;
    return fetchWrapper(url, { method: "DELETE" });
};