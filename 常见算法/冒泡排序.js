
// 冒泡排序
// 时间复杂度 O(n^2) 空间 O(1)
// 优化后最好情况 O(n)
// 稳定排序

const arr = [ 6, 2, 5, 7, 8, 3 ];
function bubble(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('传入参数需为数组类型！')
  }
  const length = arr.length;
  let flag = true;
  for(let i = 0; i < length && flag; i++) {
    flag = false;
    for(let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        flag = true;
      }
    }
  }
  return arr;
}
console.log(bubble(arr));