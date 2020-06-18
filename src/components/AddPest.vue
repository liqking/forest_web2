<template>
  <div>
    <el-dialog title="添加新虫害" :visible.sync="setVis" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="害虫名">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddPest",
  props:["setVis"],
  data() {
    return {
    //   dialogVisible: this.props.setVis
    }
  },
  methods: {
      handleClose(done) {
        console.log(done)
        done()
      }
  }
}
</script>

<style>
</style>