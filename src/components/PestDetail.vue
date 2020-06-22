<template>
    <el-dialog
            title="提示"
            :visible.sync="detailVisble"
            width="60%"
            :before-close="handleClose">

        <div style="width: 50%">
            <p>名称：{{selectedDetail.name}}</p>
            <br>
            <p>繁殖：{{selectedDetail.breed}}</p><br>
            <p>寄主：{{selectedDetail.host}}</p><br>
            <p>天敌：{{selectedDetail.enemy}}</p><br>
            <p>主要危害：{{selectedDetail.harm}}</p><br>
            <p>防治措施：{{selectedDetail.measure}}</p><br>
            <p>幼虫图片：{{selectedDetail.larvaImg}}</p><br>
            <p>成虫图片：{{selectedDetail.adultImg}}</p><br>
        </div>

        <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose()">返回</el-button>

  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "PestDetail",
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