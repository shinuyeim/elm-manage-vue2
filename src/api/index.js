import fetch from './fetch'

/**
 * 管理员列表
 */

export const getAdminList = parameters => fetch('/admins', parameters);

export const deleteAdminById = function (id) {
    const url='/admins/'+id;
    return fetch(url,{},'DELETE');
};