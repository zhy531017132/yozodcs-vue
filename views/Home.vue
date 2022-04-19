<template>
  <div id="home">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">预览页面</a></el-breadcrumb-item>
            <el-breadcrumb-item>预览详情</el-breadcrumb-item>
            <el-breadcrumb-item>联系我们</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <el-upload
            class="upload-demo"
            drag
            action="https://fcsapi.yozodocs.com/composite/upload"
            multiple
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-error="handleFail"
            :data="formData"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              可以上传word、ppt、excel等格式，且文件大小不超过100M
            </div>
          </el-upload>
        </el-main>
      </el-container>
    </el-container>
    <preview-content :previewMsg="previewMsg"></preview-content>
  </div>
</template>
<script>
import CommonAside from "../src/components/CommonAside.vue";
import PreviewContent from "../src/components/PreviewContent.vue";
export default {
  name: "Home",
  components: {
    CommonAside,
    PreviewContent,
  },
  data() {
    return {
      formData: {
        "convertType ": 61,
      },
      previewMsg: {
        dialogTableVisible: false,
        fileType: "",
        iframeUrl: "",
      },
    };
  },
  methods: {
    handlePreview(e) {
      console.log(e);
      this.previewMsg.dialogTableVisible = true;
      this.previewMsg.fileType = e.name;
      this.previewMsg.iframeUrl = e.response.data.viewUrl.replace(
        "http",
        "https"
      );
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      console.log(response.data.viewUrl.replace("http", "https"));
      this.$notify({
        title: "成功",
        message: `${file.name}文件上传成功`,
        type: "success",
      });
    },
    handleFail(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
      this.$notify.error({
        title: "错误",
        message: `${file.name}文件上传失败`,
      });
    },
  },
};
</script>
<style lang="less">
#home {
  width: 100vw;
  height: 100vh;
  .el-container {
    .el-header {
      background-color: rgb(232, 231, 231);
      .el-breadcrumb {
        line-height: 60px;
      }
    }
    .el-main {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
