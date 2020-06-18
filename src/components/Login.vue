<template>
    <div class="outdiv">

        <el-card class="box-card">
            <h1>森林病虫害防治系统</h1>
            <img src="../assets/1.jpg">
            <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "qs";
    export default {
        data() {
            return {
                ruleForm: {
                    username: "",
                    pass: ""
                },
                rules: {
                    username: [
                        { required: true, message: "账号不能为空" },
                        { validator: this.validateUsername }
                    ],
                    pass: [
                        { required: true, message: "密码不能为空" },
                        { pattern: /^.{3,}$/, message: "密码不能少于3位" }
                    ]
                }
            };
        },
        methods: {
            validateUsername(rule, value, callback) {
                if (/^.{1,20}$/.test(value)) {
                    callback();
                } else {
                    callback(new Error("账号不能少于2位，且数字字母下划线组成"));
                }
            },

            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let response = await axios({
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            url: "/forest_sys/login",
                            method: "post",
                            data: qs.stringify({
                                username: this.ruleForm.username,
                                pwd: this.ruleForm.pass
                            })
                        });
                         // console.log(response);
                        if (response.data) {
                            this.$alert("登录成功", "提示", {
                                callback:()=>{
                                    console.log(response.data.username+response.data.usergrade)
                                    this.$store.state.username = response.data.username
                                    this.$store.state.usergrade = response.data.usergrade
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            this.$alert("登录失败", "提示");
                            console.log("error");
                            return false;

                        }
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style scoped>

    .box-card {
        margin: 50px 300px;
        text-align: center;
    }
    .demo-ruleForm {
        width: 400px;
        margin: 0 auto;
        height: 100%;
    }

    img{
        margin: 20px 0 10px;
        width: 500px;
    }

</style>