
//格式化日期
Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
    }
  }
  return fmt;
};

//格式化日期
const formatDate = (nS, format) => {
  //日期格式化
  if (!nS) {
    return '';
  }
  format = format || 'yyyy-MM-dd hh:mm:ss';
  if (typeof nS == 'string') {
    nS = nS.replace(/-/g, '/');
    if (nS.indexOf('.') != -1) {
      nS = nS.substr(0, nS.indexOf('.'));
    }
  }
  return new Date(nS).format(format);
}

module.exports = {
  formatDate: formatDate
}
