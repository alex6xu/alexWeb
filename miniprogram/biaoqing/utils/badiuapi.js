const API_BASE = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=:keyward'+
    '&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=:keyword&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=10&rn=30';
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
