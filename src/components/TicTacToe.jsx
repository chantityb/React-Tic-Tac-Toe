import { useState } from "react";
import Board from "./Board";

const Player_X = "X";
const Player_O = "O";

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null)); // array of 9 nulls
    const [playerTurn, setPlayerTurn] = useState(Player_X); // X goes first
    
    const handleTileClick = (index) => {
        
        if (tiles[index] !== null) return; // if tile is already filled, return (do nothing else)
        
        //console.log(index);
        const newTiles = [...tiles]; // copy of tiles array
        newTiles[index] = playerTurn; // update the value of the clicked tile
        setTiles(newTiles); // update the tiles array with the new value of the clicked tile
        if (playerTurn === Player_X) {
            setPlayerTurn(Player_O);
        } else {
            setPlayerTurn(Player_X);
        } // update the playerTurn state variable to the next player
    }

    return ( 
        <div>
            <h1>Tic Tac Toe</h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} />
        </div>
     );
}

export default TicTacToe;