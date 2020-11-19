
const arr = [[1],2,3,[4,5]];
const obj = {
  a: 1,
  b: 4,
  c: {d: 8}
}
// 浅拷贝
function shallowCopy (obj) {
  if (typeof obj === null || typeof obj !== 'object') return obj;

  const res = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach(key => {
    res[key] = obj[key];
  })

  return res;
}

/**
 * const target = {
    field1: 1,
    field2: target
};
 */
function deepCopy (target, map = new Map()) {
  // 判断是基础类型，直接返回
  if (typeof target === null || typeof target !== 'object') return target;

  const res = Array.isArray(target) ? [] : {};

  // 解决循环引用的问题
  if (map.get(target)) {
    return map.get(target);
  }

  map.set(target, res);

  Object.keys(target).forEach(key => {
    res[key] = typeof target[key] === 'object' ? deepCopy(target[key], map) : target[key];
  })

  return res;

}

const shallowArr = shallowCopy(arr);
shallowArr[0].push(3);
console.log('arr', arr);
console.log('shallow', shallowArr);

const deepArr = deepCopy(arr);
shallowArr[0].push(3);
console.log('arr', arr);
console.log('deep', deepArr);