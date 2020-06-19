<template>
    <div>
        <el-dialog title="添加新虫害" :visible.sync="setAddPestVis" width="50%" :before-close="dialogclose">
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
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "AddPest",

        data() {
            return {
                // dialogVisible:false,
                form: {
                    name:'',
                    host:'',
                    breed: '',
                    enemy:'',
                    measure: '',
                    harm: ''
                },


            }

        },

        computed: {
            setAddPestVis: {
                set(visible) {
                    this.setVis(visible);
                },
                get() {
                    return this.$store.state.setAddPestVis
                }
            },
            ...mapState('Pest', ['setAddPestVis'])
        },
        methods: {
            ...mapMutations("Pest", ["setVis"]),
            dialogclose() {
                this.setVis(false)
            },
            onSubmit(){
                console.log("onsubmit!")
            }
        }
    }
</script>

<style>
</style>