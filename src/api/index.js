import fetchWrapper from "./fetchWrapper";

/**
 * 管理员
 */

export const adminLogin = (body)=>{
    const url = "/admins/login";
    return fetchWrapper(url,{method:"POST", body})
}

export const getAdminList = (querys) => {
    const url = "/admins";
    return fetchWrapper(url, { querys });
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
