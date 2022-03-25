

import { useRef, useState,useEffect } from 'react';
import Chess from 'chess.js';

import { Chessboard } from 'react-chessboard';



export default function StyledBoard(props) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState('white');


  

 
  

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  function compareMoves(expected,actual){
   
    expected.promotion = "q";
    let exp = JSON.stringify(expected)
    let act = JSON.stringify(actual)
    console.log(exp,act)

    if(exp === act){
        return true
    }
    return false;
  }


  function handleFinish(){
    if(props.currentMove>= props.openingSelected.moves.length-1){
      setTimeout(()=>{
        alert("all done")
       
          
        safeGameMutate((game) => {
          game.reset();
        });
        props.setCurrentMove(1)
        chessboardRef.current.clearPremoves();
        props.randomSelect()
      },1000)


    }

  }


  function makeRandomMove() {
    const moveIdx = props.currentMove

    // exit if the game is over
    if (game.game_over() || game.in_draw() ) return;

    
    safeGameMutate((game) => {
       
      game.move(props.openingSelected.moves[props.currentMove]);
    });
   
  }


  function onDrop(sourceSquare, targetSquare) {
   
    const gameCopy = { ...game };
    let m = {
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      }

 
    const move = gameCopy.move(m);
    props.setCurrentMove(props.currentMove + 2);
    setGame(gameCopy);
 

    // illegal move
    if (move === null) return false;
    
    return true;
}


function onDropChecked(sourceSquare, targetSquare) {
  
  const gameCopy = { ...game };
  let m = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    }
    
  if(compareMoves(props.openingSelected.moves[props.currentMove-1],m)){
  const move = gameCopy.move(m);
  props.setCurrentMove(props.currentMove + 2);
  setGame(gameCopy);


  // illegal move
  if (move === null) return false;

  setTimeout(makeRandomMove, 200);
  handleFinish()
  
  return true;
}
return false

}


  return (
    <div className = "chess-board"> 
  
      <Chessboard
        id="PlayVsRandom"
        arePremovesAllowed={true}
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={props.boardWidth}
        customArrows={arrows}
        position={game.fen()}
        onPieceDrop={props.play === true ? onDropChecked: onDrop}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        
        }}
        ref={chessboardRef}
      />
      
     
      <button
        className="rc-button"
        onClick={() => {
           props.setCurrentMove(1)
          
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        reset
      </button>
      <button
        className="rc-button"
        onClick={() => {
      
          setBoardOrientation((currentOrientation) => (currentOrientation === 'white' ? 'black' : 'white'));
          
       
        }}
      >
        flip board
      </button>
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        undo
      </button>
      <button
        className="rc-button"
        onClick={() => {
          setArrows([
            ['a3', 'a5'],
            ['g1', 'f3']
          ]);
        }}
      >
        Set Custom Arrows
      </button> 
      
    </div>
  
  );
}