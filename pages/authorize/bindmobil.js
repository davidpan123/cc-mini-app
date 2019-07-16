const WXAPI = require('../../wxapi/main')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sending: false,
    account: '',
    code: '',
    codeText: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 手机号码输入
   */
  phoneInput (e) {
    this.setData({
      account: e.detail.value
    })
  },
  /**
   * 验证码输入
   */
  codeInput (e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 获取验证码
   */
  getCode () {
    if (!this.data.account) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    }

    if (!util.checkPhone(this.data.account)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    let params = {
      account: this.data.account,
      code: this.data.code
    }

    const _this = this;
    WXAPI.getCode(params).then(res => {
      _this.setData({
        codeText: 59,
        sending: true
      })
      let i = 0;
      let t = setInterval(() => {
        i++;
        _this.setData({
          codeText: 59 - i
        })
        if (i == 59) {
          _this.setData({
            codeText: '重新获取',
            sending: false
          })
          clearInterval(t);
        }
      }, 1000);
    })
  },
  /**
   * 确认提交
   */
  submit () {
    if (!this.data.account) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    }

    if(!this.data.code) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })

      return
    }
    
    WXAPI.login(params).then(res => {
      //手机验证成功后，跳入首页
      wx.navigateTo({
        url: '/pages/home/index'
      })
    }).catch(() => {
      wx.showToast({
        title: '手机号或验证码不正确',
        icon: 'none'
      })
    })
  }
})