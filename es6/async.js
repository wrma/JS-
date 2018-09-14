/*
关于async:
1.async/await基于promise实现，不能用于普通的回调函数
2.它使异步代码看起来像同步代码
 */
//async函数可以看做是多个异步操作包装成的一个promise对象
//调用asnyc函数时，会立即返回一个promise对象，
// 但是他会等到内部所有的await的异步操作执行完成后，才会执行then方法指定的回调
//但是只要内部的异步操作有一个变为了reject，那么整个async函数都会中断执行

//await命令后面是一个promise对象，如果不是，会被Promise.resolve()转成一个promise对象

//先来感受一下async的异步执行
async function asyncFun() {
    await loga();
    await logb();
    return 'c'
}
function loga() {
    console.log('a');
}
function logb() {
    console.log('b');
}
asyncFun().then((s) => console.log(s));
console.log('end');
//a end b c


async function asyncFun() {
    await loga();
    await logb();
    return 'c'
}
function loga() {
    setTimeout(()=>{
        console.log('a');
    },1000)
}
function logb() {
    console.log('b');
}
asyncFun().then((s) => console.log(s));

console.log('end');
//end b c a


//await后面跟着的是一个promise对象，如果不是的话，就会被转化为promise对象
//async命令返回的也是一个promise对象,该promise的resolve值就是函数return的值
function getJSON() {
    return new Promise((resolve,reject) => {
        resolve({
            'name':'wrma',
            'age' : 20
        });
        // reject('出错了');
    })
}
const makeRequest = async () => {
    try {
        const a = await getJSON();  //await 表达式的返回值是resolve函数里面的参数
        console.log(a);
    }catch (e){
        console.log(e);
    }
    return "done"
};
makeRequest().then((s) => console.log(s));
//{name: "wrma", age: 20}
//done

//然后,这里就有个骚操作了
//因为async函数返回的是一个promise,await命令后面跟的也是promise
//所以我们就很自然地想到可以把他们连在一起用
function loga() {
    return 'a'
}
function logb() {
    return 'b'
}
function logc() {
    return 'c'
}
async function getSomething() {
    let a = await loga();
    let b = await logb();
    let c = await logc();
    return {a,b,c}; //返回值就是这个promise的resolve值
}
async function logSomething() {
    const {a,b,c} = await getSomething(); //刚好在这里执行完返回的也是resolve的值
    console.log({a,b,c});
}
logSomething();
//{a:'a',b:'b',c:'c'}


//async的错误处理
async function asyncFun() {
    try {
        await logb();
        await loga();   //被catch到错误之后，后面的代码都不会执行
        await logb();
    }catch (e){
        console.log(e);
    }
}
function loga() {
    return new Promise((resolve,reject) => {
        reject('出错了');
    });
}
function logb() {
    console.log('b');
}
asyncFun();
console.log('c');
// b
// Error:出错了


/*使用注意点
1.最好把await命令放在try...catch代码块中，因为await后面的promise对象运行结果可能是rejected
2.多个await命令后面的异步操作，如果不存在继发关系，最好让他们同时出发
3.await命令只能用在async函数中，如果用在普通函数中就会报错
 */


//ajax嵌套（ajax用jquery中的库来实现）
//promise实现
let ajaxPromise = function(ajaxParam){
    return new Promise((resolve,reject) => {
        return $.ajax({
            url : ajaxParam.url,
            type : ajaxParam.type,
            data : ajaxParam.data,
            success : (res) => {
                resolve(res);
            },
            error : (err) => {
                reject(err);
            }
        })
    })
};
ajaxPromise({
    url : 'https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/category/queryList.do',
    type : 'get'
})
    .then(res => {
        return ajaxPromise({
            url : 'https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/eaasyDetail.do',
            type : 'get',
            data : {
                id : res.data[0].categoryId
            }
        })
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

//async/await实现
async function awaitAjax() {
    let getData = await ajaxPromise({
        url : 'https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/category/queryList.do',
        type : 'get'
    });
    let getAriticle = await ajaxPromise({
        url : 'https://www.easy-mock.com/mock/59c76db1e0dc663341b7173c/index/eaasyDetail.do',
        type : 'get',
        data : {
            id : getData.data[1].categoryId
        }
    });
    console.log(getAriticle.data);
}
awaitAjax();