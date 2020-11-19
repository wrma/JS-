
function heapSort(arr) {
  const length = arr.length;

  // 先构建一个大根堆
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    adjustHeap(arr, i, length);
  }

  // 交换堆顶元素后，记得要重新调整剩下的值变成一个大根堆
  for (let j = length - 1; j > 0; j--) {
    [arr[0], arr[j]] = [arr[j], arr[0]];
    adjustHeap(arr, 0, j);
  }

  return arr;
}

function adjustHeap(arr, i, length) {
  let k = 2 * i + 1;

  while(k < length) {
    if (k + 1 < length && arr[k] < arr[k+1]) {
      k++;
    }

    // 如果当前节点值小于子节点值的话，进行交换调整
    if (arr[i] < arr[k]) {
      // arr[i] = arr[k];
      [arr[i], arr[k]] = [arr[k], arr[i]]
      // 定位到当前元素继续调整
      i = k;
      k = 2 * i + 1;
    }
    else {
      break;
    }
  }
}
console.log(heapSort([3,2,3,1,2,4,5,5,6]));
console.log(heapSort([3,2,1,5,6,4]));
console.log(heapSort([2, 5, 1, 7, 3, 4]));


// 参考链接：https://www.cnblogs.com/chengxiao/p/6129630.html