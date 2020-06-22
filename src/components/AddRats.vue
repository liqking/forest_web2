<template>
    <div>
        <el-dialog title="添加新鼠害" :visible.sync="vis" width="50%" :before-close="dialogclose">
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="食物">
                    <el-input v-model="form.food" placeholder="请输入内容"></el-input>
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
                <!--上传图片-->
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture"
                        :limit="1"
                        :on-exceed="handleExceed">
                    <el-button size="small" type="success">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

                </el-upload>
                <br>

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

        name: "AddRats",
        props:["vis"],
        data() {
            return {

                fileList: [],

                form: {
                    name: '',
                    food: '',
                    breed: '',
                    measure: '',
                    harm: '',
                    enemy:'',
                    img:'',
                },


            }

        },

        methods: {
            dialogclose() {
                this.$emit("closeAdd")
            },
            async onSubmit() {

                let response = await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: '/forest_sys/addRats',
                    data: qs.stringify({
                        ratsName: this.form.name,
                        ratsFood: this.form.food,
                        ratsBreed: this.form.breed,
                        ratsEnemy: this.form.enemy,
                        ratsMeasure: this.form.measure,
                        ratsHarm: this.form.harm
                    })
                });

                if(response.data>0){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogclose();
                    this.showDiseaseData();
                }else{
                    this.$message.error('添加失败！');
                }
            },
            //以下是上传头像的方法
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(){
                alert("只能选择一张图片")
            }
        }
    }
</script>

<style scoped>

</style>