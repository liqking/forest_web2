<template>
    <div>
        <!--出库-->

        <h1 id="title">药剂/机械出库管理</h1>
        <!--查询-->
        <el-form :model="form" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="日期范围">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="起始日期" v-model="form.startDate" value-format="yyyy-MM-dd"   style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: right">——</el-col>
                <el-col :span="8" style="margin-left: 12px">
                    <el-date-picker type="date" placeholder="结束日期" v-model="form.endDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="领用小班" style="margin-left: -140px">
                <el-input v-model="form.className"></el-input>
            </el-form-item>
            <el-button type="success" icon="el-icon-search" plain @click="query()">查询</el-button>
        </el-form>

        <!--查看出库信息-->
        <el-button type="success" icon="el-icon-search" @click="queryDeliveryInfo()" style="margin-left: 50px;margin-bottom: 10px">查看出库信息</el-button>
        <el-dialog title="查看出库信息" :visible.sync="dialogTableVisible" style="text-align: center">
            <div style="margin-bottom: 50px">
                <p class="titleSub">领用小班：<label>{{this.className}}</label></p>
                <p class="titleSub">出库人：<label>{{this.userName}}</label></p>
                <p class="titleSub">领用日期：<label>{{this.date}}</label></p>
            </div>
            <el-table :data="gridData">
                <el-table-column prop="name" label="物品名称" width="150"></el-table-column>
                <el-table-column property="type" label="类型" width="150"></el-table-column>
                <el-table-column property="genre" label="防治类型" width="150"></el-table-column>
                <el-table-column property="num" label="领用数量" width="150"></el-table-column>
            </el-table>
        </el-dialog>

        <!--添加出库信息-->
        <el-button type="success" icon="el-icon-edit" @click="addDeliveryinfo()" style="margin-left: 40px;">添加出库信息</el-button>
        <el-dialog title="添加出库信息" :visible.sync="outerVisible" style="text-align: center;" :before-close="nullDelivery">
            <!--外层-->
            <div style="height: 350px;width: 715px;text-align: left">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
                    <el-form-item label="领用小班" prop="name" :rules="[
                          { required: true, message: '请选择小班'}
                        ]">
                        <el-select v-model="formInline.name">
                            <el-option v-for="cls in formInline.data" :key="cls.name" :label="cls.name" :value="cls.classId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出库人">
                        <el-input type="text" v-model="this.username" disabled></el-input>
                    </el-form-item>
                    <el-button type="warning" style="margin-left: 50px" @click="outDelivery('formInline')">出 库</el-button>
                </el-form>
                <template>
                    <el-table
                            @row-click="tableClick2"
                            :cell-style="tableStyle2"
                            :row-class-name="tableRowClassName2"
                            :data="outTableData"
                            stripe
                            border
                            :row-style="{height:'10px'}"
                            style="width: 100%">
                        <el-table-column prop="name" label="物品名称" width="150"></el-table-column>
                        <el-table-column prop="type" label="类型" width="150"></el-table-column>
                        <el-table-column prop="genre" label="防治类型" width="150"></el-table-column>

                        <el-table-column prop="num" label="领用数量" >
                            <template slot-scope="scope">
                                <!-- 限制只能输入数字 和 数字最大值
                                     oninput="if(value>127)value=127"
                                    @input="changeNumInput"
                                    (/^((?!^[1-9]\d*$).)*/g,'')
                                    (/[^\d.]/g,'')
                                -->
                                <el-input
                                        onkeyup="this.value = this.value.replace(/^((?!^[1-9]\d*$).)*/g,'');"
                                        v-model="scope.row.num"
                                        @input="changeNumInput"
                                        class="input">
                                </el-input>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
            </div>
            <!--内层-->
            <el-dialog
                    width="65%"
                    :visible.sync="innerVisible"
                    title="添加物品"
                    append-to-body>
                <div style="border-top: darkslategray 1px solid;margin-top: -40px;height: 450px">
                    <!--查询-->
                    <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="75px" class="demo-ruleForm" style="margin-top: 20px">
                        <el-form-item label="药剂名称" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 150px"></el-input>
                        </el-form-item>
                        <el-form-item label="防治类型" prop="genre">
                            <el-select v-model="ruleForm.genre" style="width: 150px">
                                <el-option label="鼠害" value="1"></el-option>
                                <el-option label="虫害" value="2"></el-option>
                                <el-option label="病害" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类别" prop="type">
                            <el-select v-model="ruleForm.type" style="width: 150px">
                                <el-option label="药剂" value="1"></el-option>
                                <el-option label="器械" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="submitForm()">查询</el-button>
                            <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <!--内层表格-->
                    <el-table
                            ref="multipleTable"
                            :data="insideTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            height="290px"
                            @select="changeChoice"
                            @select-all="checkAll"
                            @selection-change="handleSelectionChange"
                            >
                        <!--@selection-change="handleSelectionChange"-->
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="物品名称" width="120"></el-table-column>
                        <el-table-column prop="type" label="类型" width="120"></el-table-column>
                        <el-table-column prop="genre" label="防治类型" width="120"></el-table-column>
                        <el-table-column prop="purpose" label="主要用途" show-overflow-tooltip></el-table-column>
                    </el-table>
                    <!--内层分页-->
                    <div class="block">
                        <el-pagination
                                @size-change="insideHandleSizeChange"
                                @current-change="insideHandleCurrentChange"
                                :current-page=insideCurrentPage
                                :page-sizes="[3, 5, 10]"
                                :page-size=insidePageSize
                                layout="total, sizes, prev, pager, next, jumper"
                                :total=insideTotalPage>
                        </el-pagination>
                    </div>
                    <div style="margin-top: 20px">
                        <el-button type="success" style="margin-left: 450px" @click="showGetEquipment">领取</el-button>
                    </div>
                </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addEquipments()">添加物品</el-button>
                <el-button type="info" @click="methodRemoveId()">移除物品</el-button>
                <el-button @click="nullDelivery">取 消</el-button>
                <!--<el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>-->
            </div>
        </el-dialog>


        <!--初始化-->
        <template>
            <el-table
                    :data="tableData"
                    @row-click="tableClick"
                    :cell-style="tableStyle"
                    :row-class-name="tableRowClassName"
                    style="width: 800px;height: 357px;left: 50px">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="classeName" label="领用小班" width="180"></el-table-column>
                <el-table-column prop="userName" label="出库人" width="180"></el-table-column>
            </el-table>
        </template>

        <!--主页面分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=currentPage
                    :page-sizes="[3, 5, 10]"
                    :page-size=pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=totalPage>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import{mapMutations,mapState} from'vuex';

    export default {
        name: "Management",
        data() {
            return {
                form: {
                    startDate: '',
                    endDate: '',
                    className:'',
                },
                tableData:[],
                currentPage :1,
                pageSize :3,
                totalPage :0,
                dialogFormVisible:false,
                gridData: [],   //出库信息
                dialogTableVisible:false,
                getIndex:"",
                getRowData:[],
                getIndex2:"",
                getRowData2:[],
                className:'',   //小班
                userName:'',    //出库人
                date:'', //日期
                outerVisible: false,
                innerVisible: false,
                formInline:{},
                outTableData:[],    //领用物品数据id
                insideTableData: [],
                //内层分页
                insideCurrentPage: 1,
                insidePageSize: 3,
                insideTotalPage: 0,
                ruleForm: {
                    name: '',
                    genre: '',
                    type: '',
                },
                // addList:[],
                removeIdOut:"",   //记录移出物品id
                SelectionChange:'',
                SelectTheLineItem:[],//记录当前显示选中物品的库存数量 和 下标
                verify:true,
            }
        },
        methods: {
            handleSizeChange(val) { //改变显示条数
                this.tableInit(this.currentPage, val)
            },
            handleCurrentChange(val) {  //改变页数
                this.tableInit(val, this.pageSize)
            },
            async query() {    //查询
                // console.log(this.form)
                let response = await axios({
                    url: '/forest_sys/deliveryrecordByCondition',
                    method: 'get',
                    params: {
                        startDate: this.form.startDate,
                        endDate: this.form.endDate,
                        className: this.form.className,
                        currentPage:this.currentPage,
                        pageSize:this.pageSize
                    }
                });
                this.tableData = this.formattingDate(response.data.list);
                this.currentPage = response.data.pageNum,
                this.pageSize = response.data.pageSize,
                this.totalPage= response.data.total
            },
            formattingDate(arr){   //格式化时间
                for (let i = 0; i < arr.length ; i++) {
                    arr[i].date = arr[i].date.substring(0,arr[i].date.indexOf(" "));
                }
                return arr;
            },
            async tableInit(currentPage = 1, pageSize = 3) {    //初始化表格
                let response = await axios({
                    url: '/forest_sys/DeliveryRecordInfo',
                    method: 'get',
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize
                    }
                });
                // console.log(response)
                this.tableData = this.formattingDate(response.data.list);
                this.currentPage = response.data.pageNum;
                this.pageSize = response.data.pageSize;
                this.totalPage= response.data.total

            },
            tableClick(row){    //表格点击得到行
                this.getIndex = row.index;
                this.getRowData = row;
            },
            tableStyle({rowIndex}){   //改变表格背景颜色
                if ((this.getIndex) === rowIndex ) {
                    return {
                        "background-color": "#aabda3"
                    };
                }
            },
            tableRowClassName2 ({row, rowIndex}) {
                row.index = rowIndex;
            },
            tableClick2(row){    //表格点击得到行

                this.removeIdOut = row.equipmentId;

                this.getIndex2 = row.index;
                this.getRowData2 = row;
            },
            tableStyle2({rowIndex}){   //改变表格背景颜色
                if ((this.getIndex2) === rowIndex ) {
                    return {
                        "background-color": "#ebcfb5"
                    };
                }
            },
            tableRowClassName ({row, rowIndex}) {
                row.index = rowIndex;
            },
            async queryDeliveryInfo() {    //查看出库信息
                // console.log( this.getIndex)  //选择第几行
                if (typeof this.getIndex == "string") {  //表示有选中行
                    this.$message({
                        showClose: true,
                        message: '请选择查看信息！',
                        type: 'error'
                    });
                } else {
                    //根据 deliveryrecordId 查询出库信息
                    let response = await axios({
                        url: '/forest_sys/QueryOutDeliveryrecordInfo',
                        method: 'get',
                        params: {
                            id: this.getRowData.deliveryrecordId  //选择行id
                        }
                    });
                    // console.log(response.data[0].equipmentBean);
                    this.className = response.data[0].deliveryrecord[0].classeName
                    this.userName = response.data[0].deliveryrecord[0].userName
                    let initDate = response.data[0].deliveryrecord[0].date;
                    this.date = initDate.substring(0,initDate.indexOf(" "));

                    this.gridData = this.filter(response.data[0].equipmentBean,1);
                    this.dialogTableVisible = true;
                }
            },
            handleSelectionChange(val) {    //每次选择时触发，得到所有被选中的行
                this.SelectionChange =  val;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async submitForm() {    //查询
                let response = await axios({
                    url: '/forest_sys/equipmentByCondition',
                    method: 'get',
                    params: {
                        name: this.ruleForm.name,
                        genre: this.ruleForm.genre,
                        type: this.ruleForm.type,
                        //分页
                        currentPage: this.insideCurrentPage,
                        pageSize: this.insidePageSize,
                    }
                });
                // console.log(response)
                this.insideCurrentPage = response.data.pageNum;
                this.insidePageSize = response.data.pageSize;
                this.insideTotalPage = response.data.total;
                this.insideTableData = this.filter(response.data.list);

            },
            async insideTableDataInit(currentPage=1 ,pageSize=3) {  //初始化显示添加物品
                let response = await axios({
                    url: '/forest_sys/showEquipmentInfo',
                    method: 'get',
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize
                    }
                })
                this.insideCurrentPage = response.data.pageNum;
                this.insideTotalPage = response.data.total;
                this.insidePageSize = response.data.pageSize;
                let arr = response.data.list;
                this.insideTableData = this.filter(arr);

                //判断是否选中状态
                if(this.idList.length >= 0 && this.idList != null){
                    // 外层数据库
                    for (let i = 0; i < this.insideTableData.length; i++) {
                        //内层数组
                        for ( let j = 0; j < this.idList.length; j++){
                            if(this.insideTableData[i].equipmentId === this.idList[j]){
                                this.$nextTick( ()=> {
                                    this.$refs.multipleTable.toggleRowSelection(this.insideTableData[i],true);
                                })
                            }else{
                                // console.log("不勾选")
                            }
                        }
                    }
                }
            },
            //内层分页
            insideHandleSizeChange(val){   //改变页数
                this.insideTableDataInit(this.insideCurrentPage, val)
            },
            insideHandleCurrentChange(val){    //改变条数
                this.insideTableDataInit(val, this.insidePageSize)
            },
        //    点击添加出库信息 初始化小班，出库人，物品表
            async addDeliveryinfo() {
                this.outerVisible = true    //打开页面
                //发送axios得到数据
                let response = await axios({
                    url: '/forest_sys/getAllClasses',
                    method: 'get',
                });
                // console.log(response.data)
                this.formInline = response;
                // console.log(this.formInline)
            },
            addEquipments(){
                //点击添加物品
                this.innerVisible = true

                this.insideTableDataInit();
            },
            filter(arr,is){
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].genre == 1) {
                        arr[i].genre = '鼠害'
                    }
                    if (arr[i].genre == 2) {
                        arr[i].genre = '虫害'
                    }
                    if (arr[i].genre == 3) {
                        arr[i].genre = '病害'
                    }
                    if (arr[i].type == 1) {
                        arr[i].type = '药剂'
                    }
                    if (arr[i].type == 2) {
                        arr[i].type = '器械'
                    }

                    if(is != 1){
                        arr[i].num = null;
                    }
                }
                return arr;
            },
             outDelivery(formName) {  //点击出库

                //领用小班id(1) 出库人(1) 物品id(n) 出库数量(n)
                this.$refs[formName].validate(async (valid) => {
                    if (valid && this.verify) {
                        let classId = this.formInline.name; //小班id
                        //出库人
                        let outName = this.username;
                        let outbound = "";   //出库设备id 与 出库数量

                        if(this.outTableData[0] == null){
                            this.$message({
                                showClose: true,
                                message: '请添加出库物品！',
                                type: 'error'
                            });
                        }else{
                            for (let i = 0; i < this.outTableData.length; i++) {
                                outbound += this.outTableData[i].equipmentId + ",";
                                outbound += this.outTableData[i].num + ",";
                                if(this.outTableData[i].num <= 0 || this.outTableData[i].num == null){
                                    this.$message({
                                        showClose: true,
                                        message: '请输入领用数量！',
                                        type: 'error'
                                    });
                                    return false;
                                }
                            }
                            let response = await axios({
                                url: '/forest_sys/AddOutDeliveryrecordInfo',
                                method: 'get',
                                params: {
                                    classId: classId,
                                    outName: outName,
                                    outbound: outbound
                                }
                            });
                            if (response.data > 0) {
                                this.outerVisible = false;
                                this.$message({
                                    showClose: true,
                                    message: '出库成功',
                                    type: 'success'
                                });
                                this.tableInit(this.currentPage,this.pagesize);
                            }
                        }

                    } else {
                        this.$message({
                            showClose: true,
                            message: '操作失败！',
                            type: 'error'
                        });

                        this.idList = [];
                        return false;
                    }
                });
                this.outTableData = [];
            },
            nullDelivery(){
                this.emptyIdList();
                this.outerVisible = false;
                this.outTableData = null;
            },
            ...mapMutations('dr',["setAddList"]),
            changeChoice(selection,row){    //改变选中状态时触发
                //selection 得到选中所有行，row 当前选中行
                selection = null;
                // console.log(row);
                //判断是否包含选择列，包含则删除， 不包含则添加
                if(this.idList.includes(row.equipmentId)){
                    this.removeId(row.equipmentId);
                }else{
                    this.pushIdList(row.equipmentId);
                }
            },
            checkAll(){ //点击全选/全取消 事件

                //true 全取消，  false 全选中
                if(this.SelectionChange[0] === undefined){
                    for (let i = 0; i < this.insideTableData.length ; i++) {
                        this.removeId(this.insideTableData[i].equipmentId);
                    }
                }else{
                    for (let i = 0; i < this.insideTableData.length ; i++) {
                        this.pushIdList(this.insideTableData[i].equipmentId);
                    }
                }
            },
            //展示领取的设备
            async showGetEquipment() {

                //获取去重后的，领取物品id
                let strId = [...new Set(this.idList)].toString();

                if( strId != ""){
                    //根据多个id 查询多个设备
                    let response = await axios({
                        url: '/forest_sys/equipmentById',
                        method: 'get',
                        params: {
                            strId:strId,
                        }
                    });

                    //保存选中物品的库存数量
                    for (let i = 0; i < response.data.length; i++) {
                        this.SelectTheLineItem.push(response.data[i].num);
                    }

                    this.outTableData = this.filter(response.data);
                }else{
                    //如果选择id集合为null，
                    this.outTableData = null;
                }
                this.innerVisible = false;

            },
            clear(str) {
                str = str.replace(/,/g, "");//取消字符串中出现的所有逗号
                return str;
            },
            ...mapMutations('dr',["pushIdList","removeId","emptyIdList"]),
            methodRemoveId(){ //移出物品
                if( this.removeIdOut != null){
                    this.removeId(this.removeIdOut);    //在仓库删除
                    let i = 0;
                    // 得到选中物品在json中的下标
                    for ( ; i < this.outTableData.length ; i++) {
                        if(this.outTableData[i].equipmentId === this.removeIdOut ){
                            break;
                        }
                    }
                    //通过下标切割json
                    this.outTableData.splice(i, 1);
                    this.getIndex2 = null;  //清空选中行背景颜色
                }
            },
            changeNumInput(v){   //input输入框改变时触发 e是输入的值
                // console.log("选中行的下标" + this.getIndex2)
                // console.log("输入的值"+ v)
                // console.log(this.SelectTheLineItem[this.getIndex2])
                if(v > this.SelectTheLineItem[this.getIndex2]){
                    this.verify = false;
                    this.$message({
                        showClose: true,
                        message: '出库数量不能大于库存数量（'+this.SelectTheLineItem[this.getIndex2]+'）!',
                        type: 'error'
                    });
                }
            }
        },
        computed:{
            ...mapState('dr',["idList"]),
            ...mapState(["username"])
        },
        mounted() { //挂载后，初始化
            this.tableInit(this.currentPage,this.pagesize);
            this.emptyIdList();
        }
    }
</script>

<style scoped>
    #title {
        font-size: 28px;
        text-align: center;
        margin-bottom: 25px;
    }
    .titleSub{
        margin-right: 120px;
        display: inline;
    }
</style>