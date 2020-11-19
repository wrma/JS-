
const getPrintThePivotElements = (arr) => {
  const res = [];
  // 找到所有从右边数，它比右边都小的数
  const rightArr = [];
  let rMin = arr[arr.length - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] < rMin) {
      rMin = arr[i];
      rightArr.push(arr[i]);
    }
  }

  // 找到所有从左边数，都比左边数大的数
  let lMax = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > lMax) {
      lMax = arr[i];
      if (rightArr.includes(arr[i])) {
        res.push(arr[i]);
      }
    }
  }

  return res;
}
const arr = [21, 11, 45, 56, 9, 66, 77, 89, 78, 68, 100, 120, 111]
console.log(getPrintThePivotElements(arr));