//获取应用实例
var app = getApp()
Page({
  data: {
    pickerRegionRange: [],
    pickerSelect: [0, 0, 0],
    showRegionStr: '请选择',
    addressData: {}
  },
  initRegionPicker() {
    
  },
  bindchange: function (e) {
    console.log(e)
    const pObject = this.data.pickerRegionRange[0][e.detail.value[0]]
    const cObject = this.data.pickerRegionRange[1][e.detail.value[1]]
    const dObject = this.data.pickerRegionRange[2][e.detail.value[2]]
    const showRegionStr = pObject.name + cObject.name + dObject.name
    this.setData({
      pObject: pObject,
      cObject: cObject,
      dObject: dObject,
      showRegionStr: showRegionStr
    })
  },
  bindcolumnchange: function (e) {
    const column = e.detail.column
    const index = e.detail.value
    console.log('eeee:', e)
    const regionObject = this.data.pickerRegionRange[column][index]
    console.log('bindcolumnchange', regionObject)
    if (column === 2) {
      this.setData({
        pickerRegionRange: this.data.pickerRegionRange
      })
      return
    }
    if (column === 1) {
      this.data.pickerRegionRange[2] = [{ name: '请选择' }]
    }
    if (column === 0) {
      this.data.pickerRegionRange[1] = [{ name: '请选择' }]
      this.data.pickerRegionRange[2] = [{ name: '请选择' }]
    }
    // // 后面的数组全部清空
    // this.data.pickerRegionRange.splice(column+1)
    // 追加后面的一级数组
    WXAPI.nextRegion(regionObject.id).then(res => {
      if (res.code === 0) {
        this.data.pickerRegionRange[column + 1] = res.data
      }
      this.bindcolumnchange({ detail: { column: column + 1, value: 0 } })
    })
  },
  bindSave: function (e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    if (!this.data.pObject || !this.data.cObject) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    // 跳转到结算页面
    wx.navigateBack({})
  },
  onLoad: function (e) {
   
  }
})
