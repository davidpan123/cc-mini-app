const WXAPI = require('../../wxapi/main')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hideShopPopup: true,
    toView: 'dssdsd22',
    windowHeight: '',
    res: null,
    isZuan: false,
    sku: {
      skuScore: [],
      skuClarity: [],
      skuColor: [],
      skuSpec: [],
      merchantCode: '',
      price: 0,
      defaultSKU: '',
      defaultMerchantCode: '',
      defaultPrice: 0,
      limit: 99,
      count: 1,
      skuId: '',
      selectedSku: '',
      stock: 0 //经销库存
    },
    goodList: [
      {
        id: 'sdd111',
        src: '/images/card1.png'
      },
      {
        id: 'dssdsd22',
        src: '/images/card2.png'
      },
      {
        id: 'sdd111333',
        src: '/images/card1.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // scrollviw 设置高度，否则无法跳转到指定位置
    wx.getSystemInfo({
      success: function (res) {
        // 高度 单位为px
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })

    // 设置滚动位置
    this.setData({
      toView: options.id
    })
  },

  onShow: function () {
  },
  scrollBottom: function () {
    for (var i = 0; i < this.data.goodList.length; ++i) {
      if (this.data.goodList[i].id === this.data.toView) {
        this.setData({
          toView: this.data.goodList[i + 1] ? this.data.goodList[i + 1].id : this.data.goodList[i]
        })
        break
      }
    }
  },
  getGoodDetail () {
    const self = this;
    let params = { id: '5be14683a2154f6a355108e0'}
    WXAPI.getGoodDetail(params).then(res => {
      self.setData({
        res: res.data,
        isZuan: res.data.is_diamond
      })
      let skuScore = [];
      let skuClarity = [];
      let skuColor = [];
      let skuSpec = [];

      self.data.res.skus.forEach((item, index) => {
        if (!index) {
          self.data.sku.defaultSKU = item.sku_id; //默认第1条是默认sku
          self.data.sku.defaultPrice = item.price;
          self.data.sku.defaultMerchantCode = item.merchant_code;
          self.getGoodsStock(item.sku_id, stock => {
            self.data.sku.stock = stock;
            self.setData({
              sku: self.data.sku
            })
          });
        }
        if (self.data.isZuan) {
          if (item.zhuzuanfenshu) {
            skuScore.push(item.zhuzuanfenshu);
          }
          if (item.zuanshijingdu) {
            skuClarity.push(item.zuanshijingdu);
          }
        } else {
          if (item.zhushimingcheng) {
            skuScore.push(item.zhushimingcheng);
          }
          if (item.zhushipingji) {
            skuClarity.push(item.zhushipingji);
          }
        }
        if (item.color) {
          skuColor.push(item.color);
        }
        if (item.guige) {
          skuSpec.push(item.guige);
        }
      });

      skuScore = [...new Set(skuScore)];
      skuClarity = [...new Set(skuClarity)];
      skuColor = [...new Set(skuColor)];
      skuSpec = [...new Set(skuSpec)];

      self.data.res.skus.forEach(item => {
        if (self.data.isZuan) {
          item.skuIds = [
            skuScore.indexOf(item.zhuzuanfenshu),
            skuClarity.indexOf(item.zuanshijingdu),
            skuColor.indexOf(item.color),
            skuSpec.indexOf(item.guige)
          ].join('_');
        } else {
          item.skuIds = [
            skuScore.indexOf(item.zhushimingcheng),
            skuClarity.indexOf(item.zhushipingji),
            skuColor.indexOf(item.color),
            skuSpec.indexOf(item.guige)
          ].join('_');
        }
      });

      self.data.sku.skuScore = skuScore.map(item => ({ label: item, disabled: false }));
      self.data.sku.skuClarity = skuClarity.map(item => ({ label: item, disabled: false }));
      self.data.sku.skuColor = skuColor.map(item => ({ label: item, disabled: false }));
      self.data.sku.skuSpec = skuSpec.map(item => ({ label: item, disabled: false }));
      self.setData({
        sku: self.data.sku
      })

      console.log(self.data.sku)
    })
  },
  getGoodsStock(skuId, cb) {
    let params = { sku: skuId }
    WXAPI.getGoodsStock(params).then(res => {
      cb(res.data.stock);
    })
  },
  minute () {
    if (this.data.sku.count > 1) {
      this.data.sku.count--
      this.setData({
        sku: this.data.sku
      })
    }
  },
  plus () {
    if (this.data.sku.count < this.data.sku.limit) {
      this.data.sku.count++
      this.setData({
        sku: this.data.sku
      })
    }
  },
  /**
   * 确认购买
   */
  confirmBuy () {
    // 购买操作
    this.closePopupTap()
    // 购买操作
    // 成功后跳转确认订单页面
    wx.navigateTo({
      url: '/pages/confirm-order/index'
    })
  },
  /**
   * 显示购买对话框
   */
  showPayDialog () {
    //获取商品详情，设置购买参数
    this.getGoodDetail();
    this.setData({
      hideShopPopup: false
    })
  },
  closePopupTap () {
    this.setData({
      hideShopPopup: true
    })
  },
  /**
   * 跳转首页
   */
  goHome () {
    wx.navigateTo({
      url: '/pages/home/index'
    })
  },
  /**
   * 跳转个人中心
   */
  goUserCenter () {
    wx.navigateTo({
      url: '/pages/my/index'
    })
  }
})