// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://shoptest.cc-jewel.com'

const request = (url, needSubDomain, method, data, isJson) => {
  if (/:id/.test(url)) {
    url = url.replace(':id', data.id);
    delete data.id
  }
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'X-AUTH-USER': wx.getStorageSync('user_id'),
        'X-AUTH-TOKEN': wx.getStorageSync('token'),
        'Content-Type': isJson ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(res) {
        // 加载完成
        checkStatus(res)
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

//检查接口请求状态
function checkStatus(res) {
  if (res.statusCode === 200 && res.data.status === 0) return
  let message = ''
  let statusCode = res.statusCode;
  switch (statusCode) {
    case 400:
      message = '错误请求';
      break;
    case 401:
      message = '未授权，请重新登录';
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '请求错误, 未找到该资源';
      break;
    case 405:
      message = '请求方法未允许';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '服务器端出错';
      break;
    case 501:
      message = '网络未实现';
      break;
    case 502:
      message = '网络错误';
      break;
    case 503:
      message = '服务不可用';
      break;
    case 504:
      message = '网络超时';
      break;
    case 505:
      message = 'http版本不支持该请求';
      break;
    default:
      message = `${res.data.msg}`;
  }

  wx.showToast({
    title: message,
    icon: 'none'
  })
  // 认证失败,请重新登陆
  if (statusCode === 401) {
    wx.navigateTo({
      url: '/pages/authorize/index'
    })
    wx.removeStorageSync('token')
  }
}

module.exports = {
  request,
  start: (data) => {
    return request('/xcx/start', true, 'get', data, true)
  },
  wechat_login: (data) => {
    return request('/xcx/login', true, 'post', data, false)
  },
  getCode: (data) => {
    return request('/v1/vcode', true, 'get', data, true)
  },
  bindMobile: (data) => {
    return request('/xcx/update_user', true, 'post', data, false)
  },
  getUserInfo: () => {
    return request('/user_info', true, 'get')
  },
  register: (data) => {
    return request('/user/wxapp/register/complex', true, 'post', data)
  },
  getAddress: () => {
    return request('/xcx/address', true, 'get')
  },
  addAdress: (data) => {
    return request('/xcx/address', true, 'post', data, false)
  },
  setAddress: (data) => {
    return request('/xcx/address', true, 'put', data, true)
  },
  getProvince: () => {
    return request('/xcx/province', true, 'get', '', true)
  },
  getCity: (data) => {
    return request('/xcx/city', true, 'get', data, true)
  },
  getDistrict: (data) => {
    return request('/xcx/district', true, 'get', data, true)
  },
  getOrders: (data)=> {
    return request('/xcx/my/orders', true, 'get', data, true)
  },
  getOrderDetail: (data) => {
    return request('/xcx/order/detail/:id', true, 'get', data, true)
  },
  changeOrder: (data) => {
    return request('/xcx/change_order', true, 'post', data, false)
  },
  getGoodList: (data) => {
    return request('/xcx/goods', true, 'get', data, true)
  },
  //获取商品详情
  getGoodDetail: (data) => {
    return request('/xcx/goods/detail/:id', true, 'get', data, true)
  },
  getLogistics: () => {
    return request('/xcx/logitics', true, 'get', '', true)
  },
  confimOrder: (data) => {
    return request('/xcx/buy_now', true, 'post', data, false)
  },
  getPayId: (data) => {
    return request('/xcx/pay_prepare', true, 'post', data, false)
  },
  pay: (data)=> {
    return request('/xcx/pay_submit', true, 'post', data, false)
  }
}