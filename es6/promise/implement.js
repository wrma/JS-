

/************** 这部分主要是手写Promise的部分 ************ */


// 手写 Promise.all
// 实现标准：
// 1. 可接受由 Promise 组成的一个数组作为参数, 并返回一个Promise；
// 2. 所有 Promise 完成后才更新状态； 
// 3. 一个 Promise 失败则失败
// 4. Promise.all resolve 的值是所有 Promise 返回成功值组成的数组，reject 的返回值是失败实例的返回值

const myPromiseAll = (promiseArr) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      return reject(new Error('arguement must be an array !'));
    }

    // 计数器用来更新 Promise 的完成数量
    let count = 0;
    let max = promiseArr.length;
    const resolveValue = [];
    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then((res) => {
        count++;
        resolveValue.push(res || '');
        if (count === max) {
          resolve();
        }
      }).catch((err) => {
        reject(err);
      })
    })
  })
}

// 手写 Promise.race
// 实现标准：
// 1. 入参：Promise数组；返回：新的Promise，新Promise状态resolve的值是最先resolve的状态值
// 2. 一个 Promise 完成就立马完成，失败也立马失败

const myPromiseRace = () => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      return reject(new Error('arguement must be an array !'));
    }

    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then(resolve, reject);
    })
  })
}


// 手写 Promise.prototype.finally
// 实现标准：
// 1. 传入一个回调函数，不管状态是否成功，都执行该回调函数
// 2. 可链式调用

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),  // 为啥不直接执行 callback?
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
