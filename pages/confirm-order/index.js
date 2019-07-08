const WXAPI = require('../../wxapi/main')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    addInfo: null,
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddress()
  },
  /**
   * 获取地址
   */
  getAddress() {
    const self = this;
    WXAPI.getAddress().then(res => {
      if (res && res.data.length) {
        let address = res.data[0]
        self.setData({
          addInfo: address,
          address: address.province + address.city + address.district + address.street
        })
      }
    })
  },
  goAddress() {
    wx.navigateTo({
      url: '/pages/edit-address/index'
    })
  }
})