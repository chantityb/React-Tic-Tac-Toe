import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5; 

const Player_X = "X";
const Player_O = "O";

// all possible winning combinations
const winningCombos = [
    //Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    //Columns
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },

    //Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },

];

function checkWinner(tiles, setStrikeClass, setGameState) {
    // check if any of the winning combos have all 3 tiles filled with the same value
    for (const { combo, strikeClass } of winningCombos) {
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];
    // if all 3 tiles have the same value, return the strike class
    if (
        tileValue1 !== null && 
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
    ) {
        setStrikeClass(strikeClass); // set the strike class to the winning strike class
        if (tileValue1 === Player_X) {
            setGameState(GameState.playerXWins);
        } else {
            setGameState(GameState.playerOWins);
        }
        return; // return to exit the function
      }
    }

    const allTilesFilledIn = tiles.every((tile) => tile!== null);
    if (allTilesFilledIn) { 
        setGameState(GameState.draw);
    } // if all tiles are filled in, set the game state to draw
}

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null)); // array of 9 nulls
    const [playerTurn, setPlayerTurn] = useState(Player_X); // X goes first
    const [strikeClass, setStrikeClass] = useState(); // strike class is null by default 
    const [gameState, setGameState] = useState(GameState.inProgress); // game is in progress until a player wins or there is a draw 

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return; // if the game is over, return (do nothing else)
        }

        if (tiles[index] !== null) {
            return; // if tile is already filled, return (do nothing else)
        }

        //console.log(index);
        const newTiles = [...tiles]; // copy of tiles array
        newTiles[index] = playerTurn; // update the value of the clicked tile
        setTiles(newTiles); // update the tiles array with the new value of the clicked tile
        if (playerTurn === Player_X) {
            setPlayerTurn(Player_O);
        } else {
            setPlayerTurn(Player_X);
        } // update the playerTurn state variable to the next player
    };

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(Player_X);
        setStrikeClass(null);
    };

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]); // run checkWinner() every time a tile is clicked

    useEffect(() => {
        if (tiles.some((tile) => tile !== null)) {
            clickSound.play();
        }
    }, [tiles]) //if there is a value on the screen play clickSound

    useEffect(() => {
        if (gameState !== GameState.inProgress) {
            gameOverSound.play();
        }
    }, [gameState]); // only plays when gamestate is not in progress

    return ( 
        <div>
            <h1>Tic Tac Toe</h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass} />
            <GameOver gameState={gameState} />
            <Reset gameState={gameState} onReset={handleReset} />
        </div>
     );
}

export default TicTacToe;