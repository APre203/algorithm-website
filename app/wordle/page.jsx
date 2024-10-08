"use client";
import BButton from "@components/tic/BButton";
import WBoard from "@components/wordle/WBoard";
import { useState, useEffect } from "react"

const Home = () => {
  const handleAPI = async () => {
    
    const response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
          messages:
              [
                  {
                      role: "system",
                      content: [
                          {
                              type: "text",
                              text: "You are a wordle word generator. Return only a word that can be used for a wordle game.",
                          },
                      ],
                  },
                  {
                      role: "user",
                      content: [
                          {
                              type: "text",
                              text: "Generate a word for wordle game",
                          },
                      ],
                  },
              ],
      }),
      headers: {
          'Content-Type': 'application/json',
      }
    })
    
    const result = (await response.json()).data
    console.log("Result",result)
    return result
  
  }

  const data = {
    word:"word"
  }

  return (
    <div className="flex">
      <div>Wordle</div>
      <button onClick={handleAPI}>Start (will generate a word and generate the box)</button>
      <WBoard data={data}></WBoard>
    </div>
  )
}

export default Home