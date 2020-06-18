<template>
    <div>
        <template>
            <el-table
                    :data="expertsTalks.list"
                    style="width: 100%"
                   >
                <el-table-column
                        prop="name"
                        label="事件名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="areaBean.name"
                        label="发生位置">
                </el-table-column>
                <el-table-column
                        prop="prevention"
                        label="防治方案">
                </el-table-column>
                <el-table-column
                        width="200"
                        prop="state"
                        label="灾情状态">
                </el-table-column>
                <el-table-column label="操作" width="240" >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">会商
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template>
            <!--分页-->
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[2,4,6]"
                        :page-size="size"
                        layout="total, prev, pager, next,sizes"
                        :total="expertsTalks.total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    export default {
        name: "ExpertsTalks",
        data() {
            return {

                size:4
            }
        },
        computed: {
            ...mapState('Experts', ["expertsTalks"])
        },
        created(){
            this.setExpertsTalksPage({currentpage:1,pagesize:this.size});
        },
        methods:{
            ...mapActions('Experts',["setExpertsTalksPage"]),
            handleEdit(index, row) {
                /*会商*/

                console.log(row,index)

            },
            handleSizeChange(val) {
                this.size=val;
                this.setExperts({currentpage:1,pagesize:val});
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.setExperts({currentpage:val,pagesize:this.size});
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>

</style>