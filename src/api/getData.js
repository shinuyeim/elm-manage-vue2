import fetch from './fetch'

/**
 * 管理员列表
 */

export const getAdminList = parameters => fetch('/admin/list', parameters);