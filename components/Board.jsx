"use client";
import React, { useState, useEffect } from 'react'
import BButton from './BButton'
import { minimaxFirst } from '@utils/minimaxFirst';
import { minimaxSecond } from '@utils/minimaxSecond';
const Board = (props) => {
  const [firstTurn, setTurn] = useState(false)
  const [p, setP] = useState(0)
  const [click, setClick] = useState(0)
  const matrix = [[-2,-2,-2],[-2,-2,-2],[-2,-2,-2]];
  const [inGame, setInGame] = useState(0)
  const [gB, setGB] = useState(matrix)
  const WHITE = -1
  const RED = 1
  const BLUE = 0
  const initColor = [[WHITE,WHITE,WHITE],[WHITE,WHITE,WHITE],[WHITE,WHITE,WHITE]];
  const [arrayColor, setArrayColor] = useState(initColor)
  const isNotBot = props.isNotBot
  /* 
  
  [ 0 | 1 | 2 ] (0,1,2), (0,4,8), (1,4,7), (2,5,8), (3,4,5), (6,7,8), (2,4,6)
  [ 3 | 4 | 5 ] (0,3,6)
  [ 6 | 7 | 8 ]
  
  (m[0][0],m[0][1],m[0][2])
  (m[0][0],m[1][1],m[2][2])
  (m[0][1],m[1][1],m[2][1])
  (m[0][2],m[1][2],m[2][2])
  (m[1][0],m[1][1],m[1][2])

  (m[2][0],m[2][1],m[2][2])
  (m[0][2],m[1][1],m[2][0])
  (m[0][0],m[1][0],m[2][0])

  */
  useEffect(()=>{
    if (click == 9 && ge && plyr == -1){
      const blueColor = [[BLUE,BLUE,BLUE],[BLUE,BLUE,BLUE],[BLUE,BLUE,BLUE]];
      setArrayColor(blueColor)
    }
  },[click])
  
  const gameEnded = () => {
    const lessThanFactor = -2
    const isWinner = () =>{
      // This will check if any of the arrays are a line
      if (gB[0][0] > lessThanFactor && gB[0][0] == gB[0][1] && gB[0][1] == gB[0][2]){
        arrayColor[0][0] = arrayColor[0][1] = arrayColor[0][2] = RED
        return [true, gB[0][0]]
      }else if (gB[0][0] > lessThanFactor && gB[0][0] == gB[1][1] && gB[1][1] == gB[2][2]){
        arrayColor[0][0] = arrayColor[1][1] = arrayColor[2][2] = RED
        return [true, gB[0][0]]
      }else if (gB[0][1] > lessThanFactor && gB[0][1] == gB[1][1] && gB[1][1] == gB[2][1]){
        arrayColor[0][1] = arrayColor[1][1] = arrayColor[2][1] = RED
        return [true, gB[0][1]]
      }else if (gB[0][2] > lessThanFactor && gB[0][2] == gB[1][2] && gB[1][2] == gB[2][2]){
        arrayColor[0][2] = arrayColor[1][2] = arrayColor[2][2] = RED
        return [true, gB[0][2]]
      }else if (gB[1][0] > lessThanFactor && gB[1][0] == gB[1][1] && gB[1][1] == gB[1][2]){
        arrayColor[1][0] = arrayColor[1][1] = arrayColor[1][2] = RED
        return [true, gB[1][0]]
      }else if (gB[2][0] > lessThanFactor && gB[2][0] == gB[2][1] && gB[2][1] == gB[2][2]){
        arrayColor[2][0] = arrayColor[2][1] = arrayColor[2][2] = RED
        return [true, gB[2][0]]
      }else if (gB[0][2] > lessThanFactor && gB[0][2] == gB[1][1] && gB[1][1] == gB[2][0]){
        arrayColor[0][2] = arrayColor[1][1] = arrayColor[2][0] = RED
        return [true, gB[0][2]]
      }else if (gB[0][0] > lessThanFactor && gB[0][0] == gB[1][0] && gB[1][0] == gB[2][0]){
        arrayColor[0][0] = arrayColor[1][0] = arrayColor[2][0] = RED
        return [true, gB[0][0]]
      }else{
        return [false, -1]
      }
    };
  
    const [win, player] = isWinner()
    if (win){
      return [true, player]
    }else if (click == 9){
      return [true, -1]
    }else{
      return [false, -1]
    }
  }

  const [ge, plyr] = gameEnded()
  
  const render_top = () => {
    if (ge){
      if (inGame == 0 || inGame == 1){
        setInGame(-1)
      }
      if (plyr > -1){
        return (
          <div className='flex flex-col'>
            Game Ended with {plyr===0 ? "Player 1" : "Player 2"} winning!
          </div>
        )
        /*
        0 - Player 1
        1 - Player 2
        [0, 0, 0]
        [1, 0, 1]
        [1, 1, 1] -> possible board
        */
      }else{
        return (
          <div className='flex flex-col'>
            Game Ended in a Draw
          </div>
        )
      }
    }else{
      return (
        <h2> It is {p===0 ? "Player 1" : "Player 2"}'s turn | Current: {click}</h2>
      )
    }
  }
  const render_game= () => {
    /*  
    inGame:
      -1 - Game Ended
      0 - In Game
      1 - New Game
    */
    // In here I think goes the functionality (gameEnded?)
    // Here check if its player 2 (1 on gB) -> start the thinking and click a button (change tile in gB THEN call gameEnded function)
    
    function clickTile(row, column){
      gB[row][column] = 1
      setClick(click+1)
      setP(0)
    }
    if (!ge && !isNotBot){
      if (firstTurn){
        if (p==1){
          const v = minimaxFirst(gB)
          clickTile(v[0],v[1])
        }
      }else{
        if (p == 1){
          const v = minimaxSecond(gB)
          clickTile(v[0],v[1])
        }
      }
    }
    
    return(
      <button className='grid grid-cols-3 grid-rows-3 bg-black' onClick={gameEnded}>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[0][0]} inGame={inGame} boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:0,c:0}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[0][1]} inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:0,c:1}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[0][2]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:0,c:2}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[1][0]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:1,c:0}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[1][1]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:1,c:1}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[1][2]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:1,c:2}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[2][0]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:2,c:0}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[2][1]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:2,c:1}}/>
          <BButton isNotBot={isNotBot} isChosen={arrayColor[2][2]}  inGame={inGame}  boardState={p} stateChanger={setP} clickChanger={setClick} gb={gB} coords={{r:2,c:2}}/>
        </button>
    )
    }
  const render_bottom = () => {
    if (ge){
      if (plyr > -1){
        return (
          <div className='flex flex-col'>

            <button className='btn bg-black text-white' onClick={()=>{setGB(matrix); setInGame(true);setClick(0); props.states[plyr](current => current+1);setArrayColor(initColor);p == 1 ? setTurn(true) : setTurn(false);}}> Play again</button>
          </div>
        )
      }else{
        return (
          <div className='flex flex-col'>
            <button className='btn bg-black text-white' onClick={()=>{setGB(matrix);setInGame(true); setClick(0); setArrayColor(initColor);p == 1 ? setTurn(true) : setTurn(false);}}> Play again</button>
          </div>
        )
      }
    }
  }
  
  return (
    // make a gameboard
    <div className='place-content-center text-center'>
      {render_top()}
      {render_game()}
      {render_bottom()}
    </div>
  )
  }

export default Board