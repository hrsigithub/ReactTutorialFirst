export function calculateWinner(squares) {
  // 勝利条件となるマスの組み合わせ（横・縦・斜め）
  const lines = [
    [0, 1, 2], // 横: 上段
    [3, 4, 5], // 横: 中段
    [6, 7, 8], // 横: 下段
    [0, 3, 6], // 縦: 左列
    [1, 4, 7], // 縦: 中列
    [2, 5, 8], // 縦: 右列
    [0, 4, 8], // 斜め: 左上から右下
    [2, 4, 6], // 斜め: 右上から左下
  ];

  // 各勝利条件をチェック
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // a, b, c は 3つのマスのインデックス
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 勝ったプレイヤー（"X" または "O"）を返す
    }
  }
  return null; // 勝者がいない場合は null を返す
}
