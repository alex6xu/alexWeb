//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hotimages: [],
    images1: [],
    images2: [],
    images3: [],
    images4: []
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
      images1: ['http://wx3.sinaimg.cn/bmiddle/ceeb653ely1g544vkrvwag209o09re6y.gif',
        'http://wx3.sinaimg.cn/bmiddle/006APoFYly1g4zpcbia67g30a10bdqrw.gif',
        'http://wx4.sinaimg.cn/bmiddle/78b88159gy1g4d4ypxdpqg207u07uaw4.gif',
        'http://wx2.sinaimg.cn/bmiddle/006APoFYly1g53wmyuprrg30a70akk91.gif'],
      images2: ['http://wx3.sinaimg.cn/bmiddle/007742zngy1g58ew2vn9fg308q08qnll.gif',
        'http://wx3.sinaimg.cn/bmiddle/78b88159ly1g3g2v6fuvtg208c08ch28.gif',
        'http://wx2.sinaimg.cn/bmiddle/ceeb653ely1g4ilpcjpjqj20hs0hsdhl.jpg',
        'http://ww2.sinaimg.cn/bmiddle/9150e4e5gw1f8z2spiflfj20k00k0wf2.jpg'],
      images3: ['http://wx3.sinaimg.cn/bmiddle/ceeb653ely1fss3yxlvtjg204y04o7g2.gif',
        'http://wx2.sinaimg.cn/bmiddle/78b88159ly1g3kpviouhag20dc0dcgmn.gif',
        'http://wx2.sinaimg.cn/bmiddle/ab4cb34agy1g4l69bixm2j21400u0gp8.jpg',
        'http://wx3.sinaimg.cn/bmiddle/006fbYi5gy1g53u1tsv4og308c08cws9.gif'],
      images4: ['http://wx4.sinaimg.cn/bmiddle/006APoFYly1g50ve1c460g308u08ue4q.gif',
        'http://ww3.sinaimg.cn/bmiddle/9150e4e5gy1g5dfyz4xpzj20j60j6wgu.jpg',
        'http://wx3.sinaimg.cn/bmiddle/006APoFYly1g4ymuy2q0ij30hs0hs40w.jpg',
        'http://wx3.sinaimg.cn/bmiddle/006APoFYly1g5f23gg0iag308v08vqrq.gif']
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
      path: "/page/index/index",
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
  }
})
