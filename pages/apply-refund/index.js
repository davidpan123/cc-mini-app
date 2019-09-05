const util = require('../../utils/util.js')
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    hideShopPopup: true,
    selectIndex: -1,
    reason: '',
    reasonlist: ['拍错货/产品规格选错/数量填错', '联系信息填错/地址填错', '发错货/发漏货', '产品发生损坏/有质量问题', '不喜欢/不想要'],
    order: {},
    created_at: '',
    reqData: {
      name: '',
      phone: '',
      desc: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail()
  },
  getOrderDetail: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let params = { id: this.data.orderId }
    WXAPI.getOrderDetail(params).then(res => {
      wx.hideLoading();
      let order = res.data
      //created_at下单时间
      let created_at = ''
      if (order.created_at) {
        created_at = util.formatDate(order.created_at, 'yyyy-MM-dd hh:mm:ss')
      }

      that.setData({
        order: order,
        created_at: created_at
      })
    })
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
  nameInput(e) {
    let reqData = this.data.reqData
    reqData.name = e.detail.value
    this.setData({
      reqData: reqData
    })
  },
  phoneInput(e) {
    let reqData = this.data.reqData
    reqData.phone = e.detail.value
    this.setData({
      reqData: reqData
    })
  },
  descInput (e) {
    let reqData = this.data.reqData
    reqData.desc = e.detail.value
    this.setData({
      reqData: reqData
    })
  },
  /**
   * 处理完成点击事件
   */
  save: function () {
    this.closePopupTap();
    this.setData({
      reason: this.data.reasonlist[this.data.selectIndex]
    })
  },
  /**
   * 跳转退款详情
   */
  goRefundDetail () {
    if (!this.data.reason) {
      wx.showToast({
        title: '亲， 提交前请先选择申请原因！',
        icon: 'none'
      })
      return
    }
    if (!this.data.reqData.name) {
      wx.showToast({
        title: '亲， 提交前请先填写联系人！',
        icon: 'none'
      })
      return
    }
    if (!this.data.reqData.phone) {
      wx.showToast({
        title: '亲， 提交前请先填写联系电话！',
        icon: 'none'
      })
      return
    }
    let orderId = this.data.orderId;
    let params = Object.assign({ order_id: orderId, action: 'refund', choice: this.data.selectIndex }, this.data.reqData)
    WXAPI.changeOrder(params).then(res => {
      wx.navigateTo({
        url: '/pages/refund-detail/index?orderId=' + orderId
      })
    })
  }
})