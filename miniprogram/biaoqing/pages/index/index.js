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
      url: '../logs/logs'
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
    }
    this.setData({
      hotimages: ['http://ww1.sinaimg.cn/bmiddle/6af89bc8gw1f8oxvxgc0rg203p02s754.gif',
        'http://ww2.sinaimg.cn/bmiddle/6af89bc8gw1f8ow49rx2vj205k05kdfn.jpg',
        'http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8ovpurnomg203c03cdhm.gif',
        'http://ww4.sinaimg.cn/bmiddle/6af89bc8gw1f8owdwwcj5g20dw07ggyt.gif'
        ],
      images1: ['http://ww1.sinaimg.cn/bmiddle/6af89bc8gw1f8ox9w7kk1g203k03kdfz.gif',
        'http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8omjwkqvaj20c80c8jrr.jpg',
        'http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8oomv198hj20c50bojt6.jpg',
        'http://ww2.sinaimg.cn/bmiddle/6af89bc8gw1f8oon2frvdj20bw0bogmy.jpg'],
      images2: ['http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8or7i7nmbj20bw0ck0u9.jpg',
        'http://ww4.sinaimg.cn/bmiddle/6af89bc8gw1f8oy6i10ivg203c03c746.gif',
        'http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8ou9spkjhg202s02st8x.gif',
        'http://ww1.sinaimg.cn/bmiddle/6af89bc8gw1f8oolv24ntj207e06bq34.jpg'],
      images3: ['http://ww1.sinaimg.cn/bmiddle/6af89bc8gw1f8ovs2gsodj20e407x757.jpg',
        'http://ww2.sinaimg.cn/bmiddle/6af89bc8gw1f8ol77zltog208c0641kx.gif',
        'http://ww4.sinaimg.cn/bmiddle/6af89bc8gw1f8oyvh50j5g202s02swf9.gif',
        'http://ww1.sinaimg.cn/bmiddle/6af89bc8gw1f8oxb3tmn4g2046046dgd.gif'],
      images4: ['http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8oxb01ozsg2046046t9e.gif',
        'http://ww2.sinaimg.cn/bmiddle/6af89bc8gw1f8p4urkdosg202s02s3yn.gif',
        'http://ww3.sinaimg.cn/bmiddle/6af89bc8gw1f8ox3u4foeg202s023mwy.gif',
        'http://ww2.sinaimg.cn/bmiddle/6af89bc8gw1f8oxa47h26g2046046q4f.gif']
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
