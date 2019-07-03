// pages/good-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'dssdsd22',
    windowHeight: '',
    goodList: [
      {
        id: 'sdd111',
        src: '/images/card1.png'
      },
      {
        id: 'dssdsd22',
        src: '/images/card2.png'
      },
      {
        id: 'sdd111333',
        src: '/images/card1.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // scrollviw 设置高度，否则无法跳转到指定位置
    wx.getSystemInfo({
      success: function (res) {
        // 高度 单位为px
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })

    // 设置滚动位置
    this.setData({
      toView: options.id
    })
  },

  onShow: function () {
  },
  scrollBottom: function () {
    for (var i = 0; i < this.data.goodList.length; ++i) {
      if (this.data.goodList[i].id === this.data.toView) {
        this.setData({
          toView: this.data.goodList[i + 1] ? this.data.goodList[i + 1].id : this.data.goodList[i]
        })
        break
      }
    }
  }
})