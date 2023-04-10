<template>
  <div id="infoTable">
    <h1>标题</h1>
    
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :fit="true"
      class="table"
      max-height="650"
      :row-style="{ height: '80px' }"
      v-loading="table_loading"
    >
      <el-table-column
        prop="terminal_id"
        label="终端编号terminal_id"
        min-width="10%"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间time"
        min-width="35%"
        header-align="center"
        align="center"
        :formatter="format_time"
      >
      </el-table-column>
      <el-table-column
        prop="data"
        label="图像data"
        min-width="20%"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            lazy
            :src="scope.row.image_path"
            fit="fill"
            :preview-src-list="[scope.row.image_path]"
            style="padding: 0 30%"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态state"
        min-width="20%"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="Boolean(scope.row.state) ? 'success' : 'danger'">{{
            Boolean(scope.row.state) ? "正常" : "异常"
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 1vh; text-align: center;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
      v-loading="page_loading"
    >
    </el-pagination>
    <el-button class="refresh-button" type="primary" icon="el-icon-refresh" @click="init_data">刷新数据</el-button>
  </div>
</template>

<script>
import client from "../utils/client";

export default {
  name: "InfoTable",
  data() {
    return {
      tableData: [],
      pageData: {
        page: 1,
        page_size: 10,
        total: 0,
      },
      /*
      timer_1: null, // 定时器1：获取信息数量
      throttling_1: true, // 定时器1的节流开关
      timer_2: null, // 定时器2：获取信息
      throttling_2: true, // 定时器2的节流开关
      */
      table_loading: true,
      page_loading: true,
    };
  },
  methods: {
    handleSizeChange(s) {
      this.pageData.page_size = s;
      const { page, page_size } = this.pageData;
      this.table_loading = true
      client.getInfoTable(this.ID, page, page_size, (data) => {
        this.tableData = data;
        this.table_loading = false
      });
      this.page_loading = true
      client.getInfoTotal(this.ID, (count) => {
        this.pageData.total = count;
        this.page_loading = false
      });
    },
    handleCurrentChange(p) {
      this.pageData.page = p;
      const { page, page_size } = this.pageData;
      this.table_loading = true
      client.getInfoTable(this.ID, page, page_size, (data) => {
        this.tableData = data;
        this.table_loading = false
      });
      this.page_loading = true
      client.getInfoTotal(this.ID, (count) => {
        this.pageData.total = count;
        this.page_loading = false
      });
    },
    format_time(row, col, data, index) {
      let arr = data.split(".");
      arr.pop();
      const result = arr.join("").replace("T", " ");
      return result;
    },
    init_data() {
      this.table_loading = true
      const { page, page_size } = this.pageData;
      client.getInfoTable(this.ID, page, page_size, (data) => {
        this.tableData = data;
        this.table_loading = false
      });
      this.page_loading = true
      client.getInfoTotal(this.ID, (count) => {
        this.pageData.total = count;
        this.page_loading = false
      });
    },
  },
  created() {
    // 初始化数据展示
    this.init_data()
  },
  computed: {
    ID() {
      return this.$route.query.ID || null;
    },
  },
  activated() {
    this.init_data()
    /*
    this.timer_1 = setInterval(() => {
      if (this.throttling_1) {
        this.throttling_1 = false;
        client.getInfoTotal(this.ID, (count) => {
          this.pageData.total = count;
          this.throttling_1 = true;
          this.page_loading = false
        });
      } else {
        console.warn(`getInfoTotal 请求还未响应完成`);
      }
    }, 10000);
    this.timer_2 = setInterval(() => {
      const { page, page_size } = this.pageData;
      if (this.throttling_2) {
        this.throttling_2 = false;
        client.getInfoTable(this.ID, page, page_size, (data) => {
          this.tableData = data;
          this.throttling_2 = true;
          this.table_loading = false;
        });
      } else {
        console.warn(`getInfoTable 请求还未响应完成`);
      }
    }, 10000);
    */
    console.log("InfoTable页面激活");
  },
  deactivated() {
    /*
    clearInterval(this.timer_1);
    clearInterval(this.timer_2);
    this.throttling_1 = true;
    this.throttling_2 = true;
    */
    this.tableData = [];
    this.table_loading = true;
    this.page_loading = true;
    this.pageData = { page: 1, page_size: 10, total: 0 };
    console.log("InfoTable页面失活");
  },
};
</script>

<style scoped>
#infoTable {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0 10%;
  position: relative;
}
.refresh-button {
  min-width: 125px;
  width: 7%;
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
