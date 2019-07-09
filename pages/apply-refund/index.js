// pages/apply-refund/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qustion: '',
    hideShopPopup: true,
    selectIndex: -1,
    reasonlist: ['拍错货/产品规格选错/数量填错', '联系信息填错/地址填错', '发错货/发漏货', '产品发生损坏/有质量问题', '不喜欢/不想要']
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 规格选择弹出框
   */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  /**
   * 处理选中事件
   */
  handleReasonSelect: function (e) {
    let index = e.currentTarget.dataset['index'];
    this.setData({
      selectIndex: index
    })
  },
  /**
   * 处理完成点击事件
   */
  save: function () {
    this.closePopupTap();
  },
  /**
   * 跳转退款详情
   */
  goRefundDetail () {
    wx.navigateTo({
      url: '/pages/refund-detail/index'
    })
  }
})