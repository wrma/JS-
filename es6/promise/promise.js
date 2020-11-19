
/************* 用法 ************ */
/** 这一篇主要介绍 promise 的用法，
 * 是阅读阮一峰的 es6 教程做的笔记 */
/****************************** */

/*promise的缺点：
1.无法取消:一旦新建就会立即执行，无法取消
2.promise内部抛出的错误，不会反应到外部（外部的代码仍会执行而不会中断）（即promise会吃掉错误）
3.当处于pending阶段的时候，无法确定目前的进展（是刚开始还是即将完成）
 */
/*优点和意义：
关注点分离，将异步操作以同步的流程表现出来，避免了层层嵌套的回调函数
 */


//当promise封装了一个异步操作，他的执行顺序是怎样的
console.log('begin');
function AjaxInPromise() {
    return new Promise((resolve,reject) => {
        console.log('promise');
        // $.ajax({
        //     url: 'https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/eaasyDetail.do',
        //     type : 'get',
        //     data : {
        //         id : 1
        //     },
        //     success : function () {
        //         resolve();
        //         console.log('inAjax');
        //     },
        //     error : function () {
        //         reject();
        //         console.log('inAjax');
        //     }
        // });
        setTimeout(()=>{
            resolve();
            console.log('inAjax');
        },2000)
        console.log('promise-end');
    })
}
AjaxInPromise()
    .then(function () {
        console.log('success');
    },function () {
        console.log('error');
    })
    .then(()=>{
        console.log('later');
    });
console.log('end');
//begin promise promise-end end inAjax success later


//promise 一定是异步的，但回调却有同步异步之分的，见下面两个例子
console.log('begin');
function foo(callback) {
    console.log('foo');
    callback();
}
function callback() {
    console.log('callback');
}
foo(callback);
console.log('end');
//begin foo callback end

console.log('begin');
function foo(callback) {
    return new Promise((resolve,reject) => {
        console.log('foo');
        resolve();
    })
}
foo().then(() => console.log('callback'));
console.log('end');
//begin foo end callback

//由此，我认为，promise是用来处理异步的回调的，他是es6中实现异步的一种方式
//不能说完全就是用来替代回调的


/*
resolve和reject可以带参数
 */
//参数为普通参数
function ArgumentPromise() {
    return new Promise(function (resolve,reject) {
        resolve('resolve');
        reject('reject');
    })
}
ArgumentPromise().then(msg=>console.log(msg),msg=>console.log(msg));
//resolve

//resolve和reject的参数被传递到了回调函数中
//这里要注意的是promise的状态只有pending resolve 和 reject三种，且当pending的状态发生改变时（即变为resolve或reject之后），状态不会再发生更改
//所以这里只打印出了'resolve',如果把resolve()和reject二者交换顺序的话，就会打印出'reject'了

//参数为promise对象
const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
})

p2
    .then(result => console.log(result))  //当p1状态变为resolve的时候会打印出东西来
    .catch(error => console.log(error));  // Error: fail
//暂时的理解是，p1作为参数传入了p2中，由于p1中的状态要在3s后才改变，但p2的状态却在1s后就改变了
//可是由于p2返回的是一个promise，导致他自己本身的状态失效，由p1来决定p2的状态，所以后面的then全部都是针对p1的回调
//如果将p1里面改成resolve('resolve')的话，也照样会打印出'resolve'来
//所以3s后p1状态变为reject之后，p2的回调函数会立即执行
//时间顺序就是
//1s后p2状态变为resolve并返回一个promise，由于返回的是promise,所以会导致自己的状态失效
//2s后p1的状态发生改变并执行回调


//then方法
//then方法会返回一个新的promise实例（不再是之前的那个promise实例），所以可以采用链式写法
//如果then方法中的回调函数返回的还是一个promise对象，那么后面的then就会等待该promise对象的状态发生变化才会被调用
//如果then方法中返回的不是一个promise对象，那么then方法会自己返回一个新的promise实例
//PromiseValue值为then方法中的返回值
getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
).then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
);

