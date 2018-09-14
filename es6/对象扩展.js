//对象扩展

//属性简写法(用于属性名和变量名相同时)
// es6 允许直接写入变量和函数，作为对象的属性和方法
const baz = {foo};

//等同于
const baz = {foo : foo};

function fun(x,y) {
    return {x,y}
}
fun(1,2)
//{x:1,y:2}

//等同于
function fun(x,y) {
    return {x:x,y:y}
}
fun(1,2)
//{x:1,y:2}


//方法简写
const o = {
    method() {
        return "Hello!";
    }
};

// 等同于
const o = {
    method: function() {
        return "Hello!";
    }
};