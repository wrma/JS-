// call
// 改变 this 指向，传入相关参数
// 调用方式 foo.myCall(bar, a, b ,c);
function myCall(context, ...args) {

  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }

  context.fn = this;
  context.fn(...args);
  delete context.fn;
}

// apply 和 call 用途一样，仅传入参数为数组形式
// 调用方式 foo.myApply(bar,[ a, b ,c]);
function myApply(context, args) {

  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }

  context.fn = this;
  context.fn(...args);
  delete context.fn;
}


// bind
// 特点： 1. 可改变this指向; 2. 返回一个函数; 3. bind绑定的函数作为构造函数的时候，指定的this值会失效
function myBind(context, ...outterArgs) {
  const _this = this;
  function res (...innerArgs) {
    if (_this instanceof res) {
      return _this.apply(this, ...outterArgs, ...innerArgs);
    } else {
      return _this.apply(context, ...outterArgs, ...innerArgs);
    }
  }

  res.prototype = this.prototype;

  return res;
}

// 参考资料：
// 1. https://zhuanlan.zhihu.com/p/92786246
// 2. https://github.com/mqyqingfeng/Blog/issues/12