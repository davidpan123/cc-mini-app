const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({
  data: {
    appName: 'CC卡美珠宝',
    statusType: [
      { type: -1, name:"全部"},
      { type: 0, name: "待付款" },
      { type: 1, name: "待发货" },
      { type: 2, name: "待收货" },
      { type: 3, name: "已完成" }
    ],
    currentType: -1,
    orderList: [],
    hideReceingPopup: true,
    hideServicePopup: true,
    receingOrderId: ''
  },
  statusTap: function (e) {
    const curType = e.currentTarget.dataset.type;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
  goOrderDetail (e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-detail/index?orderId=' + orderId,
    })
  },
  onLoad: function (options) {
    if (options && options.type) {
      this.setData({
        currentType: options.type
      });
    }
    // 获取订单列表
    this.getOrderList()
  },
  onShow: function () {
  },
  /**
   * 获取订单列表
   */
  getOrderList () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    WXAPI.getOrders().then(res => {
      wx.hideLoading();
      let orders = res.data;
      if (that.data.currentType != -1) {
        orders = orders.filter(order => {
          return order.status == that.data.currentType;
        });
      }
      orders.forEach(order => {
        let statusItem = this.data.statusType.find(statusObj => statusObj.type === order.status)
        order.statusName = statusItem.name || '';
        order.goods.forEach(item => {
          if (item.is_diamond) {
            item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.guige};${item.guige}`;
          } else {
            item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.guige};${item.guige}`;
          }
        });
      });

      this.setData({
        orderList: orders
      })
    })
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  /**
   * 查看退款详情
   */
  goRefundDetail (e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/refund-detail/index?orderId=' + orderId
    })
  },
  /**
   * 查看物流
   */
  goLogistics (e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/wuliu/index?orderId=' + orderId
    })
  },
  /**
   * 立即付款
   */
  pay (e) {
    let orderId = e.currentTarget.dataset.id;
    // 跳转立即付款页面
    wx.navigateTo({
      url: '/pages/cashier/index?orderId=' + orderId
    })
  },
  /**
   * 联系客服
   */
  contactService () {
    this.setData({
      hideServicePopup: false
    })
  },
  /**
   * 对话框-确定联系客服
   */
  okContactService () {
    // 联系客服操作
    // 关闭对话框
    this.closePopupTap()
  },
  /**
   * 确认收货-弹出层
   */
  confimReceiving (e) {
    let receingOrderId = e.currentTarget.dataset.id;
    this.setData({
      receingOrderId: receingOrderId,
      hideReceingPopup: false
    })
  },
  /**
   * 对话框-确认收货
   */
  okReceiving () {
    const self = this;
    self.closePopupTap()
    let orderId = self.data.receingOrderId;
    let params = { order_id: orderId, action: 'affirm' };
    WXAPI.changeOrder(params).then(res => {
      // 重新提交成功后再次请求列表接口
      self.getOrderList()
    })
  },
  /**
   * 关闭对话框
   */
  closePopupTap () {
    this.setData({
      hideReceingPopup: true,
      hideServicePopup: true
    })
  }
})