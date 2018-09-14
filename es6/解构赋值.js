//数组的解构赋值
//基本用法
let [a,b,c] = [1,2,3];
//等同于
let a = 1;
let b = 2;
let c = 3;

//实际上这种写法属于模式匹配,只要等号两边模式是相同的，左边的变量就会被赋予对应的值
//比如说：
let [a,[b,[c,d]]] = [1,[2,[3,4]]];
//a 1 , b 2 , c 3 , d 4

let [a,...b] = [1,2,3,4];
//a 1 , b [2,3,4]

//注意：当变量数大于右边的值的数量时，解构会失败
//当变量数小于右边的值得数量时，属于不完全解构，但也算成功

//左边数量大于右边，解构失败
let [a,b,...c] = [1];
//a 1 , b undefined , c []

//右边数量大于左边，不完全解构
let [a,b,c] = [1,[2,3],4];
//a 1 , b 2 , c 4

//如果等号右边不是可遍历的结构就会报错！！

//默认值
//解构赋值允许设定默认值，只有当赋值内容严格等于undefined时，默认值才会生效
let [a = 1,b] = [undefined,2];
// a 1 , b 2
let [a = 1,b] = [null,2];
// a null , b 2
//这里a === null,是因为null !== undefined

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [x = y,y = 1] = [];
//Uncaught ReferenceError: y is not defined

let [x = y,y] = [1,2];
//x 1 , y 2
//这里虽然和上处一样，都是在y没声明之前就将y赋值给了x
//但是！却没有报错，为什么呢
//这里我们应该想到，这段代码是先执行的解构赋值，如果没有匹配的值得话，才会选择默认值
//所以这里根本还没有执行到x = y 的这段赋值语句，所以没有报错

//对象的解构赋值
//对象解构不需要像数组解构那样按次序排列，只有变量和属性同名，才能取到正确的值
let {bar,baz,foo} = {foo: 'foo',bar : 'bar'};
//bar : bar
//foo : foo
//baz : undefined

//上述形式等同于
let {bar:bar,baz:baz,foo:foo} = {foo: 'foo',bar : 'bar'};
//实际上对象解构赋值是先找到同名属性，再赋给相应的变量，真正被赋值的是后者而不是前者

let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
//这段代码中，foo是模式，而baz才是真正被匹配的对象

//对象的解构也可以指定默认值
let {x, y = {a:1}} = {x: 1};
//x  1
//y  {a:1}

//这里我们来看一个函数参数的解构赋值
function move({x = 0, y = 0}) {
    console.log([x, y]);
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'.
//当move中没有参数的时候会报错，因为没有参数的时候，形参就变成了一个很诡异的东西，因为它现在既没有解构赋值得到值
//也不是一个对象，所以报错了，所以我们可以把它改成如下的形式

function move({x = 0, y = 0} = {}) {
    console.log([x, y]);
}

move(); //[0,0]
//这样就保证了我们在没有传入参数的时候,x,y的值被设置为了正确的默认值啦

//但是还有一点需要注意，请思考一下下面这一个解构赋值？？？暂时不是很理解
function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]



//总结
/*
1.解构失败和不完全解构(变量可以少不能多，多了就会解构失败)
2.解构赋值可以有默认值,默认值生效的条件是值严格等于undefined
 */

//用途
/*
1.交换变量的值
2.从函数返回多个值
3.函数参数的定义
4.提取JSON对象
5.函数参数的默认值
6.遍历map结构
7.输入模块的指定方法
 */
//从函数返回多个值
function test() {
    return {
        a : 1,
        b : 1,
    }
}
let {a,b} = test();

//函数参数的定义和默认值的设定（之前有讲，不再赘述）

//遍历具有Iterator接口的对象
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world

//输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");