//catch方法
//reject方法作用等同于抛出错误，如下面两个例子，其实是等同的
// 写法一
const promise = new Promise(function(resolve, reject) {
    try {
        throw new Error('test');
    } catch(e) {
        reject(e);
    }
});
promise.catch(function(error) {
    console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
    reject(new Error('test'));
});
promise.catch(function(error) {
    console.log(error);
});

//promise的错误会冒泡，会向后传递直到被捕获
promise.then(
    return new Promise((resolve,reject)=> resolve());
).then(...)
    .then()
    .then()
    .catch()
//上面任何一个then方法出现了错误都会被catch捕获

//正常情况下抛出错误
throw new Error('error');
console.log('test');
//Uncaught Error: error
//没有打印出'test'，因为抛出了错误，脚本终止执行

//但是,promise会吃掉错误
const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
    });
};

someAsyncThing().then(function() {
    console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
//可以看到虽然promise内部有错误，但123仍然被打印出来了，说明promise内部的错误不会影响到promise外部的代码
//所以，一般总是建议，promise对象后面要跟着catch方法，
// catch方法返回的还是一个promise对象，所以之后还可以接着调用then方法

/*
catch和then方法返回的是一个新的promise对象
 */
//举个例子
const p1 = new Promise((resolve,reject) => {
    reject('报错了');
})
    .then((value) => console.log(value))
    .catch((error) => console.log('error:'+error)); //error:报错了
//由于这里我们把一段promise的执行赋值给了常量p1
//所以p1指向的并不是最开始的那个promise，而是catch之后返回的那个promise
//这个例子有利于我们接下来介绍promise.all()这个方法

//const p = Promise.all([p1,p2,p3...])
//这个方法用于将多个实例包装成一个新的promise实例
//该方法接受一个数组作为一个参数，数组元素全都是promise实例
/*p的状态由p1,p2,p3决定，有两种状态
1.只要有一个元素状态被reject，这个新的promise的状态就会变为rejected，这时第一个被reject的实例返回值会传递给p的回调函数
2.元素状态全为resolve,此时元素的所有返回值组成一个数组，并传递给p的回调函数
 */
const p1 = new Promise((resolve,reject) => {
    reject('报错了');
})
    .then((value) => value)
    .catch((error) => error);
const p2 = new Promise((resolve,reject) => {
    resolve('ok');
})
    .then((value) => value)
    .catch((error) => error);
Promise.all([p1,p2])
    .then((value) => console.log(value))
    .catch((error) => console.log('error:'+error));
//['报错了','ok']

//这里由于p1返回的是catch执行后返回的那个promise实例，所以他执行完之后，状态其实变成了resolve而不是rejected
//p2则返回的是then执行后返回的那个promise实例，也是resolve状态
//所以最后Promise.all([p1,p2])中两个实例状态都是resolve,所以会执行后面的then,而不是catch

//注意！
//如果上面的例子中，p1没有自己的catch方法，就会调用Promise.all()的catch方法
const p1 = new Promise((resolve,reject) => {
    reject('报错了');
})
    .then((value) => value);
const p2 = new Promise((resolve,reject) => {
    resolve('ok');
})
    .then((value) => value)
    .catch((error) => error);
Promise.all([p1,p2])
    .then((value) => console.log(value))
    .catch((error) => console.log('error:'+error));
//error:报错了
//这里p1的状态是rejected,所以promise.all的catch会把错误捕获到

/*
接下来讲的是Promise.race()方法
const p = Promise.race([p1,p2,p3...])
注意数组元素必须都是promise实例哦
只要元素中有一个实例改变状态，p的状态就会跟着发生改变
 */


/*
有一点，需要注意，当Promise.all()和Promise.race()里面的参数不是promise对象的时候
会默认先调用Promise.resolve方法再进行之后的处理
 */

/*
Promise.resolve()
用于将现有对象转为promise对象
参数分为四种情况
1.参数是一个Promise实例：不做任何修改返回该实例
2.参数是一个thenable对象（即拥有then方法的对象）：将该对象转为promise对象，然后立即执行thenable对象的then方法
3.参数不是对象：返回一个状态为resolved的新的promise对象
4.不带任何参数：直接返回一个resolves状态的promise对象
 */
//2.
let thenable = {
    then: function(resolve, reject) {
        console.log(111);
        resolve(42);
    }
};

let p1 = Promise.resolve(thenable); // 会立即打印出111
p1.then(function(value) {
    console.log(value); // 42
});

//3.
const p = Promise.resolve('Hello');

p.then(function (s){
    console.log(s)
});
// Hello

//4.
const p = Promise.resolve();

p.then(function () {
// ...
});

//5.参数是一个函数（实际和第三种情况意义相同，只不过回调函数里面传的是一个函数而已）
Promise.resolve(function () {
    console.log('a');
}).then((msg)=>msg());


/*
Promise.reject()方法和Promise.resolve()方法接受参数相似，
不同的是他返回的是一个reject状态的promise对象
 */

/*
Promise.try()???感觉很流弊,目前好像浏览器还不支持
但是有些Promise库提供了这种方法
就是用来让同步函数同步执行，异步函数异步执行，同时又能统一有个API（比如说then方法）
来指定下一步的流程
 */
const f = () => console.log('now');
Promise.try(f)
    .then(() => console.log('next'));

/*
总结一下：
1.resolve/reject里面的参数会传递到回调函数中
2.如果参数为promise对象，则原有的promise对象会根据这个promise的状态来改变
3.then和catch方法执行后都会返回一个新的promise对象
4.promise内部的错误会冒泡直到被捕获，如果没有被捕获，则不会影响promise外部的代码，即promise会吃掉错误
5.Promise.all([p1,p2,...])里面元素状态如果都为fulfilled,p才会变成fulfilled,同时里面元素的返回值会返回一个数组传递给p的回调函数
    如果为rejected，此时第一个被reject的实例的返回值会传递给p的回调函数
6.可以通过Promise.resolve()/Promise.reject()来生成一个promise对象
 */


//一些例子与思考
//对于在then中嵌套的promise和链式调用的promise哪一个先运行的思考
//还是执行栈和microtask运行顺序的问题...
console.log('start');
let testPromise = new Promise((resolve,reject) => {
    console.log('promise1-begin')
    resolve(1);
    reject('error');
});

testPromise
    .then((data) => {
        console.log('promise1-end');

        //主要观察data在哪里输出
        new Promise((resolve,reject) => {
            console.log('promise1-inner')
            resolve(1);
            reject('error');
        }).then(data => console.log(data)); //嵌套的promise
        console.log('promise2-begin');
    })
    //隐式返回的promise
    .then((data) => {
        console.log('promise2-end');
    })
console.log('end');
//start
// promise1-begin
// end
// promise1-end
// promise1-inner
// promise2-begin
// 1
// promise2-end

//关于promise里面的同步代码的执行次数
//实际上是在new Promise对象的时候就立即执行了，之后再调用同一个promise对象时不会重复执行
let testPromise = new Promise((resolve,reject) => {
    console.log('promise1-begin')
    resolve(1);
    reject('error');
});
testPromise
    .then((data) => {
        console.log('promise1-end');
        console.log('promiseInner-begin');
        return testPromise; //这里使用了testPromise，但是不会再执行promise1-begin,他已经在赋值时被执行过一次了
    })
    .then((data) => {
        console.log('data:', data);
        console.log('promiseInner-end');
    });
// promise1-begin
// promise1-end
// promiseInner-begin
// 1
// promiseInner-end

let test = new Promise((resolve,reject) => {
    resolve();
    reject();
}).then(() => {
    return {name : 'wrma'}
    })
    .then((data) => console.log('data', data));
console.log('test', test);





