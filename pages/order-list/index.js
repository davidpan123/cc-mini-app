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
    orderList: []
  },
  statusTap: function (e) {
    const curType = e.currentTarget.dataset.type;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
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
  },
  onShow: function () {
    // 获取订单列表
    let that = this;
    WXAPI.getOrders().then(res => {
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

  }
})