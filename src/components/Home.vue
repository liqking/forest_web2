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
                        <el-submenu index="1-1">
                            <template slot="title"><i class="el-icon-folder"></i>资料管理</template>
                            <el-menu-item index="1-1-1"><i class="el-icon-document-copy"></i>虫害一览</el-menu-item>
                            <el-menu-item index="1-1-2"><i class="el-icon-document-copy"></i>病害一览</el-menu-item>
                            <el-menu-item index="1-1-2"><i class="el-icon-document-copy"></i>鼠害一览</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-1">
                            <template slot="title"><i class="el-icon-folder"></i>灾情防治</template>
                            <el-menu-item index="2-1-1"><i class="el-icon-document-copy"></i>区域一览</el-menu-item>
                            <el-menu-item index="2-1-2"><i class="el-icon-document-copy"></i>小班管理</el-menu-item>
                            <el-menu-item index="2-1-2"><i class="el-icon-document-copy"></i>事件记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3-1">
                            <template slot="title"><i class="el-icon-folder"></i>专家会商</template>
                            <el-menu-item index="3-1-1"><i class="el-icon-document-copy"></i>专家一览</el-menu-item>
                            <el-menu-item index="3-1-2"><i class="el-icon-document-copy"></i>会商灾情</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4-1">
                            <template slot="title"><i class="el-icon-folder"></i>药剂机械出库管理</template>
                            <el-menu-item index="/Deliveryrecord"><i class="el-icon-document-copy"></i>药剂管理</el-menu-item>
                            <el-menu-item index="4-1-2"><i class="el-icon-document-copy"></i>出库管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5-1">
                            <template slot="title"><i class="el-icon-folder"></i>系统信息</template>
                            <el-menu-item index="5-1-1"><i class="el-icon-document-copy"></i>用户管理</el-menu-item>
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
    export default {
        name: "home",
        methods:{

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
    .el-container{
        height: 721px;
    }
    .el-footer{
        background-color: #4c675c;
    }
    .el-header{
        text-align: center;
        font-weight: bold;
        color: #3f6111;
        font-size: 20px;
    }
</style>