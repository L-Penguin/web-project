<!-- 图像框组件 -->
<template>
  <div class="ImgFrame">
    <el-skeleton
      :loading="loading_img"
      animated
      class="skeleton"
      :state="newState"
    >
      <template slot="template">
        <el-skeleton-item
          variant="image"
          style="height: 100%; box-shadow: 0 0 5px 5px #666"
        />
        <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
            margin-top: 25px;
          "
        >
          <el-skeleton-item
            variant="text"
            style="width: 20%; margin: auto; box-shadow: 0 0 3px 3px #666"
          />
        </div>
      </template>
      <template>
        <el-image
          :src="newUrl"
          fit="fill"
          style="height: 100%"
          @error="loaded_error"
          @click="infoClick($event)"
        ></el-image>
        <span class="img_label"
          ><b>{{ label }}</b></span
        >
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import 'animate.css';

export default {
  name: "ImgFrame",
  props: ["url", "state", "label"],
  data() {
    return {
      newUrl: "",
      newState: 0,
    };
  },
  mounted() {
    this.newUrl = this.url;
    this.newState = this.state;
  },
  methods: {
    loaded_error(e) {
      this.url = "./unconnected.jpg";
      this.state = -1;
    },
    infoClick(e) {
      if (this.state === -1) {
        console.log('未连接');
      } else {
        this.$router.push({ path: "InfoTable", query: { ID: this.label } });
      }
    },
  },
  computed: {
    loading_img() {
      this.newUrl = this.url;
      this.newState = this.state;
      return !Boolean(this.url);
    },
  },
};
</script>

<style>
.skeleton {
  transform: scale(1.0);
  transition: all 0.5s;
}
.skeleton:hover {
  cursor:pointer;
  box-shadow:2px 2px 10px #333;
  transform: scale(0.9)
}
.skeleton[state="-1"] {
  border: 7px solid #E6A23C;
  border-radius: 7px;
  -webkit-filter: drop-shadow(8px 8px 5px #E6A23C);
	filter: drop-shadow(0px 0px 7px #E6A23C);
}
.skeleton[state="0"] {
  border: 7px solid #F56C6C;
  border-radius: 7px;
  -webkit-filter: drop-shadow(8px 8px 5px #F56C6C);
	filter: drop-shadow(0px 0px 7px #F56C6C);
}
.skeleton[state="1"] {
  border: 7px solid #67C23A;
  border-radius: 7px;
  -webkit-filter: drop-shadow(8px 8px 5px #67C23A);
	filter: drop-shadow(0px 0px 7px #67C23A);
}
.skeleton[state="-2"]:hover {
  transform: unset;
  animation: shakeX;
  animation-duration: 1s;
}
.ImgFrame {
  animation: zoomIn;
  animation-duration: 1s;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
}
.skeleton {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-skeleton {
  height: 100%;
}

.img_label {
  display: block;
  text-align: center;
  font-size: 2vw;
  user-select: none;
}
</style>
