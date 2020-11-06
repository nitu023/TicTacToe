import React, { useEffect, useState } from 'react'
import './App.css';

let initMatrix = []
let  matrixSize = 3
function App() {
  const [matrix, setMatrix] = useState(initMatrix)
  const [currentPlayer, setCurrentPlayer] = useState('o')
  const [selR, setSelR] = useState(null)
  const [selC, setSelC] = useState(null)
  const [winner, setWinner] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect( () => {
    setWinner(false);
    setSelR(null);
    setSelC(null);
    const rows = new Array(matrixSize).fill(null);
    const tempMatrix = [];

    for(let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...rows])
    }
    setMatrix(tempMatrix)
  }, [reset])

  const squareClickHandle = (row, col) => {
    console.log(row, col)
    if(!matrix[row][col] && !winner){
      setSelC(col)
      setSelR(row)
      let nextPlayer = currentPlayer === "x" ? "0" : "x";
      setCurrentPlayer(nextPlayer);
      const matrixCopy = [...matrix];
      matrixCopy[row][col] = nextPlayer;
      setMatrix(matrixCopy);
    }
  }
  function isWinner(){
    let vertical = true;
    let horizontal = true;
    let d1 = true;
    let d2 = true;
    if (selR === null || selC === null){
      return 
    }
    for(let i = 0; i<matrixSize; i++){
      if(matrix[i][selC] !== currentPlayer){
        vertical= false
      }
      if(matrix[selR][i] !== currentPlayer){
        horizontal= false
      }
      if(matrix[i][i] !== currentPlayer){
        d1= false
      }
      if(matrix[i][matrixSize - i - 1] !== currentPlayer){
        d2 = false
      }
    }
    if(vertical || horizontal || d1 || d2){
      setWinner(true)
    }
  }
  useEffect(() => {
    if(!winner){
      isWinner()
    }
  })
  function resetGameHandle(){
    setReset(!reset);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{margin:"30px", fontStyle:"oblique"}}>Tic Tac Toe</h1>
        <div onClick={resetGameHandle} style={{margin:"30px",}} className="but">Reset Game</div>
        <div>
          {
            matrix.map( (items, col) => {
             return (
               <div className="col"> 
               {
                 items.map((items1, row)=>{
                   return (
                     <div onClick={() => {squareClickHandle(row,col)}} className="row">{matrix[row][col]} </div>
                   )
                 })
               }
               </div>
             )
            })
          }
        </div>
        <h2 style={{color:"white" , margin:"20px"}}>{winner ? `Player ${currentPlayer} is winner`: null}</h2>
      </header>
    </div>
  );
}

export default App;
