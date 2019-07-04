//获取应用实例
const WXAPI = require('../../wxapi/main')
var app = getApp()
Page({
  data: {
    hideShopPopup: true,
    adList: [],
    addId: 1, //1:省份选择; 2:市区； 3：地区
    selectedIndex: -1, //选中的省市区在列表中的index
    chIndex: 1,
    provinceId: '', //选择的省份id
    cityId: '', //选择的市id
    address: '', //展示给用户的地址
    reqData: {
      phone: '',//手机号
      province: '北京市',//省
      name: '',//姓名
      city: '北京市',//市
      street: '',//街道
      code: '0',
      district: '朝阳区'//区
    }
  },
  selectAddress: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 获取省份
   */
  getProvince: function () {  
    let self = this
    WXAPI.getProvince().then(function (res) {
      self.setData({
        adList: res.data
      })
    })
  },
  getCity: function () {
    let self = this
    WXAPI.getCity({ pre: this.data.provinceId }).then(function (res) {
      self.setData({
        adList: res.data
      })
    })
  },
  getDistrict: function() {
    let self = this
    WXAPI.getDistrict({ pre: this.data.cityId }).then(function (res) {
      self.setData({
        adList: res.data
      })
    })
  },
  addRessClick: function (e) {
    let index = e.currentTarget.dataset['index'];
    this.setData({
      selectedIndex: -1,
      chIndex: index
    })
    if(index == 1) {
      this.getProvince();
      this.setData({
        addId: 1,
        chIndex: index
      })
    } else if(index == 2 && this.data.addId == 2) {
      this.getCity();
    } else if(index == 3 && this.data.addId == 3) {
      this.getDistrict();
    }
  },
  choice: function(e) {
    let index = e.currentTarget.dataset['index'];
    let item = e.currentTarget.dataset['item'];
    this.setData({
      selectedIndex: index,
    })
    if(this.data.addId == 1) {
      let reqData = this.data.reqData
      reqData.province = item.name
      this.setData({
        addId: 2,
        chIndex: 2,
        provinceId: item.id,
        reqData: reqData
      })
      this.getCity();
      this.setData({
        selectedIndex: -1
      })
    } else if(this.data.addId == 2) {
      let reqData = this.data.reqData
      reqData.city = item.name
      this.setData({
        addId: 3,
        chIndex: 3,
        cityId: item.id,
        reqData: reqData
      })
      this.getDistrict();
      this.setData({
        selectedIndex: -1
      })
    } else {
      let reqData = this.data.reqData
      reqData.district = item.name
      this.setData({
        reqData: reqData
      })
    }
  },
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  confirm: function() {
    let address = this.data.reqData.province + '-' + this.data.reqData.city + '-' + this.data.reqData.district;
    this.setData({
      address: address
    })
   this.closePopupTap()
  },
  nameInput (e) {
    let reqData = this.data.reqData
    reqData.name = e.detail.value
    this.setData({
      reqData: reqData
    })
  },
  phoneInput (e) {
    let reqData = this.data.reqData
    reqData.phone = e.detail.value
    this.setData({
      reqData: reqData
    })
  },
  streetInput (e) {
    let reqData = this.data.reqData
    reqData.street = e.detail.value
    this.setData({
      reqData: reqData
    })
  },
  bindSave: function (e) {
    console.log(this.data.reqData)
    var that = this;
    // var linkMan = e.detail.value.linkMan;
    // var address = e.detail.value.address;
    // var mobile = e.detail.value.mobile;
    // if (linkMan == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写联系人姓名',
    //     showCancel: false
    //   })
    //   return
    // }
    // if (mobile == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写手机号码',
    //     showCancel: false
    //   })
    //   return
    // }
    // if (!this.data.pObject || !this.data.cObject) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请选择地区',
    //     showCancel: false
    //   })
    //   return
    // }
    // if (address == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写详细地址',
    //     showCancel: false
    //   })
    //   return
    // }
    // // 跳转到结算页面
    // wx.navigateBack({})
  },
  onLoad: function (e) {
   
  },
  onShow: function (e) {
    this.getProvince()
  }
})
