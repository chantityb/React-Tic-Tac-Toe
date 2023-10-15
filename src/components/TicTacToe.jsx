import { useState } from "react";
import Board from "./Board";

const Player_X = "X";
const Player_O = "O";

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(Player_X);
    
    const handleTileClick = (index) => {
        console.log(index);
    }

    return ( 
        <div>
            <h1>Tic Tac Toe</h1>
            <Board tiles={tiles} onTileClick={handleTileClick} />
        </div>
     );
}

export default TicTacToe;