<template>
    <div id="main">
        <el-container>
            <el-header>
                <h1 style="text-align: center">森林病虫害防治系统</h1>
            </el-header>
            <el-main>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="账号" prop="user">
                        <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" plain @click="submitForm('ruleForm')">提交</el-button>
                        <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "mian",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
            };
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>
    #main {
        height: 650px;
        width: 100%;
        background-image: url("../assets/main.jpg");
        background-repeat: no-repeat;
        background-size: cover;

    }
    .el-main{
        margin: auto;
        margin-top: 150px;
        width: 400px;
        font-size: 20px;
    }
    button{
        margin-left: 40px;
    }
</style>