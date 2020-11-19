// 二分查找，针对大数据量的有序数组
const arr = [1, 2, 4, 5, 6, 7, 9, 12, 15, 19, 23, 26, 29, 34, 39];

// 迭代实现
function search(arr, target) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let pivot = Math.floor((right + left) / 2);
    // 在右边
    if (arr[pivot] < target) {
      left = pivot;
    } else if (arr[pivot] > target) {
      right = pivot;
    } else {
      return pivot;
    }
  }
  return -1;
}

// 递归实现
function recursiveSearch(arr, target, left = 0, right = arr.length - 1) {
  let pivot = Math.floor((left + right) / 2);

  if (left > right) {
    return -1;
  }

  if (arr[pivot] < target) {
    return recursiveSearch(arr, target, pivot + 1, right);
  } else if (arr[pivot] > target) {
    return recursiveSearch(arr, target, left, pivot - 1);
  } else {
    return pivot
  }
  
}

console.log(search(arr, 19));
console.log(recursiveSearch(arr, 19));