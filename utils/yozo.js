const DcsRender = function (iframeId) {
  this.isCrossDomain = false;
  this.srcType;
  this.number;
  this.object2;
  this.callbackCache;
  if (iframeId) {
    //获取类型
    if (document.getElementById(iframeId).src.indexOf("index") != -1) {
      if (
        document.getElementById(iframeId).src.indexOf("pgindex") != -1 &&
        this.srcType == null
      ) {
        this.srcType = "pgindex";
      } else if (
        document.getElementById(iframeId).src.indexOf("sindex") != -1 &&
        this.srcType == null
      ) {
        this.srcType = "sindex";
      } else {
        this.srcType = "index";
      }
    }
    this.customerIframe = document.getElementById(iframeId);
    try {
      this.renderWindow =
        this.customerIframe.window || this.customerIframe.contentWindow;
      if (this.srcType == "pgindex") {
        this.render = this.renderWindow.reader;
      } else if (this.srcType == "index") {
        this.render = this.renderWindow.wp;
      } else if (this.srcType == "sindex") {
        this.render = this.renderWindow.ss;
      }
      this.isCrossDomain = true;
    } catch (err) {
      this.isCrossDomain = true;
      addEventListener("message", function (event) {
        var reqType = event.data.reqType;
        switch (reqType) {
          case "getCurrentPage":
            // number = event.data.currentPage
            if (!this.callbackCache) break;
            this.callbackCache(event.data);
            break;
          case "getAnimationInfo":
            this.object2 = {
              currentAnimIndex: event.data.currentAnimIndex,
              page: event.data.page,
              type: event.data.type,
            };
            break;
          default:
            break;
        }
      });
    }
  } else {
    this.render = window.reader;
  }
  this.srcType = "pgindex";
};

DcsRender.prototype = {
  // 页码跳转
  nextPage: function () {
    if (this.isCrossDomain) {
      console.log(this.srcType);
      this.customerIframe.contentWindow.postMessage(
        { type: "nextPage", param: this.srcType },
        "*"
      );
    } else {
      this.render.changePageNext();
    }
  },
  lastPage: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "lastPage", param: this.srcType },
        "*"
      );
    } else {
      this.render.changePageLast();
    }
  },
  gotoPage: function (index) {
    if (this.isCrossDomain) {
      var obj = {
        index: index,
        srcType: this.srcType,
      };
      this.customerIframe.contentWindow.postMessage(
        { type: "gotoPage", param: obj },
        "*"
      );
    } else {
      this.render.changePage(index);
    }
  },
  getCurrentPage: function () {
    if (this.isCrossDomain) {
      return new Promise((resolve) => {
        const callback = function (data) {
          resolve(data);
        };
        this.pushCallback(callback);
        this.customerIframe.contentWindow.postMessage(
          { type: "getCurrentPage", param: this.srcType },
          "*"
        );
      }).then((e) => {
        return e.currentPage;
      });
    } else {
      return (this.number = this.render.startPageIndex + 1);
    }
  },
  // 动画跳转
  nextAnimation: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "nextAnimation", param: "" },
        "*"
      );
    } else {
      this.render.animationManager.next();
    }
  },
  preAnimation: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "preAnimation", param: "" },
        "*"
      );
    } else {
      this.render.animationManager.pre();
    }
  },
  gotoAnimation: function (animateObj) {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "gotoAnimation", param: animateObj },
        "*"
      );
    } else {
      this.render.animationManager.gotoAnimation(animateObj);
    }
  },
  getAnimationInfo: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "getAnimationInfo", param: this.srcType },
        "*"
      );
    } else {
      return (this.object2 = {
        currentAnimIndex: this.render.animationManager.currentAnimIndex,
        page: this.render.animationManager.gotoAimationPageIndex,
        type: this.render.animationManager.gotoAimationType,
      });
    }
  },
  //放大
  magnify: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "magnify", param: this.srcType },
        "*"
      );
    } else {
      if (this.srcType == "pgindex" || this.srcType == "index") {
        this.render.changeTab(1);
      } else if (this.srcType == "sindex") {
        this.render.changeScale(1);
      }
    }
  },
  //缩小
  shrink: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "shrink", param: this.srcType },
        "*"
      );
    } else {
      if (this.srcType == "pgindex" || this.srcType == "index") {
        this.render.changeTab(0);
      } else if (this.srcType == "sindex") {
        this.render.changeScale(0);
      }
    }
  },
  //播放
  play: function () {
    if (this.isCrossDomain) {
      this.customerIframe.contentWindow.postMessage(
        { type: "play", param: this.srcType },
        "*"
      );
    } else {
      this.render.setFullScreen(false);
    }
  },
  pushCallback: function (callback) {
    this.callbackCache = callback;
  },
};

export default DcsRender;
