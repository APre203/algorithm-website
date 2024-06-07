"use client";
import React, { useState, useEffect } from 'react';

const BButton = (props) => {
    const [player, setPlayer] = useState(null)
    let p = props.boardState;
    const characterMap = {0:"X", 1:"O"}
    useEffect(() => {
        if (props.inGame == 1){
            setPlayer(null)
        }
        
    }, [props.inGame])
    const validatePlayer = () => {
        return player==null;
    }
    if (props.gb[props.coords.r][props.coords.c]==1 && player != 1){
        setPlayer(1)
    }
    const updatePlayer = () => {
        const isValid = validatePlayer()
        if (isValid){
            props.boardState == 0 ? props.stateChanger(1):props.stateChanger(0) 
            props.clickChanger(current => current+1)
            props.gb[props.coords.r][props.coords.c] = p
            setPlayer(p)
        }
    }
    /*
    -1 - Game Ended
    0 - In Game
    1 - New Game
    */
    if (props.inGame == 0 || props.inGame == 1){
        if (!props.isNotBot && p==1){
            // bot is active
            return (
                <div className='btn rounded-none h-40 max-h-40 text-7xl bg-slate-400 dark:text-white dark:bg-slate-700'>{characterMap[player]}</div>
              )
        }
        return (
          <div className='btn rounded-none w-40 max-w-40 h-40 max-h-40 text-7xl bg-slate-400 dark:text-white dark:bg-slate-700' onClick={updatePlayer}>{characterMap[player]}</div>
        )
    }else{
        /*
        -1 - White
        0 - Blue
        1 - Red
        */
        if (props.isChosen == 1){
            return(
                <div className='btn rounded-none w-40 max-w-40 h-40 max-h-40 text-7xl text-red-700 bg-slate-400 dark:bg-slate-700' >{characterMap[player]}</div>
            )
        }else if (props.isChosen == -1){
            return(
                <div className='btn rounded-none w-40 max-w-40 h-40 max-h-40 text-7xl dark:text-white bg-slate-400 dark:bg-slate-700' >{characterMap[player]}</div>
            )
        }else{
            return(
                <div className='btn rounded-none w-40 max-w-40 h-40 max-h-40 text-7xl dark:text-blue-500 text-blue-700 bg-slate-400 dark:bg-slate-700' >{characterMap[player]}</div>
            )
        }
    }
}

export default BButton