export function deepcopy (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
}
export function isNumber (data) {
  return typeof data === 'number' ? true : false
}
export function isString (data) {
  return typeof data === 'string' ? true : false
}
export function isNullObj (obj) {
  if(typeof obj != 'object') return false
  if(typeof obj.length == 'undefined'){
    for(var key in obj){
      return false
    }
    return true
  }else{
    return obj.length == 0 ? true : false
  }
}
// 去除数组中字符串元素的首尾空格
export function trimArray (arr) {
  var _arr = [],i,len=arr.length,item
  for(i=0;i<len;i++){
    item=arr[i]
    if(typeof item == 'string'){
      _arr.push(item.trim())
    }else{
      _arr.push(item)
    }
  }
  return _arr
}

// 前置扩展某方法
export function prependFn (fn, prevfn) {
  return function () {
    prevfn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}
// 后置扩展某方法
export function appendFn (fn, nextfn) {
  return function () {
    fn.apply(this, arguments)
    return nextfn.apply(this, arguments)
  }
}
export function getChinaJsonByData (chinaData) {
  var data = {
    '100000': {}
  }
  for (var i = 0; i < chinaData.length; i++) {
    data['100000'][chinaData[i].value] = chinaData[i].label
    var cityMap = {}
    for (var j = 0; j < chinaData[i].children.length; j++) {
      cityMap[chinaData[i].children[j].value] = chinaData[i].children[j].label
      var areaMap = {}
      for (var k = 0; k < chinaData[i].children[j].children.length; k++) {
        areaMap[chinaData[i].children[j].children[k].value] = chinaData[i].children[j].children[k].label
      }
      data[chinaData[i].children[j].value] = areaMap
    }
    data[chinaData[i].value] = cityMap
  }
  return data
}
export function getChinaDataByJson (chinaJson) {
  var data = []
  for (var province in chinaJson['100000']) {
    data.push({
      'value': province,
      'label': chinaJson['100000'][province],
      children: []
    })
    for (var city in chinaJson[province]) {
      for (var i = 0; i < data.length; i++) {
        if (city.toString().slice(0, 2) + '0000' === data[i].value) {
          data[i].children.push({
            'value': city,
            'label': chinaJson[province][city],
            children: []
          })
        }
      }
      for (var area in chinaJson[city]) {
        for (var j = 0; j < data.length; j++) {
          for (var k = 0; k < data[j].children.length; k++) {
            if (area.toString().slice(0, 4) + '00' === data[j].children[k].value) {
              data[j].children[k].children.push({
                'value': area,
                'label': chinaJson[city][area],
                children: []
              })
            }
          }
        }
      }
    }
  }
  return data
}
export function getProvinceDataByData(chinaData) {
  let provinceData = []
  let _chinaData = deepcopy(chinaData)
  _chinaData.forEach(item => {
    item.children = []
  })
  provinceData = _chinaData
  return provinceData
}
export function getCityDataByData (chinaData) {
  let cityData = []
  let _chinaData = deepcopy(chinaData)
  _chinaData.forEach(item => {
    item.children.forEach(child => {
      child.children = []
    })
  })
  cityData = _chinaData
  return cityData
}
export function getAddrByCityId (chinaJson, cityId) {
  return [
    chinaJson[cityId.toString().slice(0, 2) + '0000'],
    chinaJson.cityId
  ]
}
export function getAddrByAreaId (chinaJson, areaId) {
  return [
    chinaJson[areaId.toString().slice(0, 2) + '0000'],
    chinaJson[areaId.toString().slice(0, 4) + '00'],
    chinaJson.areaId
  ]
}
// 获取省市区文字
export function getProvinceCityArea(addressCodeArr, chinaJson, getAll) {
  let provinceTxt = '',
    cityTxt = '',
    areaTxt = '',
    returnTxt = '',
    len = addressCodeArr.length
  if (len == 3) {
    provinceTxt = chinaJson['100000'][addressCodeArr[0]]
    cityTxt = chinaJson[addressCodeArr[0]][addressCodeArr[1]]
    areaTxt = chinaJson[addressCodeArr[1]][addressCodeArr[2]]
    returnTxt = getAll ? provinceTxt + cityTxt + areaTxt : areaTxt
  } else if (len == 2) {
    provinceTxt = chinaJson['100000'][addressCodeArr[0]]
    cityTxt = chinaJson[addressCodeArr[0]][addressCodeArr[1]]
    returnTxt = getAll ? provinceTxt + cityTxt : cityTxt
  } else if(len == 1){
    returnTxt = chinaJson['100000'][addressCodeArr[0]]
  }else{
    returnTxt = ''
  }
  return returnTxt
}

// 将扁平的无序的无限分类数据整理成：
// “多维树状（data.unflat）”和“扁平树状（data.flat）”两种数据
export function genTreeData (data, opt) {
    var opt = opt || { idField: 'id', parentField: 'pid', textField: 'name' };
    var idField, textField, parentField, tmpMap = {};
    idField = opt.idField || 'id';
    textField = opt.textField || 'name';
    var unflatten = function () {
      if (opt.parentField) {
        parentField = opt.parentField;
        var i, l, treeData = [];
        for (i = 0, l = data.length; i < l; i++) {
          data[i].label = data[i][textField];
          data[i].value = data[i][idField];
          tmpMap[data[i][idField]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
          if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
            if (!tmpMap[data[i][parentField]]['children']) {
              tmpMap[data[i][parentField]]['children'] = [];
            }
            data[i]['text'] = data[i][textField];
            var hasEle = (function () {
              var ret = false;
              tmpMap[data[i][parentField]]['children'].forEach(ele=> {
                if (ele[idField] == data[i][idField]) {
                  ret = true;
                  return false;
                }
              })
              return ret;
            })();
            if (hasEle == false) {
              tmpMap[data[i][parentField]]['children'].push(data[i]);
            }
          } else {
            data[i]['text'] = data[i][textField];
            treeData.push(data[i]);
          }
        }
        return treeData;
      }
      return data;
    };
    // console.log('转换为Select处理的数据unflatten(): ',unflatten())
    var flatten = function () {
      var arr = [];
      var flattenIt = function (data, _level) {
        for (var i = 0; i < data.length; i++) {
          var _levelSub = _level + 1;
          var ele = tmpMap[data[i][idField]];
          ele.level = _level;
          arr.push(ele);
          if ('children' in data[i] && data[i].children.length > 0) {
            flattenIt(data[i].children, _levelSub);
          }
        }
      };
      flattenIt(unflatten(), 0);
      return arr;
    };
    return {
      flat: flatten(),
      unflat: unflatten()
    };
}

// 处理扁平树状数据，为iview的 Select组件 使用
export function formatSelectData (arr) {
  var _arr = [];
  arr.forEach(ele => {
    var _objItem = {};
    var label = ele.name || '';
    var nullStr = '　　';
    if (typeof(ele.level) != 'undefined' && isNaN(ele.level) == false) {
        // 生成多个全角空格
        label = str_repeat(nullStr, ele.level)  + label;
    }
    _objItem = {
        label: label,
        value: String(ele.id),
        id: String(ele.id),
        pId: ele.pId || ''
    };
    _arr.push(_objItem);
  })
  return _arr;
}

export function str_repeat (str, num) {
  return new Array(num + 1).join(str);
}
// 时间戳转时间
export function timestampToTime(timestamp) {
  if(typeof timestamp == 'string'){
    return timestamp
  }
  var timeStr = '' + timestamp;
  var myTimestamp = timeStr.length == 10 ? timestamp*1000 : timestamp;
  var date = new Date(myTimestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate()<10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}
export function isIOS9 () {
  //获取固件版本
  var getOsv = function () {
    var reg = /OS ((\d+_?){2,3})\s/;
    if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
        var osv = reg.exec(navigator.userAgent);
        if (osv.length > 0) {
            return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
        }
    }
    return '';
  };
  var osv = getOsv();
  var osvArr = osv.split('.');
  //初始化显示ios9引导
  if (osvArr && osvArr.length > 0) {
      if (parseInt(osvArr[0]) >= 9) {
          return true
      }
  }
  return false
}
export function isWeiXin (){
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') != -1 ? true : false
}
export function isIos(){
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/(iPhone|iPod|iPad);?/i) ? true : false
}
export function isAndroid(){
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/android/i) ? true : false
}
export function isQQ(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.indexOf('qq') > -1){
    if(/nettype/i.test(ua)){
      if(/micromessenger/i.test(ua)){
        return true;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }
  return false;
}
// 获取农历
export function getNongLi(_date,format){
  var date = new Date()
  if(_date){
    // 传参为指定object或string类型的时间   获取指定日期的农历
    date = typeof(_date) == 'object' ? _date : new Date(_date)
  }
  var d = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ],
    m = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    yy = date.getFullYear(),
    mm = date.getMonth() + 1,
    dd = date.getDate(),
    ww = date.getDay(),
    ss = parseInt(date.getTime() / 1000)
    if (yy < 100) yy = "19" + yy
    

    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
      return (m >> n) & 1;
    }
    function e2c() {
      TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true; break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }

    function GetcDateString() {
      var tmp = "";
      // tmp += tgString.charAt((cYear - 4) % 10);
      // tmp += dzString.charAt((cYear - 4) % 12);
      // tmp += "(";
      // tmp += sx.charAt((cYear - 4) % 12);
      // tmp += ")年 ";
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
      //solarYear = solarYear<1900?(1900+solarYear):solarYear;
      if (solarYear < 1921 || solarYear > 2020) {
        return "";
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }
    var str = GetLunarDay(yy, mm, dd)
    var _str = mm + '月' + dd + '日  ' + d[ww] + '  农历' + str
    return _str
}


export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
export function dateFtt(fmt,date){ 
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "H+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
// export function 
// export function 
// export function 
