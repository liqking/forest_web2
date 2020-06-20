
<template>
    <div>
        <el-dialog title="专家详情" :visible.sync="openShow" :before-close="dialogClose">
            <el-form :model="showExperts">
                <!--右边-->
                <div class="left1">
                    <el-form-item label="姓名:" :label-width="formLabelWidth">
                        {{showExperts.expertsName}}
                    </el-form-item>
                    <el-form-item label="出生日期:" :label-width="formLabelWidth">
                        {{showExperts.date}}

                    </el-form-item>
                    <el-form-item label="专长:" :label-width="formLabelWidth">
                        {{showExperts.specialties}}

                    </el-form-item>
                    <el-form-item label="电话:" :label-width="formLabelWidth">
                        {{showExperts.telephone}}

                    </el-form-item>
                    <el-form-item label="通讯地址:" :label-width="formLabelWidth">
                        {{showExperts.site}}

                    </el-form-item>
                    <el-form-item label="性别：" :label-width="formLabelWidth">
                        {{showExperts.sex}}
                    </el-form-item>

                </div>
                <!--左边-->
                <div class="right1">
                    <el-form-item label="照片:" :label-width="formLabelWidth">
                            <img v-if="showExperts.head" :src="showExperts.head" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-form-item>
                    <el-form-item label="职务:" :label-width="formLabelWidth">
                        {{showExperts.duty}}

                    </el-form-item>
                    <el-form-item label="工作单位:" :label-width="formLabelWidth">
                        {{showExperts.work}}

                    </el-form-item>
                    <el-form-item label="邮箱:" :label-width="formLabelWidth">
                        {{showExperts.mailbox}}

                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--  dialogFormVisible = false-->
                <el-button @click="$emit('update:openShow',false)">取 消</el-button>
                <el-button type="primary" @click="$emit('update:openShow',false);">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "showExperts",
        props:["openShow"],
        computed: {
            ...mapState('Experts', ["showExperts"])
        },
        data() {
            return {
                dialogFormVisible: false,

                formLabelWidth: '80px'
            };
        },
        methods: {

            dialogClose(){
                this.$emit('update:openShow',false)
            }

        }
    }
</script>

<style scoped>
    .left1{
        width: 50%;
        float: left;
    }
    .right1{
        width: 50%;
        float: right;
    }

    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
</style>