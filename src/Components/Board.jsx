import React from 'react'

const Board = ({board,handlePlayersTurn,wonBy,draw}) => {

  const displayWin = (index)=>{
    if(wonBy?.indexes?.includes(index)){
      return "win"
    }
  }

  return (
    <div className='board'>
    {board.map((box,index) => (
      <div 
      key={index} 
      id={box.id} 
      className={draw? "box draw" :'box' }
      onClick={
        // checking if any player has won the round then stop executing handlePlayersTurn function 
        !wonBy? ()=>handlePlayersTurn(index) : null}>
      <span className='symbol' id={displayWin(index)}>{box.occupiedBy} </span>
      </div>
     ))
       
    }
    
</div>
  )
}

export default Board