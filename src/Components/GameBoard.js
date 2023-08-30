import React,{useEffect, useState} from "react";

import '../game.css';

import Header from "./header";

import Footer from "./footer";

import GameCircle from "./GameCircle";

import { isDraw, isWinner, getComputerMoves } from "../helper";

import { GAME_STATE_PLAYING, 
    GAME_STATE_WIN,
    NO_PLAYER, 
    PLAYER_1, 
    PLAYER_2,
    NO_CIRCLES, 
    GAME_STATE_DRAW} from "../Constants";

const GameBoard = () =>{
    const [gameBoard, setgameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPlayer, setcurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState]= useState(GAME_STATE_PLAYING);
    const [winPlayer, setwinPlayer]= useState(NO_PLAYER);

    console.log(gameBoard);

    useEffect(() => {
        initGame()
    }, [])

    const initGame = () => {
        setgameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setcurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
        }

    const initBoard =() =>{
        const circles =[];

        for(let i=0;i<NO_CIRCLES;i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove= () =>{
        circleClicked(getComputerMoves(gameBoard));
    }

    const circleClicked= (id) => {
        console.log("Circle clicked:" +id);

        if(gameBoard[id]!== NO_PLAYER)return;
        if(gameState !== GAME_STATE_PLAYING)return;

        if(isWinner(gameBoard, id, currentPlayer)){
            setGameState(GAME_STATE_WIN);
            setwinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard, id, currentPlayer)){
            setGameState(GAME_STATE_DRAW);
            setwinPlayer(currentPlayer);
        }

        setgameBoard(prev =>{
            return prev.map((circle,pos) =>{
                if(pos===id) return currentPlayer
                return circle;
            })
        })

        setcurrentPlayer(currentPlayer===PLAYER_1?PLAYER_2:PLAYER_1);

        console.log(gameBoard);
        console.log(currentPlayer);
    }
    
    const renderCircle= id =>{
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
            <div className="gameBoard">{initBoard()}</div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
        </>
       
    );
};

export default GameBoard;