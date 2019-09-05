const WXAPI = require('../../wxapi/main')
Page({
  data: {
    appName: 'CC卡美珠宝',
    orderList: []
  },
  onLoad: function () {
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    // 获取订单列表
    WXAPI.getOrders({source: 2}).then(res => {
      wx.hideLoading();
      if (res.status !== 0) return
      let orders = res.data;
      orders = orders.filter(order => {
        return order.status === 4 || order.status === 6 || order.status === 8;
      });
      orders.forEach(order => {
        order.statusName = order.status === 4 ? '退款中' : (order.status === 8 ? '已取消' : '已退款');
        order.goods.forEach(item => {
          if (item.good_kind === '0') {
            item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.color};${item.guige}`;
          } else if (item.good_kind === '1') {
            item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.color};${item.guige}`;
          } else {
            item.skuLabel = `${item.jinleixing};${item.jinzhong};${item.guige}`;
          }
        });
      });

      this.setData({
        orderList: orders
      })
    })
  },
  goOrderDetail(e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-detail/index?orderId=' + orderId,
    })
  },
  /**
  * 查看退款
  */
  goRefundDetail(e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/refund-detail/index?orderId=' + orderId,
    })
  },
  /**
   * 联系客服
   */
  contactService() {

  }
})