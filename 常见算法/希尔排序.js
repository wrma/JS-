
// 平均时间复杂度 O(nlogn)
const arr = [6, 2, 5, 7, 8, 3];
function shellSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw new Error('传入参数不合法')
  }
  const length = arr.length;
  let gap = Math.floor(length / 2);
  while (gap > 0) {
    // 未排序数组
    for (let i = gap; i < length; i++) {
      const temp = arr[i];
      // 已排序数组
      let j = i - gap;
      for (; j >= 0; j -= gap) {
        if (arr[j] > temp) {
          arr[j + gap] = arr[j];
        } else {
          break;
        }
      }
      arr[j + gap] = temp;
    }
    gap--;
  }
  return arr;
}
console.log(shellSort(arr));