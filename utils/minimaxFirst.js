/*

 - X: 0
 - O: 1
BOT NEEDS TO WORK WHEN P = 1 -> IF WE ARE TALKING ABOUT "X" AND "O" THEN THE BOT IS "O"

*/
let isFirstTurn = false
let X = 0
let O = 1

const EMPTY = -2

function player(board){
    let x = 0
    let o = 0
    for (let i of board){
        for(let j of i){
            if (j == X){
                x++
            }else if (j==O){
                o++
            }
        }
    }
    // x -> 1 ; o -> 0 : when O is first ||| x -> 0 ; o -> 1 : when X is first
    return o <= x ? O : X
    

    
    
}

function actions(board){
    const retval = []
    for (let i = 0; i < 3; i++){        
        for (let j =0; j < 3; j++){
            if (board[i][j] == EMPTY){
                retval.push([i,j])
            }
        }
    }
    // console.log(retval)
    return retval
}

function result(board, action){
    let new_board = board
    if (board[action[0]][action[1]] == EMPTY){
        new_board = JSON.parse(JSON.stringify(board))
        new_board[action[0]][action[1]] = player(board)
    }else{
        console.log("Error")
        return 
    }
    return new_board
}

function winner(board){
    const ret = {}
    ret[1] = X
    ret[-1] = O
    ret[0] = null
    return ret[utility(board)]
}

function terminal(board){
    let full = true
    for (let i of board){
        if (i.includes(EMPTY)){
            full = false
        }
    }
    if (full){
        return true
    }else if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != EMPTY){
        return true
    }else if (board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != EMPTY){
        return true
    }else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != EMPTY){
        return true
    }else if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != EMPTY){
        return true
    }
    else if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != EMPTY){
        return true
    }
    else if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != EMPTY){
        return true
    }
    else if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != EMPTY){
        return true
    }
    else if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != EMPTY){
        return true
    }
    else{
        return false
    }
}

function utility(board){
    const ret = {0:-1,1:1} // conversion factor (we want bot to focus on 1 -> 1 needs to count as 1)
    if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != EMPTY){
        return ret[board[0][0]]
    }else if (board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != EMPTY){
        
        return ret[board[0][0]]
    }else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != EMPTY){
        
        return ret[board[0][0]]
    }else if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != EMPTY){
        
        return ret[board[1][0]]
    }
    else if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != EMPTY){
        
        return ret[board[2][0]]
    }
    else if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != EMPTY){
        
        return ret[board[2][0]]
    }
    else if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != EMPTY){
        
        return ret[board[0][1]]
    }
    else if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != EMPTY){
        
        return ret[board[0][2]]
    }
    else{
        return 0
    }
}

function max_value(board){
    // console.log("MaxTerminal", terminal(board))
    if (terminal(board)){
        return utility(board)
    }
    let v = -1 * Infinity
    for (let a of actions(board)){
        const minval = min_value(result(board,a))
        v = Math.max(v, minval)
        
    }
    return v
}

function min_value(board){
    if (terminal(board)){
        return utility(board)
    }
    let v = Infinity
    for (let a of actions(board)){
        const maxval = max_value(result(board,a))
        v = Math.min(v, maxval)
        
    }
    return v
}

function minimaxFirst(board){
    // console.log(fixUpBoard(board, firstTurn))
    let v = [null, null]
    // console.log("Who is going right now", player(board))
    if (player(board) == O){ // trying to max
        // console.log("Acting as X")
        v = [-1 * Infinity, null]
        for (let a of actions(board)){
            const val = min_value(result(board,a))
            if (v[0] < val){
                v = [val, a]
            }
        }
    }else{ // trying to minimize
        // console.log("Acting as O")
        v = [Infinity, null]
        for(let a of actions(board)){
            const val = max_value(result(board,a))
            if (v[0] > val){
                v = [val, a]
            }
            
        }
    }
    // console.log("Answer", v[1], "Before",board,"After",result(board,v[1]))
    return v[1]
}

export{minimaxFirst}