/*
记录了一些选择/填空程序阅读题的考点和题目
 */

/*
var 变量提升和函数提升
 */
var msg = 'hello';
for(var i = 0;i<10;i++){
    var msg = 'hello'+i*2+i
}
console.log(msg);
// hello189
// es5 没有块级作用域的概念，且可以使用 var 重复声明，所以 for 循环里面声明的 msg 覆盖了外面的 msg
// 加上字符串拼接的隐式类型转换，所以是hello189

// 重要
var foo = {n:1};
(function (foo) {
    console.log(foo.n);
    foo.n = 3;
    var foo = {n:2};
    console.log(foo.n)
})(foo);
console.log(foo.n);
// 1 2 3
// 这里有一个知识点，函数内部声明的和形参名字相同时，形参优先级大于内部的同名变量
// 还有一个知识点就是对象的引用赋值啦
// foo.n 的时候，形参和实参还是指向同一片内存空间的
// foo = {n:2} 时，形参已经指向了另一片内存空间了

function foo() {
    console.log(a);
    var a = 1;
    var a = function () {
        console.log(2)
    }
    function a() {
        console.log(3)
    }
}
foo()
// function{console.log(3)}


/*
作用域
 */
function test() {
    var n = 4399;
    function add(){
        n++;
        console.log(n);
    }
    return {
        n:n,
        add:add
    }
}
var result = test();
var result2 = test();
result.add();
result.add();
console.log(result.n);
result2.add();
// 4400 4401 4399 4400
// result.add() 这一句就是闭包的应用了，保留了原来test函数里面n的值
// 至于 result.n ,就是赋值了的意思（）所以返回的依旧是 4399 ，不会因为 add 而改变

var bb = 1;
function aa(bb) {
    bb = 2;
    console.log(bb);
}
aa(bb);
console.log(bb);
// 2 1
// 这里的考点是基本类型的值赋值


/*
运算优先级，括号 > 成员访问 > i++ > 一元运算(++i,typeOf) > 四则运算 > 比较运算(>=,==) > 逻辑运算（&& > ||）> 条件运算（?:） > 赋值运算 (=,+=)
 */
console.log(([]) ? true : false);
console.log(([] == false ? true : false));
console.log(({} == false) ? true : false);
// true true false
// 关于 == 运算符
// 对于基本类型Boolean，Number，String，三者之间做比较时，总是向 Number进行类型转换，然后再比较；
// 如果有Object，那么将Object转化成这三者，再进行比较；
// 对于null和undefined，只有 x，y分别是它们时才相同，其他都为false

var a = 4399<0||typeof (4399 + '');
console.log(a);
// string


/*
闭包
 */
var i = 1;
var i = 2;
var add = function () {
    var i = 0;
    return function () {
        i++;
        console.log(i);
    }
}();
add();
// Q:有几个变量没有被回收？
// A:3个，全局变量不会被回收，闭包中的变量不会被回收
// 全局i,全局add,闭包i

var foo = 'hello';
(function () {
   var bar = 'world';
   console.log(foo+bar);
})();
console.log(foo+bar);
// helloworld 报错（bar is not defined）


(function () {
   var a = b = 5;
})()
console.log(b);
console.log(a);
// 5 报错（a is not defined）
// 两个考点：连等赋值，操作顺序从左往右，var a=b=5相当于 b=5;var a=b;
// b在非严格模式下会提升到全局作用域，a虽然在闭包中声明了，但是作用域在闭包内，全局访问不到

(function () {
   var x = foo();
   var foo = function foo() {
       return 'foobar'
   }
   return x;
})()
// foo is undefined
// 函数的声明方式只有两种，函数表达式和函数声明，函数声明会被提前，但是函数表达式不会（只会把这个赋值的变量声明提前）


/*
this
 */
var color = 'green';
var test = {
    color : 'blue',
    getColor : function(){
        var color = 'red';
        console.log(this.color);
    }
}
var getColor = test.getColor();
getColor();
test.getColor();
// green blue
// this 只在它被调用的时候绑定，第一个green是单独调用，第二个则绑定在了test对象上

var myObject = {
    foo : 'bar',
    func: function () {
        var self = this;
        console.log(this.foo);
        console.log(self.foo);
        (function () {
            console.log(this.foo);
            console.log(self.foo);
        })()
    }
}
myObject.func();
// bar bar undefined bar


/*
一些小而杂的知识
 */
var obj = {
    'key': '1',
    'value' : '2'
};
var newObj = obj;
newObj.value += obj.key;
console.log(obj.value);
// 21
// 这里的考点一是，对象的引用赋值，二是a += b 等同于 a = a + b（而不是 b + a）



// 还有一些需要注意的相等的比较
null == undefined //true
// undefined 和任何有意义的值比较返回的都是 false