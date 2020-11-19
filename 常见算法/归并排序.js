
// 空间复杂度O(n),时间复杂度O(nlogn)

const arr = [6, 2, 5, 7, 8, 3];

function merge(left, right) {

  const res = []
  while(left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift())
    }
  }

  while(left.length > 0) {
    res.push(left.shift())
  }

  while(right.length > 0) {
    res.push(right.shift());
  }

  return res;
}

function mergeSort(arr) {

  if (!Array.isArray(arr) || arr.length < 1) {
    throw Error('请输入正确的入参')
  }

  const length = arr.length;
  const privot = Math.floor(length / 2);
  const left = arr.slice(0, privot);
  const right = arr.slice(privot, length);

  if (length === 1) {
    return arr;
  } else {
    return merge(mergeSort(left), mergeSort(right))
  } 
}

console.log(mergeSort(arr));