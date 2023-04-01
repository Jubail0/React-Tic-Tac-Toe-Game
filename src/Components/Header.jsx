import React from 'react'

export const Header = ({matchResult,currentPlyr}) => {
  const{playerX,playerO,tie} = matchResult

  return (
    <header>
      <div className='display-result'>
         <div>
          <span style={{color:currentPlyr === "X" && "red"}}>Player X</span>
          <span>{playerX}</span> 
         </div>

         <div>
          <span>Draw</span> 
          <span>{tie}</span>
         </div>

         <div>
          <span style={{color:currentPlyr ==="O" && "blue"}}>Player O</span>
          <span>{playerO}</span>
         </div>

      </div>

    </header>
  )
}
