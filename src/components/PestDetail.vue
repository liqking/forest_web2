<template>
    <el-dialog
            title="提示"
            :visible.sync="detailVisble"
            width="60%"
            :before-close="handleClose">

        <div style="width: 50%;height: 100%;display: inline">
            <p>名称：{{selectedDetail.name}}</p>
            <br>
            <p>繁殖：{{selectedDetail.breed}}</p><br>
            <p>寄主：{{selectedDetail.host}}</p><br>
            <p>天敌：{{selectedDetail.enemy}}</p><br>
            <p>主要危害：{{selectedDetail.harm}}</p><br>
            <p>防治措施：{{selectedDetail.measure}}</p><br>
        </div>
        <div style="width: 50%;height: 100%;display: inline">
            <p>幼虫图片：</p>
            <el-image
                    style="width: 100px; height: 100px"
                    :src="'/forest_sys'+selectedDetail.larvaImg"
            ></el-image>

            <br>
            <p>成虫图片：</p>
            <el-image
                    style="width: 100px; height: 100px"
                    :src="'/forest_sys'+selectedDetail.adultImg"
            ></el-image><br>


            <span slot="footer" class="dialog-footer"></span>
    <el-button type="success" @click="handleClose()">返回</el-button>
        </div>
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