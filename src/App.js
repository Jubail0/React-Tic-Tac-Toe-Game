import React from 'react'
import Board from './Components/Board';
import { Header } from './Components/Header';
import { boardInfo, matchResultInfo, winRule } from './data';

const App = () => {
    const [board, setBoard] = React.useState(boardInfo);
    const [currentPlyr, setCurrentPlyr] = React.useState("X");
    const [wonBy,setWonBy] = React.useState(null);
    const [draw,setDraw] = React.useState(false);
    const [matchResult,setMatchResult] = React.useState(matchResultInfo);
    const [showResetButton, setShowResetButton] = React.useState(false);

    const checkWin = () => {
        let winner;
        // Looping through the winRule Array
        winRule.forEach(elems=>{
        // destructuring each of the array inside elems
            const [a,b,c] = elems
        // checking if all the values are equal
            if(
                board[a].occupiedBy &&
                board[a].occupiedBy === board[b].occupiedBy &&
                board[b].occupiedBy === board[c].occupiedBy
            ){
               winner = board[a].occupiedBy;
               setWonBy({by:winner,indexes:elems});
               if(winner === "X"){
                setMatchResult(prev => ({
                  ...prev,
                  playerX:prev.playerX + 1
                }))
               }else{
                setMatchResult(prev => ({
                  ...prev,
                  playerO:prev.playerO + 1
                }))
               }
               setShowResetButton(true)
            }
                
            })

    // Checking  for Draw
    // Checking if all the squares inside the board are occupied using js in-built method
       const allOccupiedSquares = board.every(square => square.occupiedBy);

        if(!winner && allOccupiedSquares) {
         setDraw(true)
         setShowResetButton(true)
         setMatchResult(prev => ({
             ...prev,
             tie: prev.tie + 1 
         }))
         
        }else{
         setDraw(false); 
         setMatchResult(prev => ({...prev,tie:prev.tie}))
        }

    }
  
    React.useEffect(()=>{
     checkWin()
    },[board])

    const handlePlayersTurn = (index) =>{  
    
        let updatedBoard = [...board];
        let isOccupied = updatedBoard[index].occupiedBy;
         // checking if a square is occupied 
        if(!isOccupied){
          if(currentPlyr !== "X"){
            setCurrentPlyr("X")
          }else{
            setCurrentPlyr("O")
          }
        }else{
           // if occupied then do nothing!
            return null
        }
        let newSquare = {...updatedBoard[index],occupiedBy:currentPlyr}
        updatedBoard[index] = newSquare 
        setBoard(updatedBoard)

    }
    // const handleReset = ()=>{
    //   setBoard(boardInfo);
    //   setDraw(false);
    //   setWonBy(null)
    //   setShowResetButton(false)
    // }

    const handleReset = ()=>{
        setBoard(boardInfo);
        setDraw(false);
        setWonBy(null);
        setShowResetButton(false)
    }

  return (
    <>
    <Header matchResult={matchResult} currentPlyr={currentPlyr}/>
    <div className='game-wrapper'>
        <Board 
         board={board} 
         handlePlayersTurn={handlePlayersTurn}
         wonBy = {wonBy && wonBy}
         draw = {draw}
        /> 
        {showResetButton && <button id='reset-btn' onClick={handleReset}>Reset</button>}
    </div>  
    </>
  )
}

export default App