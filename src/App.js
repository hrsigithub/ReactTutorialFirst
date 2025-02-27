import { useState } from "react";

{
  /* React では、イベントを表す props には onSomething という名前を使い、
      それらのイベントを処理するハンドラ関数の定義には handleSomething という名前を使うことが一般的です。 */
}

function Square({ value, onSquareClick }) {
  // Board コンポーネントから Square コンポーネントに関数を渡して、
  // マス目がクリックされたときに Square にその関数を呼び出してもらうようにします。
  // クリックされたときに Square コンポーネントが呼び出す関数から始めましょう。
  // その関数を onSquareClick という名前にします：

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  // onSquareClick プロパティを、
  // Board コンポーネント内に handleClick という名前で作る関数に接続します。
  // onSquareClick を handleClick に接続するために、
  // 1 番目の Square コンポーネントの onSquareClick プロパティに関数を渡しましょう：

  function handleClick(i) {
    if (squares[i]) {
      return;
    }

    // const nextSquares = squares; // これはバグ。Reactでは状態を直接変更すると、正しく再レンダリングされない可能性があります。

    // なぜこれが必要か？
    // Reactの useState は状態の変更を検知することでコンポーネントを再レンダリングします。
    // しかし、squares の参照が変わらない場合（squares を直接変更した場合）、
    // React は「状態が変わっていない」と判断し、再レンダリングしません。

    // const nextSquares = squares.slice(); //squares 配列のコピーを作成します

    // const nextSquares = structuredClone(squares); // ディープコピー
    const nextSquares = [...squares]; // squaresのシャローコピーを作成

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // setSquares 関数をコールすることで、React はこのコンポーネントの state に変更があったことを知ります。
    // これにより、squares という state 変数を使用しているコンポーネント (Board)、
    // およびその子コンポーネント（盤面を構成している Square コンポーネントすべて）の再レンダーがトリガされます。
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        {/* handleClick(0) の呼び出しが、
      Board コンポーネントのレンダーの一部として発生してしまうからです。
      handleClick(0) は、setSquares を呼び出して Board コンポーネントの state を更新するため、
      Board コンポーネント全体が再レンダーされます。しかし、これにより handleClick(0) が再度実行され、無限ループに陥ります： */}

        {/* <Square value={squares[0]} onSquareClick={handleClick} /> */}
        {/* <Square value={squares[0]} onSquareClick={handleClick(0)} /> */}

        {/* onSquareClick={handleClick} のようにしていたときは、props として handleClick 関数を渡していました。
        呼び出してはいませんでした！ 
        しかし、今はその関数をその場で呼び出してしまっているのです。
        handleClick(0) の括弧の部分に注目してください。だからすぐに実行されてしまうのです。
        ユーザがクリックするまで、handleClick を呼び出したくないわけです。 */}

        {/* マス目がクリックされると、アロー (=>) の後のコードが実行され、handleClick(0) が呼び出されます。 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
