/*

graph - matrix n x n
start - tuple [x,y]
end - tuple [x,y]
bfs - bool true | false
waitTime - int 0 | s 

*/

let MAX_COORD = 99 
const WALLS = 1
const BCHECKED = 4
const BPATH = 5
const FOUNDPATH = 6

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getNeighbors(head){ // FOR NOW ASSUME THAT 
    const x = head[0]
    const y = head[1]
    const right = [x+1,y]
    const down = [x,y+1]
    const up = [x, y-1]
    const left = [x-1,y]
    const lst = [right, down, up, left]
    const retval = []
    for (let i of lst){
        if((i[0] >= 0 && i[0] <= MAX_COORD) && (i[1] >= 0 && i[1] <= MAX_COORD)){
            retval.push(i)
        }
    } 
    return retval
    }

async function algorithmBD(start, end,graph, setButtonState, setInGame, waitTime = 0, bfs=true){
    // const initBoard = [
    //     [2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3]]
    // setButtonState([...initBoard]);
    // const graph = initBoard
    const DS = []
    const checked = new Map()
    const directionMap = new Map()
    directionMap.set(String(start),String(start))
    MAX_COORD = graph.length - 1
    // use a queue
    DS.push(start)
    
    checked.set(String(start), start)
    while (DS.length != 0){
        let head = 0
        if(bfs){
            head = DS.shift()
        }else{
            head = DS.pop()
        }
        if (graph[head[0]][head[1]] != WALLS && graph[head[0]][head[1]] != 2 && graph[head[0]][head[1]] != 3){
            graph[head[0]][head[1]] = BCHECKED
            setButtonState([...graph]);
        }
        const neighbors = getNeighbors(head)
        for(let n of neighbors){
            if(!checked.has(String(n)) && graph[n[0]][n[1]] != WALLS){
                DS.push(n)
                directionMap.set(String(n),String(head))
                checked.set(String(n), head)
                if (graph[n[0]][n[1]] != 2 && graph[n[0]][n[1]] != 3){
                    graph[n[0]][n[1]] = BPATH
                    setButtonState([...graph]);
                }
                
            }
        }
        await delay(waitTime);
        // console.log("Finished Loop")
        
    }
    
    let spot = String(end)
    // console.log("Spot", spot, start, end, (start))
    if(directionMap.get(String(end))){
        const array = []
        while (spot != String(start)){
            const strArray = spot.split(',');

            const coordinates = strArray.map(Number);
            array.push(coordinates)
            spot = directionMap.get(spot)
            
            // if (spot == start)
        }
        array.reverse()
        for(let c of array){
            if(graph[c[0]][c[1]] != 2 && graph[c[0]][c[1]] != 3){
                graph[c[0]][c[1]] = FOUNDPATH
                setButtonState([...graph]);
                await delay(waitTime);
            }
        }
    }else{
        console.log("Not Found")
    }
    setInGame(false)
}

// const graph = [[0,0,0],[0,0,0],[0,0,0]]
// console.log("Old Graph", graph)
/*
[ S, 0, 0 ]
[ -1, 0, 0 ]
[ E, 0, 0 ]

*/
// const start = [0,0]
// const end = [2,0]
// algorithmBD(graph,start,end)

export {algorithmBD}