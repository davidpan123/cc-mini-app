const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: {
      number: '',
      code: ''
    },
    codeText: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 确认提交
   */
  submit () {
    // 提交成功后获取token
  }
})