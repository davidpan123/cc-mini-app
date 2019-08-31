const WXAPI = require('../../wxapi/main')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodId: '',
    msg: '',
    selectIndex: 0,
    logisticsList: [],
    addInfo: null,
    address: null,
    good: null,
    hideShopPopup: true,
    logitic: null,
    skuLabel: '',
    goodPrice: '',
    sku: {
      skuId: '',
      num: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({goodId, ...options}) {
    this.data.sku = options
    this.setData({
      goodId: goodId,
      sku: options
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
    this.getAddress()
    this.getLogistics()
    this.getGoodDetail()
  },
  getGoodDetail() {
    const self = this;
    let params = { id: self.data.goodId }
    WXAPI.getGoodDetail(params).then(res => {
      if(res.status !== 0) return
      // 设置产品描叙
      let skusItem = res.data.skus.find(item => item.sku_id === self.data.sku.skuId)
      let skuLabel = ''
      if (res.data.good_kind === '0') {
        skuLabel = `${skusItem.zhuzuanfenshu};${skusItem.zuanshijingdu};${skusItem.color};${skusItem.guige}`;
      } else if (res.data.good_kind === '1') {
        skuLabel = `${skusItem.zhushimingcheng};${skusItem.zhushipingji};${skusItem.color};${skusItem.guige}`;
      } else {
        skuLabel = `${skusItem.jinleixing};${skusItem.jinzhong};${skusItem.guige}`;
      }
      self.setData({
        goodPrice: skusItem.price,
        skuLabel: skuLabel,
        good: res.data
      })
    })
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
  getLogistics () {
    WXAPI.getLogistics().then(res => {
      if (res && res.data.length) {
        let logisticsList = res.data
        this.setData({
          logisticsList: logisticsList,
          logitic: logisticsList[0]
        })
      }
    })
  },
  /**
   * 路由-编辑地址
   */
  goAddress() {
    wx.navigateTo({
      url: '/pages/edit-address/index'
    })
  },
  /**
   * 提交订单
   */
  submitOrder () {
    if (!this.data.addInfo) return
    // 提交订单成功后
    let params = {
      sku: this.data.sku.skuId,
      num: this.data.sku.num,
      address_id: this.data.addInfo.id,
      logitics_id: this.data.logitic.id,
      yaoqiu: this.data.msg
    }
    WXAPI.confimOrder(params).then(res => {
      if (res.status !== 0) return
      // 跳转支付页面
      wx.navigateTo({
        url: `/pages/cashier/index?orderId=${res.data.order_id}`
      })
    })
  },
  /**
   * 留言输入事件
   */
  msgInput (e) {
    this.setData({
      msg: e.detail.value
    })
  },
  /**
   * 快递选择
   */
  handleSelect (e) {
    this.setData({
      selectIndex: e.currentTarget.dataset.index
    })
  },
  /**
   * 选中物流确定
   */
  saveLogistic () {
    this.closePopupTap ()
  },
  closePopupTap () {
    this.setData({
      hideShopPopup: true
    })
  },
  showLogisticDialog () {
    this.setData({
      hideShopPopup: false
    })
  }
})