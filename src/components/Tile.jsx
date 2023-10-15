function Tile({className, value, onClick, playerTurn}) {
    
    let hoverClass = null;
    if (value === null && playerTurn != null) {
        hoverClass = `${playerTurn.toLowerCase()}-hover`
    }
    
    return ( 
        <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>{value}</div> // onClick is a prop passed from Board.jsx to Tile.jsx to handleTileClick in TicTacToe.jsx 
     );
}

export default Tile;