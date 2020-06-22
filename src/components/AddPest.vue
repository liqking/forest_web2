<template>
    <div>
        <el-dialog title="添加新虫害" :visible.sync="vis" width="50%" :before-close="dialogclose">
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
                <el-form-item label="害虫名">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="寄主">
                    <el-input v-model="form.host" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="繁殖">
                    <el-input v-model="form.breed" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="天敌">
                    <el-input v-model="form.enemy" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item label="防治措施">
                    <el-input type="textarea" v-model="form.measure" :rows="5"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="主要危害" style="margin-left: 18px">
                    <el-input type="textarea" v-model="form.harm" :rows="5"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="success" @click="onSubmit">确认</el-button>
            <el-button type="success" @click="dialogclose">取消</el-button>
        </el-dialog>

    </div>
</template>

<script>

    import axios from 'axios'
    import qs from "qs";

    export default {

        name: "AddPest",
        props:["vis"],
        data() {
            return {
                // dialogVisible:false,

                form: {
                    name: '',
                    host: '',
                    breed: '',
                    enemy: '',
                    measure: '',
                    harm: ''
                },


            }

        },

        methods: {
            dialogclose() {
                // this.setVis(false)
            },
            async onSubmit() {

                let response = await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: '/forest_sys/addPest',
                    data: qs.stringify({
                        pestName: this.form.name,
                        pestHost: this.form.host,
                        pestBreed: this.form.breed,
                        pestEnemy: this.form.enemy,
                        pestMeasure: this.form.measure,
                        pestHarm: this.form.harm
                    })
                });

                if(response.data>0){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogclose();
                    this.showPestData();
                }else{
                    this.$message.error('添加失败！');
                }
            }
        }
    }
</script>

<style>
</style>