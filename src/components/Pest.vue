<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" class="myform">
      <el-form-item label="害虫名">
        <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="form.input1"
                class="myinput"
        ></el-input>
      </el-form-item>
      <el-form-item label="寄主">
        <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="form.input2"
                class="myinput"
        ></el-input>
      </el-form-item>
      <el-form-item class="myBtn">
        <el-button type="primary" icon="el-icon-plus" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <h1>虫害一览</h1>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="host" label="宿主" width="180"></el-table-column>
      <el-table-column prop="harm" label="主要危害"></el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 15, 20, 25]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    ></el-pagination>

    <br />
    <el-button type="primary" icon="el-icon-plus" @click="showAdd">添加新虫害</el-button>
    <el-button type="primary" icon="el-icon-info">查看详细信息</el-button>

    <AddPest :setVis="setAddVis"></AddPest>


  </div>
</template>

<script>
import axios from 'axios'
import AddPest from './AddPest.vue'

export default {
  components:{
    AddPest
  },
  data() {
    return {
      pageSize:5,
      total:0,
      currentPage: 1,
      form: {
        input1: "",
        input2: ""
      },
      tableData: [],
      setAddVis:true
    };
  },
  methods: {
      async showData() {
      console.log("========发出请求");
      let response = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: "/forest_sys/showPest",
        method: "post",
        params:{
          curPage:this.currentPage,
          pageSize:this.pageSize
        }
      });
      this.total=response.data.total
      this.pageSize=response.data.pageSize
      this.tableData = response.data.list
    //   this.pages.isLastPage=response.data.isLastPage;
      console.log(response.data)
    },
    showAdd(){
      
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.showData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.showData();
    }
  },
  mounted:function(){
      this.showData()
      // this.$on("showTable",this.showData())

  }
};
</script>

<style>
.myform {
  margin-left: auto;
  margin-bottom: auto;
  padding: 10px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.myinput {
  width: 150px;
}
</style>