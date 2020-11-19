
// 空间复杂度最好为O(logn)，最差为O(n),(因为使用到了递归，递归本身其实是个调用栈的实现)
// 时间复杂度O(nlogn)，最坏情况为O(n^2)
// 非稳定排序

const arr = [6, 2, 5, 7, 8, 3];

function partition(arr, left, right) {
  // 这个随机数取法好像有点问题？
  // const pivot = Math.floor(Math.random() * (right - left + 1)) + left;
  const pivot = left;
  // [arr[pivot], arr[left]] = [arr[left], arr[pivot]];

  while (left < right) {
    // 左边找到比基准值大的数，右边找到比基准值小的数
    while (arr[left] < arr[pivot] && left < right) {
      left++;
    }
    while (arr[right] > arr[pivot] && left < right) {
      right--;
    }

    if (left === right) {
      arr[left] = arr[pivot];
    } else {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
  }

  return left;
}

function quickSort(arr, left = 0, right = arr.length - 1) {

  if (!Array.isArray(arr)) {
    throw Error('入参不合法，请输入正确入参');
  }

  if (left < right) {
    let partitionIndex;

    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right)  
  }

  return arr;
}

console.log(quickSort(arr));