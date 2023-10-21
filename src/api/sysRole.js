import request from '@/utils/request'

const bast_api = '/admin/system/sysRole'

// 角色的列表接口
export const GetSysRoleListByPage = (current, limit, queryDto) => {
  return request({
    url: `${bast_api}/findByPage/${current}/${limit}`, //接口路径
    method: 'post', //提交方式
    //如果接口加了@requestBody，前段 -> data:名称，以json格式传输
    //接口没有注解，前段 params: 名称
    data: queryDto, //其他参数
  })
}

//角色添加接口
export const SaveSysRole = sysRole => {
  return request({
    url: `${bast_api}/saveSysRole`, //接口路径
    method: 'post', //提交方式
    data: sysRole, //其他参数
  })
}

//角色修改接口
export const UpdateSysRole = sysRole => {
  return request({
    url: `${bast_api}/updateSysRole`, //接口路径
    method: 'put', //提交方式
    data: sysRole, //其他参数
  })
}

//角色删除接口
export const DeleteSysRole = roleId => {
  return request({
    url: `${bast_api}/deleteByID/${roleId}`, //接口路径
    method: 'delete', //提交方式
  })
}
// 查询所有的角色数据
export const GetAllRoleList = () => {
  return request({
    url: '/admin/system/sysRole/findAllRoles',
    method: 'get',
  })
}
