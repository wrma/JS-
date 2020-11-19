// Object.create 方法是以传入参数为原型返回的一个实例对象

__create = function(obj) {
  const F = function () {};
  F.prototype = obj;
  return new F();
}