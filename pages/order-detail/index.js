const util = require('../../utils/util.js')
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    order: {},
    isShowPay: false,
    statusName: '',
    //created_at下单时间； finish_at取消时间； pay_time支付时间
    created_at: '',
    finish_at: '',
    pay_time: '',
    hideShopPopup: true,
    hideReceingPopup: true,
    hideServicePopup: true
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    let params = {id: this.data.orderId}
    WXAPI.getOrderDetail(params).then(res => {
      wx.hideLoading();
      if (res.status !== 0) return
      let order = res.data
      order.goods.forEach(item => {
        if (item.good_kind === '0') {
          item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.color};${item.guige}`;
        } else if (item.good_kind === '1') {
          item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.color};${item.guige}`;
        } else {
          item.skuLabel = `${item.jinleixing};${item.jinzhong};${item.guige}`;
        }
      });
      if (!order.logistics.info) {
        order.logistics = {
          info: {
            data: []
          }
        };
      }
      
      //created_at下单时间； finish_at取消时间； pay_time支付时间
      let created_at = '', finish_at='', pay_time =''
      if (order.created_at) {
        created_at = util.formatDate(order.created_at, 'yyyy-MM-dd hh:mm:ss')
      }
      if (order.finish_at) {
        finish_at = util.formatDate(order.finish_at, 'yyyy-MM-dd hh:mm:ss')
      }
      if (order.pay_time) {
        pay_time = util.formatDate(order.pay_time, 'yyyy-MM-dd hh:mm:ss')
      }

      that.setData({
        order: order,
        statusName: that.getStatusName(order.status),
        isShowPay: that.isShowPay(order.status),
        created_at: created_at,
        finish_at: finish_at,
        pay_time: pay_time
      })
    })
  },
  /**
   * 获取订单状态名称
   */
  getStatusName (status) {
    const statusObjs = {
      0: '待付款',
      1: '待发货',
      2: '待收货',
      3: '已完成',
      4: '退款中',
      6: '已退款',
      8: '已取消',
    }
    return statusObjs[status] || ''
  },
  /**
   * 是否显示付款信息
   */
  isShowPay (status) {
    return status !== 0 && status !== 8
  },
  /**
   * 查看物流
   */
  gotLogistics () {
    wx.navigateTo({
      url: '/pages/wuliu/index?orderId=' + this.data.orderId
    })
  },
  /**
   * 立即付款-收银台
   */
  parOrder () {
    // 跳转立即付款页面
    wx.navigateTo({
      url: '/pages/cashier/index?orderId=' + this.data.orderId
    })
  },
  /**
   * 申请退款
   */
  goApplyRefund () {
    wx.navigateTo({
      url: '/pages/apply-refund/index?orderId=' + this.data.orderId
    })
  },
  /**
   * 查看退款
   */
  goRefundDetail () {
    wx.navigateTo({
      url: '/pages/refund-detail/index?orderId=' + this.data.orderId
    })
  },
  /**
   * 取消订单
   */
  cancelOrder () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 关闭取消订单对话框
   */
  closePopupTap () {
    this.setData({
      hideShopPopup: true,
      hideReceingPopup: true,
      hideServicePopup: true
    })
  },
  /**
   * 取消订单对话框-确定
   */
  okCancelOrder () {
    const self = this;
    self.closePopupTap()
    let orderId = self.data.orderId;
    let params = { order_id: orderId, action: 'cancel' };
    WXAPI.changeOrder(params).then(res => {
      // 重新提交成功后再次请求详情接口
      self.getOrderDetail()
    })
  },
  /**
   * 确认收货
   */
  conformOrder () {
    this.setData({
      hideReceingPopup: false
    })
  },
  okReceing () {
    const self = this;
    self.closePopupTap()
    let orderId = self.data.orderId;
    let params = { order_id: orderId, action: 'affirm' };
    WXAPI.changeOrder(params).then(res => {
      // 重新提交成功后再次请求详情接口
      self.getOrderDetail()
    })
  },
  /**
   * 联系客服
   */
  contactService() {
    this.setData({
      hideServicePopup: false
    })
  },
  /**
   * 对话框-确定联系客服
   */
  okContactService() {
    // 联系客服操作
    // 关闭对话框
    this.closePopupTap()
  },
})