<template>
  <div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      width="90%"
      top="3vh"
      :destroy-on-close="true"
    >
      <template slot="title">
        <div class="el-dialog-header-flex">
          <div class="el-dialog-title">{{ fileType }}</div>
          <div class="el-dialog-tag">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              closeable
              :type="tag.type"
              @click="handClick(tag.action)"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </div>
      </template>

      <iframe id="iframeCont" ref="iframeRef" :src="iframeUrl"></iframe>
    </el-dialog>
  </div>
</template>
<script>
import DcsRender from "../../utils/yozo.js";
export default {
  name: "PreviewContent",
  props: ["previewMsg"],
  data() {
    return {
      dialogTableVisible: false,
      fileType: "",
      iframeUrl: "",
      tags: [
        { name: "上一页", type: "", action: "prePage" },
        { name: "下一页", type: "success", action: "nextPage" },
        { name: "全屏", type: "info", action: "fullScreen" },
        { name: "搜索", type: "warning", action: "search" },
        { name: "下载", type: "danger", action: "downLoad" },
      ],
      dcsRender: null,
    };
  },
  methods: {
    handClick(action) {
      switch (action) {
        case "prePage":
          this.dcsRender.lastPage();
          break;
        case "nextPage":
          this.dcsRender.nextPage();
          break;
        case "fullScreen":
          console.log("search");
          break;
        case "search":
          console.log("search");
          break;
        case "downLoad":
          console.log("downLoad");
          break;
        default:
          console.log("contine");
          break;
      }
    },
  },
  watch: {
    previewMsg: {
      handler(newVal) {
        this.dialogTableVisible = newVal.dialogTableVisible;
        this.fileType = newVal.fileType;
        this.iframeUrl = newVal.iframeUrl;
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {},
  updated() {
    this.$nextTick(() => {
      this.dcsRender = new DcsRender("iframeCont");
      console.log(this.dcsRender);
    });
  },
};
</script>
<style lang="less">
.el-dialog__wrapper {
  .el-dialog-header-flex {
    display: flex;
    align-items: center;
    .el-dialog-tag {
      padding-left: 200px;
      .el-tag {
        cursor: pointer;
        margin: 0 16px;
      }
    }
  }
  .el-dialog {
    .el-dialog__body {
      display: flex;
      justify-content: center;
      padding: 0;
      iframe {
        width: 88vw;
        height: 80vh;
      }
    }
  }
}
</style>
