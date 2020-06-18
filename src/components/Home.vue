<template>
    <div>
        <el-container>
            <el-aside width="240px" style="background-color: rgb(238, 241, 246)">
                <el-menu
                        :router="true"
                        :default-active="$route.path"
                        :default-openeds="['1','4-1']"
                >
                    <!-- 上面 router激活，vue-router功能 index=to -->
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-folder-opened"></i>森林病虫害防治系统</template>
                        <el-submenu index="1-1" :style="zl">
                            <template slot="title"><i class="el-icon-folder"></i>资料管理</template>
                            <el-menu-item index="/Pest"><i class="el-icon-document-copy"></i>虫害一览</el-menu-item>
                            <el-menu-item index="1-1-2"><i class="el-icon-document-copy"></i>病害一览</el-menu-item>
                            <el-menu-item index="1-1-2"><i class="el-icon-document-copy"></i>鼠害一览</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-1" :style="zq">
                            <template slot="title"><i class="el-icon-folder"></i>灾情防治</template>
                            <el-menu-item index="/Area"><i class="el-icon-document-copy"></i>区域一览</el-menu-item>
                            <el-menu-item index="/Classes"><i class="el-icon-document-copy"></i>小班管理</el-menu-item>
                            <el-menu-item index="/Event"><i class="el-icon-document-copy"></i>事件记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3-1" :style="zj">
                            <template slot="title"><i class="el-icon-folder"></i>专家会商</template>
                            <el-menu-item index="/Experts"><i class="el-icon-document-copy"></i>专家一览</el-menu-item>
                            <el-menu-item index="3-1-2"><i class="el-icon-document-copy"></i>会商灾情</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4-1" :style="kf">
                            <template slot="title"><i class="el-icon-folder"></i>药剂机械出库管理</template>
                            <el-menu-item index="/Deliveryrecord"><i class="el-icon-document-copy"></i>药剂管理
                            </el-menu-item>
                            <el-menu-item index="/Management"><i class="el-icon-document-copy"></i>出库管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5-1" :style="xt" >
                            <template slot="title"><i class="el-icon-folder"></i>系统信息</template>
                            <el-menu-item index="/user"><i class="el-icon-document-copy"></i>用户管理</el-menu-item>
                            <el-menu-item index="5-1-2"><i class="el-icon-document-copy"></i>日志一览</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header>森林病虫害防治系统</el-header>
                <el-main>
                    <!--路由视图-->
                    <router-view></router-view>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                zl: "display: none",
                xt: "display: none",
                zq: "display: none",
                kf: "display: none",
                zj:"display: none",
                usergrade:''
            }
        },
        name: "home",
        async beforeRouteEnter (to, from, next) {

            let response = await axios({
                url: '/forest_sys/getsession',
                method: 'get'
            });
            // console.log(response.data)
            // this.usergrade = response.data.usergrade
            // console.log(this.usergrade)
            if(response.data){
                next(vm=>{
                    console.log(this.usergrade+"aa "+vm)

                    this.usergrade = response.data.usergrade
                })
            }else {
                next('/login')
            }

        },

        methods: {
            async removesession() {

                await axios({
                    url: '/forest_sys/resession',
                    method: 'get'
                });
                this.$router.push('/login')
            }

        },
        mounted: function () {

            let usergrade = "超级管理员";
            console.log(usergrade)
            console.log("aaa")

            if (usergrade === "资料管理员") {
                this.zl = "display: block"
            } else if (usergrade === "灾情管理员") {
                this.zq = "display: block"
            } else if (usergrade === "库房管理员") {
                this.kf = "display: block"
            } else if (usergrade === "专家管理员") {
                this.zj = "display: block"
            } else if (usergrade === "超级管理员") {
                this.xt = "display: block",
                this.zj = "display: block",
                this.kf = "display: block",
                this.zq = "display: block",
                this.zl = "display: block"
            }

        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #87b894;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .el-container {
        height: 721px;
    }

    .el-footer {
        background-color: #4c675c;
    }

    .el-header {
        text-align: center;
        font-weight: bold;
        color: #3f6111;
        font-size: 20px;
    }
</style>