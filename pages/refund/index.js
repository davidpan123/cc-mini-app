const WXAPI = require('../../wxapi/main')
Page({
  data: {
    appName: 'CC卡美珠宝',
    orderList: []
  },
  cancelOrderTap: function (e) {
    const that = this;
    const orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          WXAPI.orderClose(orderId, wx.getStorageSync('token')).then(function (res) {
            if (res.code == 0) {
              that.onShow();
            }
          })
        }
      }
    })
  },
  onLoad: function () {
  },
  onShow: function () {
    // 获取订单列表
    let that = this;
    WXAPI.getOrders({source: 2}).then(res => {
      let orders = res.data;
      orders = orders.filter(order => {
        return order.status === 4 || order.status === 6 || order.status === 8;
      });
      orders.forEach(order => {
        order.statusName = order.status === 4 ? '退款中' : (order.status === 8 ? '已取消' : '已退款');
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
  goOrderDetail(e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-detail/index?orderId=' + orderId,
    })
  },
  /**
  * 查看退款
  */
  goRefundDetail() {
    wx.navigateTo({
      url: '/pages/refund-detail/index'
    })
  },
  /**
   * 联系客服
   */
  contactService() {

  }
})