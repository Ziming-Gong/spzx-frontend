import request from '@/utils/request'

const bast_api = '/admin/system/sysUser'

// 用户列表
export const GetSysUserListByPage = (current, limit, queryDto) => {
  return request({
    url: `${bast_api}/findByPage/${current}/${limit}`, //接口路径
    method: 'get', //提交方式
    params: queryDto, //其他参数
  })
}

// 用户添加
export const SaveSysUser = sysUser => {
  return request({
    url: `${bast_api}/saveSysUser`, //接口路径
    method: 'post', //提交方式
    data: sysUser, //其他参数
  })
}

//用户修改
export const UpdateSysUser = sysUser => {
  return request({
    url: `${bast_api}/updateSysUser`, //接口路径
    method: 'put', //提交方式
    data: sysUser, //其他参数
  })
}

//用户删除
export const DeleteSysUser = userId => {
  return request({
    url: `${bast_api}/deleteById/${userId}`, //接口路径
    method: 'delete', //提交方式
  })
}

// 给用户分配角色请求
export const DoAssignRoleToUser = assignRoleVo => {
  return request({
    url: '/admin/system/sysUser/doAssign',
    method: 'post',
    data: assignRoleVo,
  })
}
