import React, {useState, useEffect} from 'react'

/*

Board States:
  - 0 -> startAlgorithm
  - 1 -> walls
  - 2 -> start
  - 3 -> stop
  - 4 -> show
  
Tile States:
  - 0 -> Untouched
  - 1 -> walls
  - 2 -> start
  - 3 -> stop
  - 4 -> Show Path during algorithm
  - 5 -> added to list will look at later
*/

const GButton = (props) => {
  const [selfButton, setSelfButton] = useState(0)
  const boardState = props.dataMap.boardState
  const buttonState = props.dataMap.buttonState
  const colorMapper = {
    0:'bg-slate-400 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600', // untouched
    1:'bg-stone-500 dark:bg-stone-800 hover:bg-stone-400 dark:hover:bg-stone-700', // walls
    2:'bg-sky-400 dark:bg-sky-800 hover:bg-sky-300 dark:hover:bg-sky-700', // start
    3:'bg-sky-400 dark:bg-sky-800 hover:bg-sky-300 dark:hover:bg-sky-700', // end
    4:'bg-red-400 dark:bg-red-600 hover:bg-red-300 dark:hover:bg-red-500', // inside map
    5:'bg-red-300 dark:bg-red-500 hover:bg-red-200 dark:hover:bg-red-400', // checking
    6:'bg-green-300 dark:bg-green-500 hover:bg-green-200 dark:hover:bg-green-400' // showing path
    }
    const cord = [props.coords.r, props.coords.c]
      useEffect(() =>{
        if(selfButton != 1 || selfButton != 2 || selfButton != 3){
          setSelfButton(buttonState[cord[0]][cord[1]])
        }
      }, [buttonState[cord[0]][cord[1]]])
  // console.log("CORD",cord, buttonState ,cord[0], cord[1])
  const handleButtonClick = () => {
    if(boardState == 0){
      // Start -> 2
      // buttonState[current[0]][current[1]] = 0
      buttonState[cord[0]][cord[1]] = 2
      
      props.dataMap.setBoardState((boardState +1) % 3)
      
      props.dataMap.setButtonState([...buttonState])
      props.dataMap.setStart(cord)
      setSelfButton(2)
    }else if (boardState == 1){
      // end -> 3
      if(selfButton != 2){
        buttonState[cord[0]][cord[1]] = 3
        props.dataMap.setBoardState((boardState +1) % 3)
        props.dataMap.setButtonState([...buttonState])
        props.dataMap.setEnd(cord)
        setSelfButton(3)
      }
    }else if (boardState == 2){
      // walls -> 1
      if(props.dataMap.walls > 0 && selfButton != 1 && selfButton != 2 && selfButton != 3){
        buttonState[cord[0]][cord[1]] = 1
        props.dataMap.setButtonState([...buttonState])
        props.dataMap.setWalls(props.dataMap.walls - 1)
        setSelfButton(1)
      }
    }
  }
  
  return (
    <div className={`btn w-14 rounded-none ${colorMapper[selfButton]}`} onClick={handleButtonClick}></div>
  )
}

export default GButton