<template>
    <div>
        <el-dialog title="添加用户" :visible.sync="openadd" :before-close="dialogClose">
            <el-form :model="form">
                <!--右边-->
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.userpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="form.newuserpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实名字" :label-width="formLabelWidth">
                    <el-input v-model="form.userrealname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户等级" :label-width="formLabelWidth">
                    <el-select v-model="form.usergrade" placeholder="用户权限">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="资料管理员" value="资料管理员"></el-option>
                        <el-option label="灾情管理员" value="灾情管理员"></el-option>
                        <el-option label="专家管理员" value="专家管理员"></el-option>
                        <el-option label="库房管理员" value="库房管理员"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--  dialogFormVisible = false-->
                <el-button @click="$emit('update:openadd',false)">取 消</el-button>
                <el-button type="primary" @click="$emit('update:openadd',false);add(form);">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import axios from "axios";
    import qs from "qs";

    export default {
        inject: ['submitForm'],
        name: "addUser",
        props: ["openadd"],
        computed: {
            ...mapState('Experts', ["pageNumber", "number", "search"])
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    //用户名字
                    username: '',
                    //密码
                    userpwd: '',
                    //新密码
                    newuserpwd: '',
                    //权限
                    usergrade: '',
                    //真名
                    userrealname: '',
                    delivery: false,
                },
                formLabelWidth: '80px',
            };
        },
        methods: {
            ...mapActions('Experts', ["setExperts"]),

            async add(experts) {
                // console.log(this.form.newuserpwd);
                //添加

                if (this.userpwd == this.newuserpwd && this.form.username!='') {
                    let response = await axios({
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        url: "/forest_sys/showuserinfo",
                        method: "post",
                        data: qs.stringify({
                            username: experts.username,
                        })

                    });
                    // console.log(!response.data);
                    if (!response.data) {
                        await axios({

                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            url: '/forest_sys/adduser',
                            method: 'post',
                            data: qs.stringify({
                                username: experts.username,
                                userpwd: experts.userpwd,
                                newuserpwd: experts.newuserpwd,
                                usergrade: experts.usergrade,
                                userrealname: experts.userrealname,
                            })

                        });
                        this.form.username = '',
                            this.form.userpwd = '',
                            this.form.newuserpwd = '',
                            this.form.usergrade = '',
                            this.form.userrealname = '',
                            this.submitForm();
                    } else {
                        this.$message({
                            message: '账号已存在',
                            type: 'success'
                        });
                    }
                }
            else {
                    this.$message({
                        message: '账号或者密码不正确',
                        type: 'success'
                    });
                }

            },
            dialogClose() {
                this.$emit('update:openadd', false)
            }
        }
    }
</script>

<style scoped>

</style>