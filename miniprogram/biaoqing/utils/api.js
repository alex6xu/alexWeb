const utils = require('../utils/util.js');

const API_BASE = 'http://api.alexuhui.win/wechat/images';
const IMAGE_SEARCH = `${API_BASE}/search`;
const IMAGE_MORE = `${API_BASE}/:id`;

/**
 * 网路请求
 */
function request(url, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: 'GET',
      data: data,
      timeout: 5,
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else
          if (res.statusCode === 403) {
            console.error('接口没有权限');
          }
        reject();
      },
      fail: function () {
        reject();
      }
    });
  });
}

/**
 * 搜索
 */
function requestSearch(data) {
  return request(IMAGE_SEARCH, data);
}

/**
 * 获取图书详细信息
 */
function requestBookDetail(id, data) {
  return request(IMAGE_MORE.replace(':id', id), data);
}

/**
 * 关键字是否是tag
 */
function requestHasTag(tag) {
  return request(API_BOOK_SEARCH, { tag: tag, count: 1 });
}

module.exports = {
  requestSearch: requestSearch,
  requestBookDetail: requestBookDetail
}
