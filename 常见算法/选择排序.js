
// 时间复杂度：最好O(n^2) 最坏O(n^2)
// 空间复杂度：O(1)
// 不稳定

// const arr = [ 6, 2, 5, 7, 8, 3 ];
// function selectSort(arr) {
//   if (!Array.isArray(arr)) {
//     throw new Error('传入参数需为数组类型！')
//   }
//   const length = arr.length;
//   for(let i = 0; i < length; i++) {
//     for(let j = i+1; j < length; j++) {
//       if (arr[i] > arr[j]) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//       }
//     }
//   }
//   return arr;
// }
// console.log(selectSort(arr));

// 优化，只记住下标和最大值，最后和末尾元素进行交换就行
const arr = [ 6, 2, 5, 7, 8, 3 ];
function selectSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('传入参数需为数组类型！')
  }
  const length = arr.length;
  for(let i = 0; i < length; i++) {
    let maxIndex = i;
    let max = arr[i];
    for(let j = i+1; j < length; j++) {
      if (arr[j] > max) {
        max = arr[j];
        maxIndex = [j];
      }
    }
    [arr[maxIndex], arr[i]] = [arr[i], arr[maxIndex]];
  }
  return arr;
}
console.log(selectSort(arr));
