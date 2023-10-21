import { popScopeId } from 'vue'; import { computed } from 'vue'; import {
dataType } from 'element-plus/es/components/table-v2/src/common'; import {
GetSysRoleListByPage } from '@/api/sysRole';
<template>
  <div class="search-div">
    <!-- 搜索表单 -->
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="small">
      <el-form-item label="角色名称">
        <el-input
          v-model="queryDto.roleName"
          style="width: 100%"
          placeholder="角色名称"
        ></el-input>
      </el-form-item>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysRole">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>
    <!-- 添加按钮 -->
    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>
    <!-- 添加角色表单对话框 -->
    <el-dialog v-model="dialogVisible" title="添加或修改角色" width="30%">
      <el-form label-width="120px">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色Code">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--- 角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色code" width="180" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="280" #default="scope">
        <el-button type="primary" size="small" @click="editShow(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <!--分页条-->
    <el-pagination
      v-model:current-page="pageParams.page"
      v-model:page-size="pageParams.limit"
      :page-sizes="[10, 20, 50, 100]"
      @size-change="fetchData"
      @current-change="fetchData"
      layout="total, sizes, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  GetSysRoleListByPage,
  SaveSysRole,
  UpdateSysRole,
  DeleteSysRole,
} from '@/api/sysRole.js'
import { ElMessage, ElMessageBox } from 'element-plus'
///////////////角色删除
const deleteById = row => {
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code } = await DeleteSysRole(row.id)
    if (code === 200) {
      ElMessage.success('删除成功')
      pageParams.value.page = 1
      fetchData()
    }
  })
}

//////////////角色添加和修改
const roleForm = {
  id: '',
  roleName: '',
  roleCode: '',
}
const sysRole = ref(roleForm)
//true就是弹出框，false不弹出
const dialogVisible = ref(false)
//点击添加弹出方法
const addShow = () => {
  dialogVisible.value = true
}

const editShow = row => {
  sysRole.value = { ...row }
  dialogVisible.value = true
}

//添加submit
//如果包含ID值就进行修改操作，如果没有ID就做添加
const submit = async () => {
  if (!sysRole.value.id) {
    // 没有id值
    const { code } = await SaveSysRole(sysRole.value)

    if (code === 200) {
      //关闭弹框
      dialogVisible.value = false
      //提示信息
      ElMessage.success('success!')
      //刷新页面
      fetchData()
    }
  } else {
    const { code } = await UpdateSysRole(sysRole.value)
    if (code === 200) {
      dialogVisible.value = false
      ElMessage.success('update success!')
      fetchData()
    }
  }
}

//////////////角色列表
//1. 定义一些数据模型
//角色列表的数组
let list = ref([]) //角色列表
let total = ref(0)

//分页数据
const pageParamsForm = {
  page: 1, //当前页
  limit: 3,
}
const pageParams = ref(pageParamsForm)

const queryDto = ref({ roleName: '' }) // 条件封装的定义

//2. 钩子函数
onMounted(() => {
  fetchData()
})

//3. 操作方法： 列表方法和搜索方法
//列表方法： axios请求条用接口得到列表数据
const fetchData = async () => {
  const { data, code, message } = await GetSysRoleListByPage(
    pageParams.value.page,
    pageParams.value.limit,
    queryDto.value
  )
  list.value = data.list
  total.value = data.total
}
//搜索方法
const searchSysRole = () => {
  fetchData()
}
</script>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>
