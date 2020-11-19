function rgbSort (str) {
  const arr = str.split('');

  let i = 0;
  let j = 0;
  let k = arr.length - 1;
  // [0,i-1] 为R, [i,j]为G, [k, length-1] 为 B
  while (j !== k) {
    if (arr[j] === 'R') {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i++;
      j++;
    }
    else if (arr[j] === 'G') {
      j++;
    } else if (arr[j] === 'B') {
      [arr[j], arr[k]] = [arr[k], arr[j]];
      k--;
    }
  }

  return arr.join('');
}

const str = 'RGBBBGGRR';
console.log(rgbSort(str));