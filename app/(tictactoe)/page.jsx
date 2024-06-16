"use client";
import { useState, useEffect } from "react"
import Board from "@components/tic/Board"
import ScoreBoard from "@components/tic/ScoreBoard"

const Home = () => {
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [isBotActive, setBot] = useState(true);
  const [p, setP] = useState(0) // Whose turn is up

  const botStatus = !isBotActive ? "Bot Active ( Player 2 )"  : "Activate the Bot" 
  return (
    <section className="w-full flex flex-col text-center">
        <h1 className="mb-10">
            Tik Tak Toe Game - MiniMax Algorithm
        </h1>
        {/* Who is up */}
        <div className="flex justify-center">
          <Board setPageP={setP} isNotBot={isBotActive} states={[setPlayer1, setPlayer2]}/>
          <div className="place-content-center">
            <div className="">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" /> {/*disabled={p==1 && !isBotActive} */}
                <div onClick={()=>{isBotActive ? setBot(!isBotActive) :setBot(!isBotActive)}} className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0"/>
                <div className="px-2">{botStatus}</div>
              </label>
            </div>
            <ScoreBoard score1={player1} score2={player2}/>

          </div>
          
        </div>
        
    </section>
  )
}

export default Home