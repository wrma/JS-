function _new () {
  // 获取参数
  let args = [].slice.call(arguments)
  // 拿到构造函数
  let constructor = args.shift()
  // 绑定原型
  let context = Object.create(constructor.prototype)

  let result = constructor.apply(context, args)
  // 如果Foo显示的返回了一个对象，那么应该直接返回这个对象，而不用理会以上所有的操作，一般不会发生这种情况，但是new的实现的确是这样的逻辑
  // 这里之所以判断类型是否为object还要添加 != null 的判断，是因为null的typeof结果也是‘object’
  // 不同的对象在底层都表示为二进制，在Javascript中二进制前三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"
  return (typeof result === 'object' && result != null) ? result : context
}
