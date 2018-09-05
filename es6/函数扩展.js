//函数的扩展

//函数参数设置默认值
function log(x,y=1) {
    console.log(x,y);
}
log(2);
//2,1

//我们之前在解构赋值里看到的一个例子就是和函数参数默认值联合起来用的
function move({x = 0, y = 0} = {}) {
    console.log([x, y]);
}

move(); //[0,0]

//注意！
// 1.有函数默认值的参数最好在尾部
// 2.指定了默认值之后，函数的length属性将会失真！
(function (a) {}).length;
// 1
(function (a = 5) {}).length;
// 0

//rest参数（...变量名）：用于解构赋值和获取函数的多余参数
//功能相当于Array.prototype.slice.call(argument)
//用于返回一个浅复制的新数组
//所以rest参数可以使用数组的任何函数
//获取函数多余参数（其实实际上也是解构赋值啦）
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
        console.log(item);
    });
}
let a = [];
push(a, 1, 2, 3);

//解构赋值
let [a,...b] = [1,2,3,4];
//a 1
//b [2,3,4]

//items变量经过...运算符变成了[1,2,3](rest的名字也可以理解到，把剩余的参数都变成数组)
//所以rest参数之后是不能再有其他参数的
//注意：函数的length属性也是不包含rest参数的

//注意，这里的rest参数不要和之后的扩展运算符...弄错了，二者的功能截然相反
//数组扩展运算符也是...
let a = [1,2,3];
let b = ['a',...a,'b'];
//b ['a',1,2,3,'b'] 可以看到这里的数组a被展开了


//箭头函数，重头戏来了
let sum = (num1, num2) => num1 + num2;
// 等同于
let sum = function(num1, num2) {
    return num1 + num2;
};
//等同于
let sum = (num1, num2) => {
    return num1 + num2;
};
//总而言之就是，如果箭头函数后面只有一条语句就会直接返回这条语句执行后的值
//如果有多条语句，必须要用花括号包裹起来

//箭头函数可以和解构赋值一起使用
const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
    return person.first + ' ' + person.last;
}

//使用箭头函数的注意点：
/*
1.箭头函数内部的this指向的是定义时指向的对象，而不是使用时
(因为箭头函数内部根本没有this,所以它里面的this实际上就是外层代码块的this)
2.不可以当做构造函数
(因为没有this,所以也不能当做构造函数)
3.不可以使用arguments对象，可以使用rest参数代替
4.不能用作Generator函数
 */


//总结
/*
1.在函数参数上做手脚的（比如说参数默认值，rest参数）都会让函数的length属性失真
 */
