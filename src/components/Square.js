//import React from "react";

const Square = ({ value, onSquareClick }) => {
  // Board コンポーネントから Square コンポーネントに関数を渡して、
  // マス目がクリックされたときに Square にその関数を呼び出してもらうようにします。
  // クリックされたときに Square コンポーネントが呼び出す関数から始めましょう。
  // その関数を onSquareClick という名前にします：

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
