<template>
    <el-dialog
            title="提示"
            :visible.sync="detailVisble"
            width="60%"
            :before-close="handleClose">

        <div style="width: 50%">
            <p>名称：{{selectedDetail.name}}</p>
            <br>
            <p>病原：{{selectedDetail.cause}}</p><br>
            <p>发病症状：{{selectedDetail.symptom}}</p><br>
            <p>发病规律：{{selectedDetail.pattern}}</p><br>
            <p>主要危害：{{selectedDetail.harm}}</p><br>
            <p>防治措施：{{selectedDetail.measure}}</p><br>
            <p>图片：</p>
            <el-image
                    style="width: 100px; height: 100px"
                    :src="'/forest_sys'+selectedDetail.img"
            ></el-image>
            <br>

        </div>

        <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose()">返回</el-button>

  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "DiseaseDetail",
        props:['selectedDetail','detailVisble'],
        data() {
            return {

            };
        },
        methods: {
            handleClose() {
                this.$emit("closeDetail")
            }
        }
    };
</script>

<style scoped>

</style>