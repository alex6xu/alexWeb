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
        "Content-Type": "application/json;charset=utf-8"
        },
      data: data,
      success: function (res) {
        // console.log('req 200');
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
      "query": data.q + ' 表情包',
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
  // console.log(images.length);

  for(var i=0,len=images.length; i< len; i++){
    var image = images[i];
    if (!checkImageUrl(image.thumbUrl)){
      continue;
    }
    if(ind > 4){
      ind = 1;
      res.push(res1);
      res1 = {'images': []};
    }
    res1.images.push(image.thumbUrl);
    ind += 1;
  }
  // console.log(res);
  return res
}

function checkImageUrl(url){
  console.info(url);
  if ((url.indexOf('sogoucdn') == -1) && (url.indexOf('sinaimg') == -1)){
    console.log('not vaild');
    return false;
  }
  return true;
}

module.exports = {
  requestSearch: requestSearch,
   formatResult: formatResult
};
