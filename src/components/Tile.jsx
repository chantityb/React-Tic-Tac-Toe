function Tile({className, value}) {
    return ( 
        <div className={`tile ${className}`}>{value}</div>
     );
}

export default Tile;