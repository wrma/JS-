
var isSubset = function isSubset(a, b) {
  if (b.length > a.length) return false;

  // i为a数组下标，j为b数组下标
  let i = 0, j = 0;

  while (i < a.length) {
    if (a[i] === b[j]) {
      j++;
      // B先走完则判断为子集
      if (j === b.length) return true;
    }
    i++;
  }

  // A先走完则失败
  return false

};


console.log(isSubset([1,2,3,3,4,5], [3,3]))
