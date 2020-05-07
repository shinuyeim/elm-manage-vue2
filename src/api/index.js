import fetchWrapper from "./fetchWrapper";
import elmManageStorage from "../utils/localStorage";

/**
 * 管理员
 */
//管理员登录
export const adminLogin = (body) => {
    const url = "/login";
    return fetchWrapper(url, { method: "POST", body });
};
//管理员注册
export const adminRegister = (body) => {
    const url = "/register/admin";
    return fetchWrapper(url, { method: "POST", body });
};
//获取管理员信息
export const getAdminProfile = () => {
    const url = "/admins/profile";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { headers });
};
//获取管理员列表
export const getAdminList = (querys) => {
    const url = "/admins";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};
//删除管理员
export const deleteAdminById = (id) => {
    const url = "/admins/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};

/**
 * 商家
 */

//获取商家列表
export const getMerchantList = (querys) => {
    const url = "/merchants";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};
//删除商家
export const deleteMerchantById = (id) => {
    const url = "/merchants/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};
//新增商家
export const createMerchant = (body) => {
    const url = "/register/merchant";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};
//更新商家信息
export const updataMerchantById = (id, body) => {
    const url = "/merchants/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

/**
 * 顾客
 */

// 获取顾客列表
export const getCustomerList = (querys) => {
    const url = "/customers";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

//删除顾客
export const deleteCustomerById = (id) => {
    const url = "/customers/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};
//新增顾客
export const createCustomer = (body) => {
    const url = "/register/customer";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};
//更新顾客信息
export const updataCustomerById = (id, body) => {
    const url = "/customers/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};