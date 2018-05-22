/*
generator函数
是一个状态机，封装了多个内部状态
是一个遍历器对象生成函数，返回一个遍历器对象可以依次遍历generator函数里面的每一个状态
 */
function* helloWorldGenerator(){
    yield 'hello';
    yield 'world';
    return 'ending';
}
let hw = helloWorldGenerator(); //这里注意，调用了helloWorldGenerator之后函数并不执行

hw.next();//调用了next之后才执行，并进行状态转移,返回一个对象，value值即为yield表达式的值，done用来表示遍历是否结束
// { value: 'hello', done: false }
hw.next();
// { value: 'world', done: false }
hw.next();
// { value: 'ending', done: true }
hw.next();
// { value: undefined, done: true }

//注意：yield后面的表达式，只有当调用了next方法之后指针指向该语句后才会执行
//'惰性求值'
function * add() {
    yield 123 + 456;    //此时并不会求值
}
add().next(); //{value: 579, done: false}   这时才会进行求值


//注意：yield只能在generator函数里面调用，用在其他地方会报错
let arr = [1, [[2, 3], 4], [5, 6]];

let flat = function* (a) {
    a.forEach(function (item) {
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    });
};

for (let f of flat(arr)){
    console.log(f);
}
//因为forEach方法的参数是一个普通函数，所以即使这个普通函数是被包裹在generator函数中
//也还是不可以使用yield的

//yield表达式如果用在另一个表达式中，必须放在圆括号中（用作函数参数或赋值表达式的右边可以不加）
function* demo() {
    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
}

//yield表达式本身总返回undefined,通过对next方法传参，该参数可当成上一个yield表达式的返回值

//next()/throw()/return()共同点（作用都是让generator函数恢复执行）
/*
1.next()是将yield表达式替换成一个值
2.throw()是将yield表达式替换成一个throw语句
3.return()是将yield表达式替换成一个return语句
 */

//yield* 用于在一个generator函数中执行另一个generator函数
//等同于在generator函数内部，部署一个for...of循环
//如果后面跟着一个数组，由于数组原生支持遍历器，就会遍历数组成员
//所以，只要有Iterator接口，就可以被yield*遍历


function* gen() {
    this.a = [1];
    yield this.b = 2;
    yield this.c = 3;
}

function F() {
    return gen.call(gen.prototype); //this绑定到了prototype上
}

let f = new F();
let g = new F();
f.next();
f.next();
f.next();
console.log(f.a);//1
f.a.push(3);
console.log(f.a);//[1,3]
console.log(g.a);//[1,3]

/*
和普通函数不同的是，
generator函数的执行产生的上下文环境，一旦遇到yield命令就会暂时退出堆栈，并保持当前的状态
等再次执行next命令时，才会重新加入调用栈，冻结的变量和对象恢复执行
 */

//todo:promise和generator函数的区别？
//promise主要是有成功和失败两个状态，然后他就可以分别执行，
// 而generator只是一个中断，只能向下执行？？？
//不是啦！！！generator也可以用try...catch来捕获错误啦
function wrapper(generatorFunction) {
    return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}
const gen = wrapper(function* generator() {
    let success = yield;
    if (success)
        yield 1;
    else yield 2;
});
gen().next(true);


