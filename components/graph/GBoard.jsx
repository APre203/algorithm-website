import React, { useState, useEffect } from 'react'
import GButton from './GButton'
import { algorithmBD } from '@utils/graphAlgorithms';

/*

Board States:
  - 0 -> start
  - 1 -> stop
  - 2 -> walls
  - 3 -> show
  
Tile States:
  - 0 -> Untouched
  - 1 -> walls
  - 2 -> start
  - 3 -> stop
  - 4 -> Show Path during algorithm
*/

// NEXT TIME HAVE DATA AS A MAP WITH ALL THE NECESSARY DATA
const GBoard = (props) => {
    // states for the buttons clicked
    const bfs = props.pageState == 0 ? true : false
    const [boardState, setBoardState] = useState(0)
    const [inGame, setInGame] = useState(false)
    const [walls, setWalls] = useState(20)
    const [start, setStart] = useState([2,4])
    const [end, setEnd] = useState([9,9])
    const initBoard = [
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    // initBoard[start[0]][start[1]] = 2
    // initBoard[end[0]][end[1]] = 3

    const [buttonState, setButtonState] = useState(initBoard)
    const [sliderValue, setSliderValue] = useState(50);

    const handleStartAlgorithm = () => {
      if(!inGame){
        setInGame(true)
        algorithmBD(start, end,buttonState, setButtonState,setInGame,sliderValue,bfs);  
      }
      setBoardState(3)
    };
    const handlePlayAgain = () => {
      if(!inGame){
        setBoardState(0)
        setWalls(20)
        const initBoard = [
          [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
      
        setButtonState([...initBoard]);
      }
    }

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };
    const renderTop = () => {
      if(boardState==0){
        return(<div><div className='btn mb-2 pointer-events-none'>Start Location</div></div>)
      }else if (boardState == 1){
        return(<div><div className='btn mb-2 pointer-events-none'>Stop Location</div></div>)
      }else if (boardState == 2){
        return(
        <div className='pb-2 space-x-4'><div className='btn pointer-events-none mb-2 text-l'>Walls - {walls}</div><button className='btn text-l' onClick={handleStartAlgorithm}>Start Algorithm</button>
        <div className='grid grid-cols-4 text-xl'>
          Speed (ms):
          <div className='col-span-3 w-full px-5'>
            <input type="range" min={0} max="100" value={sliderValue} className="range range-primary" step="25" onChange={handleSliderChange}/>
              <div className="w-full flex justify-between px-2">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
              </div>
          </div>
        </div>
        </div>)
      }else{
        return(<div><button className='btn mb-2' onClick={handlePlayAgain}>Play Again</button></div>)
      }
      
    }
  const dataMap = {
    boardState:boardState,
    setBoardState:setBoardState,
    setWalls:setWalls,
    setStart:setStart,
    setEnd:setEnd,
    setButtonState:setButtonState,
    buttonState:buttonState,
    walls:walls
  }
  return (
    <div className='place-content-center text-center justify-center'>
        
        {renderTop()}
        <div className='p-0 m-0 grid grid-cols-10 grid-rows-10'> {/*onClick={handleClickedDiv}*/}
        <GButton dataMap={dataMap} coords={{r:0,c:0}}/>
          <GButton dataMap={dataMap} coords={{r:0,c:1}}/>
          <GButton dataMap={dataMap} coords={{r:0,c:2}}/>
          <GButton dataMap={dataMap} coords={{r:0,c:3}}/>
          <GButton dataMap={dataMap} coords={{r:0,c:4}} />
          <GButton dataMap={dataMap} coords={{r:0,c:5}} />
          <GButton dataMap={dataMap} coords={{r:0,c:6}} />
          <GButton dataMap={dataMap} coords={{r:0,c:7}} />
          <GButton dataMap={dataMap} coords={{r:0,c:8}} />
          <GButton dataMap={dataMap} coords={{r:0,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:1,c:0}} />
          <GButton dataMap={dataMap} coords={{r:1,c:1}} />
          <GButton dataMap={dataMap} coords={{r:1,c:2}} />
          <GButton dataMap={dataMap} coords={{r:1,c:3}} />
          <GButton dataMap={dataMap} coords={{r:1,c:4}} />
          <GButton dataMap={dataMap} coords={{r:1,c:5}} />
          <GButton dataMap={dataMap} coords={{r:1,c:6}} />
          <GButton dataMap={dataMap} coords={{r:1,c:7}} />
          <GButton dataMap={dataMap} coords={{r:1,c:8}} />
          <GButton dataMap={dataMap} coords={{r:1,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:2,c:0}} />
          <GButton dataMap={dataMap} coords={{r:2,c:1}} />
          <GButton dataMap={dataMap} coords={{r:2,c:2}} />
          <GButton dataMap={dataMap} coords={{r:2,c:3}} />
          <GButton dataMap={dataMap} coords={{r:2,c:4}} />
          <GButton dataMap={dataMap} coords={{r:2,c:5}} />
          <GButton dataMap={dataMap} coords={{r:2,c:6}} />
          <GButton dataMap={dataMap} coords={{r:2,c:7}} />
          <GButton dataMap={dataMap} coords={{r:2,c:8}} />
          <GButton dataMap={dataMap} coords={{r:2,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:3,c:0}} />
          <GButton dataMap={dataMap} coords={{r:3,c:1}} />
          <GButton dataMap={dataMap} coords={{r:3,c:2}} />
          <GButton dataMap={dataMap} coords={{r:3,c:3}} />
          <GButton dataMap={dataMap} coords={{r:3,c:4}} />
          <GButton dataMap={dataMap} coords={{r:3,c:5}} />
          <GButton dataMap={dataMap} coords={{r:3,c:6}} />
          <GButton dataMap={dataMap} coords={{r:3,c:7}} />
          <GButton dataMap={dataMap} coords={{r:3,c:8}} />
          <GButton dataMap={dataMap} coords={{r:3,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:4,c:0}} />
          <GButton dataMap={dataMap} coords={{r:4,c:1}} />
          <GButton dataMap={dataMap} coords={{r:4,c:2}} />
          <GButton dataMap={dataMap} coords={{r:4,c:3}} />
          <GButton dataMap={dataMap} coords={{r:4,c:4}} />
          <GButton dataMap={dataMap} coords={{r:4,c:5}} />
          <GButton dataMap={dataMap} coords={{r:4,c:6}} />
          <GButton dataMap={dataMap} coords={{r:4,c:7}} />
          <GButton dataMap={dataMap} coords={{r:4,c:8}} />
          <GButton dataMap={dataMap} coords={{r:4,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:5,c:0}} />
          <GButton dataMap={dataMap} coords={{r:5,c:1}} />
          <GButton dataMap={dataMap} coords={{r:5,c:2}} />
          <GButton dataMap={dataMap} coords={{r:5,c:3}} />
          <GButton dataMap={dataMap} coords={{r:5,c:4}} />
          <GButton dataMap={dataMap} coords={{r:5,c:5}} />
          <GButton dataMap={dataMap} coords={{r:5,c:6}} />
          <GButton dataMap={dataMap} coords={{r:5,c:7}} />
          <GButton dataMap={dataMap} coords={{r:5,c:8}} />
          <GButton dataMap={dataMap} coords={{r:5,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:6,c:0}} />
          <GButton dataMap={dataMap} coords={{r:6,c:1}} />
          <GButton dataMap={dataMap} coords={{r:6,c:2}} />
          <GButton dataMap={dataMap} coords={{r:6,c:3}} />
          <GButton dataMap={dataMap} coords={{r:6,c:4}} />
          <GButton dataMap={dataMap} coords={{r:6,c:5}} />
          <GButton dataMap={dataMap} coords={{r:6,c:6}} />
          <GButton dataMap={dataMap} coords={{r:6,c:7}} />
          <GButton dataMap={dataMap} coords={{r:6,c:8}} />
          <GButton dataMap={dataMap} coords={{r:6,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:7,c:0}} />
          <GButton dataMap={dataMap} coords={{r:7,c:1}} />
          <GButton dataMap={dataMap} coords={{r:7,c:2}} />
          <GButton dataMap={dataMap} coords={{r:7,c:3}} />
          <GButton dataMap={dataMap} coords={{r:7,c:4}} />
          <GButton dataMap={dataMap} coords={{r:7,c:5}} />
          <GButton dataMap={dataMap} coords={{r:7,c:6}} />
          <GButton dataMap={dataMap} coords={{r:7,c:7}} />
          <GButton dataMap={dataMap} coords={{r:7,c:8}} />
          <GButton dataMap={dataMap} coords={{r:7,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:8,c:0}} />
          <GButton dataMap={dataMap} coords={{r:8,c:1}} />
          <GButton dataMap={dataMap} coords={{r:8,c:2}} />
          <GButton dataMap={dataMap} coords={{r:8,c:3}} />
          <GButton dataMap={dataMap} coords={{r:8,c:4}} />
          <GButton dataMap={dataMap} coords={{r:8,c:5}} />
          <GButton dataMap={dataMap} coords={{r:8,c:6}} />
          <GButton dataMap={dataMap} coords={{r:8,c:7}} />
          <GButton dataMap={dataMap} coords={{r:8,c:8}} />
          <GButton dataMap={dataMap} coords={{r:8,c:9}} />
          
          <GButton dataMap={dataMap} coords={{r:9,c:0}} />
          <GButton dataMap={dataMap} coords={{r:9,c:1}} />
          <GButton dataMap={dataMap} coords={{r:9,c:2}} />
          <GButton dataMap={dataMap} coords={{r:9,c:3}} />
          <GButton dataMap={dataMap} coords={{r:9,c:4}} />
          <GButton dataMap={dataMap} coords={{r:9,c:5}} />
          <GButton dataMap={dataMap} coords={{r:9,c:6}} />
          <GButton dataMap={dataMap} coords={{r:9,c:7}} />
          <GButton dataMap={dataMap} coords={{r:9,c:8}} />
          <GButton dataMap={dataMap} coords={{r:9,c:9}} />
          
            
        </div>
    </div>
  )
}

export default GBoard