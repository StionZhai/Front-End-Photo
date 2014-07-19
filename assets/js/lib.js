// 图片信息格式化
function group(photos) {
  var hash = {};
  for (var i = 0; i < photos.length; i++) {
    var item = transformDate(photos[i].time);
    if (hash[item]) {
      hash[item].push(photos[i]);
    } else {
      hash[item] = [];
      hash[item].push(photos[i]);
    }
  }
  return hash;
}

// 将毫秒时间表示为 YYYY-MM-DD 形式
function transformDate(time) {
  var date = new Date(time);
  date = date.getFullYear() + '-' +
    ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
    '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  return date;
}

/* ajax函数
 * 获得数据
 * data可选
*/
function myAjax(method, url, callback, /*optional*/ data){
  var xhr = null;
  xhr = window.XMLHttpRequest ?
    new XMLHttpRequest() : // code for IE7+, Firefox, Chrome, Opera, Safari
    new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5

  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){
      if (callback) {
        callback(xhr.responseText);
      }
    }
  }
  xhr.open(method, url, true);
  data ? xhr.send(data) : xhr.send();
}

// 获得对象内部信息 , 未完善 , 待续!!
function getObjectInfo(obj) {
  var str = JSON.stringify(obj);
  // str = str.replace('{', '{\n');
  return str;
}

// dom信息获取相关函数
function getScrollTop() { //获取浏览器滚动高度
  return document.documentElement.scrollTop || document.body.scrollTop;
}
function getViewHeight() { //获取可视区域的高度
  return document.documentElement.clientHeight || document.body.clientHeight;
}

// 加载图片函数
function loadImg(elem) {
  elem.lock = elem.lock || 'open'; //资源锁, 解决重复相同的请求
  if (elem.lock == 'open'){
    elem.url = elem.url || 'http://photo-sync.herokuapp.com/photos';
    elem.lock = 'locked';
  } else {
    return;
  }
  console.log(elem.url);
  // 获取图片信息,并显示在页面上
  myAjax('get', elem.url, function (data) {
    var photosInfo = null
    ,   str = '';

    // 将 JSON 字符串转换成对象
    photosInfo = group(JSON.parse(data).photos);

    // 获取下一页图片的 url
    elem.url = JSON.parse(data).nextURL;

    // 组织图片信息
    for (var date in photosInfo) {
      str += '<h3>' + date + '</h3>';
      for (var i = 0; i < photosInfo[date].length; i++) {
        str += '<img src="' + photosInfo[date][i].imageURL + '"';
        // 限制图片大小
        var iHeight = photosInfo[date][i].height;
        var iWidth = photosInfo[date][i].width;
        str += iWidth > iHeight ?
          'width="160" height="' + Math.floor(iHeight / iWidth * 160) + '">' :
          'height="160" width="' + Math.floor(iWidth / iHeight * 160) + '">';

        // 一行中超过5张图片就换行
        var isFive = photosInfo[date].length - i > 1 && (i + 1) % 5 == 0;
        if (isFive) {
          str += '<br>';
        }
      }
    }
    var oDiv = document.createElement('DIV');
    oDiv.innerHTML = str;
    elem.appendChild(oDiv);
    elem.lock = 'open'; //释放资源
  });
}