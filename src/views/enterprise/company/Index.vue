<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.jobName" clearable size="small" placeholder="输入任务名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
      </div>
    </div>
    <!--Form表单-->
    <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" append-to-body width="730px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="id" prop="id">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="股票编码" prop="stockId">
          <el-input v-model="form.stockId" style="width: 80px;" />
        </el-form-item>
        <el-form-item label="股票名称" prop="stockName">
          <el-input v-model="form.stockName" style="width: 120px;" />
        </el-form-item>
        <el-form-item label="上市时间" prop="marketTime">
          <el-input v-model="form.marketTime" style="width: 30px;" />
        </el-form-item>
        <el-form-item label="行业分类" prop="industryCategory">
          <el-input v-model="form.industryCategory" style="width: 220px;" />
        </el-form-item>
        <el-form-item label="主营业务" prop="mainBusiness">
          <el-input v-model="form.mainBusiness" style="width: 220px;" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" />
      <el-table-column :show-overflow-tooltip="true" prop="stockId" label="股票编码" />
      <el-table-column :show-overflow-tooltip="true" prop="stockName" label="股票名称" />
      <el-table-column :show-overflow-tooltip="true" prop="marketTime" label="上市时间" />
      <el-table-column :show-overflow-tooltip="true" prop="industryCategory" label="行业分类" />
      <el-table-column :show-overflow-tooltip="true" prop="mainBusiness" label="主营业务" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudStock from '@/api/enterprise/stock'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, jobName: null, subTask: null, beanName: null, methodName: null, params: null, cronExpression: null, pauseAfterFailure: true, isPause: false, personInCharge: null, email: null, description: null }

export default {
  name: 'Company',
  components: { pagination },

  cruds() {
    return [
      CRUD({ title: '企业数据', url: '/api/eds/stock/queryList', crudMethod: { ...crudStock }})
    ]
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      delLoading: false,
      list: []

    }
  },
  created() {
    this.queryList()
  },
  methods: {
    // 查询单个
    queryOne(id) {
      crudStock.queryOne(id).then(res => {
        this.crud.notify('执行成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    // 查询列表
    queryList() {
      crudStock.queryList().then(res => {
        this.list = res.content
      }).catch(err => {
        console.log(err.response.data.message)
      })
    }
  }
}
</script>
