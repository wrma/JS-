/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  let [x, y] = [...click];
  // 直接踩中雷，结束游戏
  if (board[x][y] === 'M') {
    board[x][y] === 'X'
  } else {
    dfs(board, x, y)
  }

  return board;
};

function dfs(board, i, j) {

  // 定义8个方向
  const dx = [-1, 1, 0, 0, -1, 1, -1, 1];
  const dy = [0, 0, 1, -1, 1, -1, -1, -1];
  let count = 0;

  for (let k = 0; k < 8; k++) {
    const x = i + dx[k];
    const y = j + dy[k];
    // 判断一下边界，超出边界则进行下一部分的计算
    if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
      continue;
    }
    // 如果周围有雷，则计数加一
    if (board[x][y] === 'M') {
      count++;
    }
  }

  // 如果周围有雷，直接修改当前地段为雷数
  if (count > 0) {
    board[i][j] = '' + count;
    return;
  }

  // 没有雷的话，标记当前格为空白'B',并继续对周围的8个元素进行递归查找
  board[i][j] = 'B'
  for (let k = 0; k < 8; k++) {
    const x = i + dx[k];
    const y = j + dy[k];
    // 判断一下边界，超出边界则进行下一部分的计算
    if (x < 0 || x >= board.length || y < 0 || y >= board[0].length || board[x][y] != 'E') {
      continue;
    }
    dfs(board, x, y)
  }

}