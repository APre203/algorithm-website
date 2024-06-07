import React from 'react'

const ScoreBoard = (props) => {
  // will need to access stored data on score count
  return (
    <div className="stats shadow bg-slate-400 dark:bg-slate-700">
  
      <div className="stat place-items-center ">
        <div className="stat-title text-secondary text-black dark:text-white">Player 1 Wins</div>
        <div className="stat-value text-secondary text-black dark:text-white">{props.score1}</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title text-secondary text-black dark:text-white">Player 2 Wins</div>
        <div className="stat-value text-secondary text-black dark:text-white">{props.score2}</div> 
      </div>
    
  </div>
  )
}

export default ScoreBoard