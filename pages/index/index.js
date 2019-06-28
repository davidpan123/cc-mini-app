// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    arrList: [
      { id: 1, name: "aa" },
      { id: 2, name: "bb" },
      { id: 3, name: "cc" },
      { id: 4, name: "dd" }
    ],
   
  },
  showHidOpr () {
    let windowWidth = wx.getSystemInfoSync().windowWidth
    console.log(windowWidth)
    this.setData({
      isShow: !this.data.isShow
    })
    this.testApi()
  },
  add () {
    let id = this.data.arrList.length ++
    this.data.arrList.push({ id: id, name: "ee" })
    this.setData({
      arrList: this.data.arrList
    })
  },
  del () {
    this.data.arrList.pop()
    this.setData({
      arrList: this.data.arrList
    })
  },
  toLogin () {
    wx.navigateTo({
      url: '/pages/edit-address/index?title=navigate'
    })
  },
  testApi () {
    //1.加载框
    // this.showHidLoading()
    //2.toast
    // this.showToast()
    //3.ActionSheet
    this.showActionSheet()
    //4.分享
    // this.showShareMenu()
    //5 获取用户信息
    // this.getUserInfo()
    //6.扫描二维码
    // this.scanCode()
    // 读写文件、连接蓝牙等
    
  }, 
  showHidLoading () {
    if (this.data.isShow) {
      wx.showLoading({
        title: '加载中...',
      })
    } else {
      wx.hideLoading()
    }
  },
  showToast () {
    wx.showToast({
      title: '请求数据成功!',
      duration: 500
    })
  },
  showActionSheet () {
    wx.showActionSheet({
      itemList: ['上海', '北京', '广州'],
      itemColor: '#F00',
      success: function(res) {
        let index = res.tapIndex
        console.log(['上海', '北京', '广州'][index])
      },
      fail: function(res) {
        //取消
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  showShareMenu () {
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getUserInfo () {
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },
  scanCode () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: function (res) {
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
    let app = getApp()
    console.log(app.a)
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

  }
})