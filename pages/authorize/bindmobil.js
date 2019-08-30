const WXAPI = require('../../wxapi/main')
const util = require('../../utils/util.js')
let app = getApp()
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
      action: 'bind',
      phone: this.data.account
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

    console.log(app)
    let { nickName, avatarUrl, gender } = app.globalData.userInfo
    let params = {
      nick_name: nickName,
      avatar: avatarUrl,
      gender: gender,
      openid: wx.getStorageSync('open_id'),
      phone: this.data.account,
      vcode: this.data.code
    }
    
    WXAPI.bindMobile(params).then(res => {
      if (res.status !== 0) return
      
      // 微信验证成功后存下token
      if (res.data.token) {
        wx.setStorageSync('token', res.data.token)
      }
      // 存下用户id
      if (res.data.user_id) {
        wx.setStorageSync('user_id', res.data.user_id)
      }

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