const utils = require('../utils/util.js');

const API_BASE = 'https://pic.sogou.com/';
const IMAGE_SEARCH = `${API_BASE}/pics`;
const IMAGE_QUERY = `${API_BASE}/pics/channel/getAllRecomPicByTag.jsp?category=nezha&tag=nezha&start=0&len=16`;

/**
 * 网路请求
 */
function request(url, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/json;charset=utf-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
        },
      data: data,
      success: function (res) {
        console.log('req 200');
        if (res.statusCode === 200) {
          resolve(res.data);
        } else
          if (res.statusCode === 403) {
            console.error('接口没有权限');
          }
        reject();
      },
      fail: function (e) {
        console.error(e);
        reject();
      }
    });
  });
}

/**
 * 搜索
 */
function requestSearch(data) {
  var param =  {
      "query": data.q,
      "mode":1,
      "start": data.start,
      "reqType": "ajax",
      "&reqFrom": "result",
      "tn":16,
  };
  return request(IMAGE_SEARCH, param);
}

/*
* format result
 */
function formatResult(data){
  var images = null;
  if( data.all_items){
    images = data.all_items[0];
  }else{
    images = data.items
  }
  var res = [];
  var ind = 1;
  var res1 = {'images': []};
  console.log(images.length);

  for(var i=0,len=images.length; i< len; i++){
    var image = images[i];
    if(ind > 4){
      ind = 1;
      res.push(res1);
      res1 = {'images': []};
    }
    res1.images.push(image.pic_url);
    ind += 1;
  }
  console.log(res);
  return res
}

module.exports = {
  requestSearch: requestSearch,
   formatResult: formatResult
};
