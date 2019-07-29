//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageIndex: 0, //页码
    totalRecord: 0, //总数
    isInit: true, //是否第一次进入应用
    loadingMore: false, //是否正在加载更多
    searchKey: null, //搜索关键字
    hotimages: [],
    imageData: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '#'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };

    this.setData({
      hotimages: ['http://ww1.sinaimg.cn/bmiddle/9150e4e5gy1g5e74prg4mg206o06ojs9.gif',
        'http://wx3.sinaimg.cn/bmiddle/006fbYi5gy1g53u1ucvoug306o06oqiu.gif',
        'http://ww3.sinaimg.cn/bmiddle/9150e4e5gy1g398v3urc6g206b06btyb.gif',
        'http://wx2.sinaimg.cn/bmiddle/ceeb653ely1g4xhw7xasrg207d054njs.gif'
        ],
        imageData:[{
      images: ['http://wx3.sinaimg.cn/bmiddle/ceeb653ely1g544vkrvwag209o09re6y.gif',
        'http://wx3.sinaimg.cn/bmiddle/006APoFYly1g4zpcbia67g30a10bdqrw.gif',
        'http://wx4.sinaimg.cn/bmiddle/78b88159gy1g4d4ypxdpqg207u07uaw4.gif',
        'http://wx2.sinaimg.cn/bmiddle/006APoFYly1g53wmyuprrg30a70akk91.gif']},
      {images: ['http://wx3.sinaimg.cn/bmiddle/007742zngy1g58ew2vn9fg308q08qnll.gif',
        'http://wx3.sinaimg.cn/bmiddle/78b88159ly1g3g2v6fuvtg208c08ch28.gif',
        'http://wx2.sinaimg.cn/bmiddle/ceeb653ely1g4ilpcjpjqj20hs0hsdhl.jpg',
        'http://ww2.sinaimg.cn/bmiddle/9150e4e5gw1f8z2spiflfj20k00k0wf2.jpg']},
     {images:['http://wx3.sinaimg.cn/bmiddle/ceeb653ely1fss3yxlvtjg204y04o7g2.gif',
        'http://wx2.sinaimg.cn/bmiddle/78b88159ly1g3kpviouhag20dc0dcgmn.gif',
        'http://wx2.sinaimg.cn/bmiddle/ab4cb34agy1g4l69bixm2j21400u0gp8.jpg',
        'http://wx3.sinaimg.cn/bmiddle/006fbYi5gy1g53u1tsv4og308c08cws9.gif']},
      {images: ['http://wx4.sinaimg.cn/bmiddle/006APoFYly1g50ve1c460g308u08ue4q.gif',
        'http://ww3.sinaimg.cn/bmiddle/9150e4e5gy1g5dfyz4xpzj20j60j6wgu.jpg',
        'http://wx3.sinaimg.cn/bmiddle/006APoFYly1g4ymuy2q0ij30hs0hs40w.jpg',
        'http://wx3.sinaimg.cn/bmiddle/006APoFYly1g5f23gg0iag308v08vqrq.gif']
        }]
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '动图表情包',
      path: "/pages/index/index",
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  imgYl: function (evt) {
    var src = evt.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  onReachBottom: function () {
    //!this.data.loadingMore && requestData.call(this);
  },
  searchInputEvent(e) {
    this.setData({
      searchKey: e.detail.value
    });
  },

  //搜索按钮点击事件
  searchClickEvent(e) {
    if (!this.data.searchKey) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    this.setData({
      pageIndex: 0,
      pageData: []
    });
    requestData.call(this);
  },

});

function requestData() {
  const q = this.data.searchKey;
  const start = this.data.pageIndex;

  this.setData({
    loadingMore: true,
    isInit: false
  });

  wx.showLoading({
    title: '加载中',
  });

  api.requestSearch({
    q: q,
    start: start
  }).then((data) => {
    wx.hideLoading();
    if (data.total == 0) {
      this.setData({
        imageData: false,
        totalRecord: 0
      });
    } else {
      this.setData({
        loadingMore: false,
        imageData: this.data.imageData.concat(data.images),
        pageIndex: start + 1,
        totalRecord: data.total
      });
    }
  }).catch(_ => {
    this.setData({
      loadingMore: false,
      totalRecord: 0
    });
    wx.hideLoading();
  });
}