<template>
  <div id="Home">
    <h1>标题区域</h1>
    <table
      :cols="cols"
      cellpadding="10%"
      class="imgs_table"
    >
      <tr v-for="(imgs, row) in imgsArr" :key="row">
        <td v-for="(img, col) in imgs" :key="String(row)+'_'+String(col)">
          <ImgFrame
            :url="img?.data"
            :state="img?.state.toString() || -2"
            :label="img?.terminal_id"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import client from "../utils/client";
import ImgFrame from "./ImgFrame";

export default {
  name: "Home",
  components: {
    ImgFrame,
  },
  data() {
    return {
      cols: 4,
      rows: 4,
      timer_1: null, // 定时器1：
      throttling_1: true, // 定时器1的节流开关
      imgsData: [],
    };
  },
  methods: {

  },
  mounted() {

  },
  computed: {
    // 根据行和列将图片分行列
    imgsArr() {
      // 创建数列
      const result = new Array(this.rows).fill(null).map(() => new Array(this.cols).fill(null));
      this.imgsData.forEach((img, i) => {
        let row = Math.floor(i / this.cols);
        let col = i % this.cols;
        result[row][col] = img;
      });
      return result;
    },
  },
  created() {
    client.getImgsData(this.cols * this.rows, (data) => {
          this.imgsData = data;
        });
  },
  activated() {
    console.log('Home页面激活')
    this.timer_1 = setInterval(() => {
      if (this.throttling_1) {
        this.throttling_1 = false;
        client.getImgsData(this.cols * this.rows, (data) => {
          this.imgsData = data;
          this.throttling_1 = true;
        });
      } else {
        console.warn(`getImgsData 请求还未响应完成`);
      }
    }, 1000);
  },
  deactivated() {
    console.log('Home页面失活')
    clearInterval(this.timer_1)
    this.throttling_1 = true;
  }

};
</script>

<style>
  #Home {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    text-align: center;
  }
  .imgs_table {
    width: 100%;
    height: auto;
    margin: auto;
    padding: 0 1vw;
    border-collapse: separate;
    border-spacing: 1.5vw 5vw;
  }
</style>
