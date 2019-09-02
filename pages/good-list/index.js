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
    skuIndex: {
      scoreIndex: -1,
      clarityIndex: -1,
      colorIndex: -1,
      specIndex: -1
    },
    sku: {
      skuId: '',
      skuScore: [],
      skuClarity: [],
      skuColor: [],
      skuSpec: [],
      merchantCode: '',
      price: 0,
      defaultMerchantCode: '',
      defaultPrice: 0,
      limit: 99,
      count: 1
    },
    pages: 0,
    pageIndex: 1 ,
    pageSize: 10,
    goodList: [],
    goodId: ''
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

    this.getGoodList()
  },

  onShow: function () {
  },
  scrollBottom: function () {
    for (var i = 0; i < this.data.goodList.length; ++i) {
      if (this.data.goodList[i].goods_id === this.data.toView) {
        this.setData({
          toView: this.data.goodList[i + 1] ? this.data.goodList[i + 1].goods_id : this.data.goodList[i]
        })
        break
      }
    }
  },
  getGoodList () {
    let params = { page: this.data.pageIndex, size: this.data.pageSize, channel: '2'}
    WXAPI.getGoodList(params).then(res => {
      this.setData({
        pages: res.data.pages,
        goodList: this.data.goodList.concat(res.data.list)
      })
    })
  },
  getGoodDetail () {
    const self = this;
    let params = { id: self.data.goodId}
    WXAPI.getGoodDetail(params).then(res => {
      self.setData({
        res: res.data
      })
      let skuScore = [];
      let skuClarity = [];
      let skuColor = [];
      let skuSpec = [];

      self.data.res.skus.forEach((item, index) => {
        if (!index) {
          self.data.sku.defaultPrice = item.price;
          self.data.sku.defaultMerchantCode = item.merchant_code;
        }

        // good_kind（'0'：钻石， '1'： 主石， '2'： 素金）
        if (res.data.good_kind === '0') {
          if (item.zhuzuanfenshu) {
            skuScore.push(item.zhuzuanfenshu);
          }
          if (item.zuanshijingdu) {
            skuClarity.push(item.zuanshijingdu);
          }
        } else if (res.data.good_kind === '1') {
          if (item.zhushimingcheng) {
            skuScore.push(item.zhushimingcheng);
          }
          if (item.zhushipingji) {
            skuClarity.push(item.zhushipingji);
          }
        } else {
          if (item.jinleixing) {
            skuScore.push(item.jinleixing);
          }
          if (item.jinzhong) {
            skuClarity.push(item.jinzhong);
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
        if (res.data.good_kind === '0') {
          item.skuIds = [
            skuScore.indexOf(item.zhuzuanfenshu),
            skuClarity.indexOf(item.zuanshijingdu),
            skuColor.indexOf(item.color),
            skuSpec.indexOf(item.guige)
          ].join('_');
        } else if (res.data.good_kind === '1') {
          item.skuIds = [
            skuScore.indexOf(item.zhushimingcheng),
            skuClarity.indexOf(item.zhushipingji),
            skuColor.indexOf(item.color),
            skuSpec.indexOf(item.guige)
          ].join('_');
        } else {
          item.skuIds = [
            skuScore.indexOf(item.jinleixing),
            skuClarity.indexOf(item.jinzhong),
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
    })
  },
  setSkuStatus () {
    let { scoreIndex, clarityIndex, colorIndex, specIndex } = this.data.skuIndex
    let selectIndexes = [scoreIndex, clarityIndex, colorIndex, specIndex];
    [this.data.sku.skuScore, this.data.sku.skuClarity, this.data.sku.skuColor, this.data.sku.skuSpec].forEach((type, typeIndex) => {
      type.forEach((item, index) => {
        let arr = Object.assign([], selectIndexes);
        arr[typeIndex] = index;
        let reg = new RegExp(arr.join('_').replace(/-1/g, '[\\d]'), 'g');
        let result = this.data.res.skus.filter(sku => {
          return reg.test(sku.skuIds);
        });
        item.disabled = !result.length;
      });
    });
    if(!selectIndexes.includes(-1)) {
      let skuItem = this.data.res.skus.find(item => item.skuIds === selectIndexes.join('_'))
      if (skuItem) {
        this.data.sku.skuId = skuItem.sku_id
        this.setData({
          sku: this.data.sku
        })
      }
    } else {
      this.data.sku.skuId = ''
      this.setData({
        sku: this.data.sku
      })
    }
  },
  selectIndex (item, index, type) {
    if(!item.disabled) {
      if(this.data.skuIndex[type] === index) {
        this.data.skuIndex[type] = -1
      } else {
        this.data.skuIndex[type] = index
      }
    }
    this.setData({
      skuIndex: this.data.skuIndex
    })
    this.setSkuStatus()
  },
  /**
   * 选择类型(钻石分数、主石名称、金类型)
   */
  selectedType (e) {
    let item = e.currentTarget.dataset['item']
    let index = e.currentTarget.dataset['index']
    this.selectIndex(item, index, 'scoreIndex')
  },
  /**
   * 选择level(钻石进度、主石评级、金重)
   */
  selectedLevel(e) {
    let item = e.currentTarget.dataset['item']
    let index = e.currentTarget.dataset['index']
    this.selectIndex(item, index, 'clarityIndex')
  },
  /**
   * 选择颜色
   */
  selectedColor(e) {
    let item = e.currentTarget.dataset['item']
    let index = e.currentTarget.dataset['index']
    this.selectIndex(item, index, 'colorIndex')
  },
  /**
   * 选择规格
   */
  selectedSpec(e) {
    let item = e.currentTarget.dataset['item']
    let index = e.currentTarget.dataset['index']
    this.selectIndex(item, index, 'specIndex')
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
    if (!this.data.sku.skuId) {
      wx.showModal({
        title: '提示',
        content: '亲, 请完善商品参数的选择!',
        showCancel: false
      })
      return
    }
    // 购买操作
    this.closePopupTap()
    // 购买操作
    // 成功后跳转确认订单页面
    wx.navigateTo({
      url: `/pages/confirm-order/index?skuId=${this.data.sku.skuId}&num=${this.data.sku.count}&goodId=${this.data.goodId}`
    })
  },
  /**
   * 显示购买对话框
   */
  showPayDialog (e) {
    this.setData({
      goodId: e.currentTarget.id
    })
    
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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1
    })
    this.getGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 加载更多
   */
  loadMore () {
    if (this.data.pageIndex < this.data.pages) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getGoodList()
    }
  }
})