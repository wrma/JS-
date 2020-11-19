
// 时间复杂度：最好(趋于有序时) O(n), 最坏O(n^2)
// 空间复杂度： O(1)
// 稳定排序

const arr = [ 6, 2, 5, 7, 8, 3 ];
function insertSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('传入参数需为数组类型！')
  }
  const length = arr.length;
  // 未排序的队列
  for(let i = 1; i < length; i++) {
    const temp = arr[i]; // 保留引用，方便后面做插入
    // 已排序的队列
    let j = i-1;
    for(; j >= 0; j--) {
      if (temp < arr[j]) {
        arr[j+1] = arr[j];
      } else {
        break;
      }
    }
    arr[j+1] = temp;
  }
  return arr;
}
console.log(insertSort(arr));