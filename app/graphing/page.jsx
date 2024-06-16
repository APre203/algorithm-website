"use client";
import GBoard from "@components/graph/GBoard";
import GButton from "@components/graph/GButton";
import { useState, useEffect } from "react"

const Home = () => {
  const [state, changeState] = useState(0)
  const algorithmMap = {0:"BFS", 1:"DFS", 2:"DXT"}
  function renderAlgorithm(){
    
    if(state == 0){
      return(
        // BFS
        <div>BFS</div>
    )
    }else if(state == 1){
      // DFS
      return(<div>{algorithmMap[state]}</div>)
    }else if(state == 2){
      // DXT
      return(<div>{algorithmMap[state]}</div>)
    }
  }
  return (
    <section className="w-full flex flex-col text-center pb-5">
        <h1 className="p-4">
          Graphing Algorithms
        <div role="tablist" className="tabs tabs-lg tabs-lifted justify-center">
          <div role="tab" className={`tab ${state === 0 ? 'tab-active' : ''}`} onClick={()=>{changeState(0)}}>BFS</div>
          <div role="tab" className={`tab ${state === 1 ? 'tab-active' : ''}`} onClick={()=>{changeState(1)}}>DFS</div>
          {/* <div role="tab" className={`tab ${state === 2 ? 'tab-active' : ''}`} onClick={()=>{changeState(2)}}>DXT</div> */}
        </div>
        </h1>
        <div className="flex justify-center">
          <GBoard pageState={state}/>
        </div>
    </section>
  )
}

export default Home