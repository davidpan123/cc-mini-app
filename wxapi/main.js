// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
// const API_BASE_URL = 'https://api.it120.cc'
const API_BASE_URL = 'http://47.105.53.172'

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
        'X-AUTH-USER': '1000177',
        // 'X-AUTH-TOKEN': wx.getStorageSync('token')
        'X-AUTH-TOKEN': 'c56b1a74-65e5-4730-8fc0-6a93a2eb8474',
        'Content-Type': isJson ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8'
        //  Content-Type："json"
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
  if (statusCode === '401') {
    wx.navigateTo({
      url: '/pages/authorize/index'
    })
    wx.removeStorageSync('token')
  }
}

module.exports = {
  request,
  start: (data) => {
    return request('/start', true, 'get', data, true)
  },
  wechat_login: (data) => {
    return request('/wechat_login', true, 'post', data, true)
  },
  getUserInfo: () => {
    return request('/user_info', true, 'get')
  },
  register: (data) => {
    return request('/user/wxapp/register/complex', true, 'post', data)
  },
  getAddress: (data) => {
    return request('/address', true, 'get')
  },
  addAdress: (addAdress) => {
    return request('/address', true, 'post', data, true)
  },
  setAddress: (data) => {
    return request('/address', true, 'put', data, true)
  },
  getProvince: () => {
    return request('/province', true, 'get', '', true)
  },
  getCity: (data) => {
    return request('/city', true, 'get', data, true)
  },
  getDistrict: (data) => {
    return request('/district', true, 'get', data, true)
  },
  getOrders: ()=> {
    return request('/my/orders', true, 'get', '', true)
  },
  getOrderDetail: (data) => {
    return request('/order/detail/:id', true, 'get', data, true)
  },
  changeOrder: (data) => {
    return request('/change_order', true, 'post', data, true)
  },
  getGoodList: (data) => {
    return request('/goods', true, 'get', data, true)
  },
  //获取商品详情
  getGoodDetail: (data) => {
    return request('/goods/detail/:id', true, 'get', data, true)
  },
  //获取某个sku的库存
  getGoodsStock: (data) => {
    return request('/goods_stock', true, 'get', data, true)
  },
  uploadFile: (token, tempFilePath) => {
    const uploadUrl = API_BASE_URL + '/' + CONFIG.subDomain + '/dfs/upload/file'
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: uploadUrl,
        filePath: tempFilePath,
        name: 'upfile',
        formData: {
          'token': token
        },
        success(res) {
          resolve(JSON.parse(res.data))
        },
        fail(error) {
          reject(error)
        },
        complete(aaa) {
          // 加载完成
        }
      })
    })
  }
}