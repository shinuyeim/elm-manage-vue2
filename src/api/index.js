import fetchWrapper from "./fetchWrapper";
import elmManageStorage from "@/utils/localStorage";

/**
 * 管理员
 */

export const adminLogin = (body) => {
    const url = "/admins/login";
    return fetchWrapper(url, { method: "POST", body });
};

export const adminRegister = (body) => {
    const url = "/admins/register";
    return fetchWrapper(url, { method: "POST", body });
};

export const getAdminProfile = () => {
    const url = "/admins/profile";

    const token = elmManageStorage.fetch("token");
    const headers = { Authorization: "Bearer " + token };
    return fetchWrapper(url, { headers });
};

export const getAdminList = (querys) => {
    const url = "/admins";

    const token = elmManageStorage.fetch("token");
    const headers = { Authorization: "Bearer " + token };
    return fetchWrapper(url, { querys, headers });
};

export const deleteAdminById = (id) => {
    const url = "/admins/" + id;
    return fetchWrapper(url, { method: "DELETE" });
};

/**
 * 商家
 */
export const getMerchantList = (querys) => {
    const url = "/v1/merchants";
    return fetchWrapper(url, { querys });
};

export const deleteMerchantById = (id) => {
    const url = "/v1/merchants/" + id;
    return fetchWrapper(url, { method: "DELETE" });
};

export const createMerchant = (body) => {
    const url = "/v1/merchants";
    return fetchWrapper(url, { method: "POST", body });
};

export const updataMerchantById = (id, body) => {
    const url = "/v1/merchants/" + id;
    return fetchWrapper(url, { method: "PUT", body });
};
