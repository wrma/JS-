
//基本的xhr用法
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    // 0 未启动 ，1 启动，2 发送，3 接受 ，4 完成
    if (xhr.readyState === 4){
        if (xhr.status >= 200 && xhr.status <300 || xhr.status === 304){
            console.log('success');
        }
        else {
            console.log('fail');
        }
    }
};
xhr.open('get','https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/eaasyDetail.do?id=1',true);
xhr.send(null);

//兼容ie7+的xhr用法
function createXHR() {
    if (typeof XMLHttpRequest !== 'undefined'){
        return new XMLHttpRequest();
    }
    else if(typeof ActiveXObject !== 'undefined'){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }

}
var xhr = createXHR();
xhr.onreadystatechange = function () {
    // 0 未启动 ，1 启动，2 发送，3 接受 ，4 完成
    if (xhr.readyState === 4){
        if (xhr.status >= 200 && xhr.status <300 || xhr.status === 304){
            console.log('success');
        }
        else {
            console.log('fail');
        }
    }
};
xhr.open('get','https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/eaasyDetail.do?id=1',true);
xhr.send(null);

//快乐动起来老师写法
var ajax = function(param) {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    var type = (param.type || 'get').toUpperCase();
    var url = param.url;
    if (!url) {
        return
    }
    var data = param.data,
        dataArr = [];
    for (var k in data) {
        dataArr.push(k + '=' + data[k]);
    }
    dataArr.push('_=' + Math.random());
    if (type == 'GET') {
        url = url + '?' + dataArr.join('&');
        xhr.open(type, url);
        xhr.send();
    } else {
        xhr.open(type, url);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(dataArr.join('&'));
    }
    xhr.onload = function() {
        if (xhr.status == 200 || xhr.status == 304) {
            var res;
            if (param.success && param.success instanceof Function) {
                res = xhr.responseText;
                if (typeof res === 'string') {
                    res = JSON.parse(res);
                    param.success.call(xhr, res);
                }
            }
        }
    };
};
ajax({
    url : 'https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/eaasyDetail.do',
    data : {
        id : 1
    }
})

