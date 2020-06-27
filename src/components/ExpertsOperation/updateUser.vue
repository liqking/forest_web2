<template>
    <div>
        <el-dialog title="修改信息" :visible.sync="openupdate" :before-close="dialogClose">
            <el-form :model="form">
                <!--右边-->
                <el-form-item label="姓名:" :label-width="formLabelWidth">
                    {{this.$store.state.thisname}}
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.userpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="form.newuserpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实名字:" :label-width="formLabelWidth">
                    {{this.$store.state.userrealname}}
                </el-form-item>
                <el-form-item label="用户等级" :label-width="formLabelWidth" :clearable="true">
                    <el-select v-model="thisusergrade" placeholder="用户权限" >
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
                <el-button @click="$emit('update:openupdate',false)">取 消</el-button>
                <el-button type="primary" @click="$emit('update:openupdate',false);add(form);">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import axios from "axios";
    import qs from "qs";

    export default {
        inject: ['submitForm'],
        name: "updateuser",
        props: ["openupdate"],
        computed: {
            ...mapState([ "thisusergrade"]),
            thisusergrade: {
                get() {
                    return this.$store.state.thisusergrade
                },
                set(v) {
                    // 使用vuex中的mutations中定义好的方法来改变
                    this.$store.commit('set_thisusergrade', v)
                }
            }
        },
        data() {

            return {
                dialogFormVisible: false,
                form: {
                    //用户名字
                    username:  this.$store.state.thisname,
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
                formLabelWidth: '80px'
            };
        },
        methods: {
            // ...mapActions('Experts', ["setExperts"]),
            async add(experts) {
                //修改
                if (this.userpwd == this.newuserpwd && this.form.userpwd!=''){
                    await axios({

                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: '/forest_sys/updateuser',
                    method: 'post',
                    data: qs.stringify({
                        username:this.$store.state.thisname,
                        userpwd:experts.userpwd,
                        newuserpwd:experts.newuserpwd,
                        usergrade:this.thisusergrade,
                        userrealname:this.$store.state.userrealname,
                    })
                });
                    this.submitForm();
                }else {
                    this.$message({
                        message: '密码格式不正确',
                        type: 'success'
                    });

                }
            },
            dialogClose() {
                this.$emit('update:openupdate', false)
            },

        }

    }
</script>

<style scoped>

</style>