// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
// const API_BASE_URL = 'https://api.it120.cc'
const API_BASE_URL = 'http://47.105.53.172'

const request = (url, needSubDomain, method, data, isJson) => {
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
      complete(aaa) {
        // 加载完成
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

module.exports = {
  request,
  login: (code) => {
    return request('/wechat_login', true, 'post', {
      code,
      type: 2
    })
  },
  register: (data) => {
    return request('/user/wxapp/register/complex', true, 'post', data)
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