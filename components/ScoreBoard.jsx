import React from 'react'

const ScoreBoard = (props) => {
  // will need to access stored data on score count
  return (
    <div className="stats shadow">
  
      <div className="stat place-items-center">
        <div className="stat-title text-secondary">Player 1 Wins</div>
        <div className="stat-value text-secondary">{props.score1}</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title text-secondary">Player 2 Wins</div>
        <div className="stat-value text-secondary">{props.score2}</div> 
      </div>
    
  </div>
  )
}

export default ScoreBoard