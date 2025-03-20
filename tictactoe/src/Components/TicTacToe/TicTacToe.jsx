import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import cross from '../Assets/cross.png';
import circle from '../Assets/circle.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleref = useRef();
    const box1 = useRef();
    const box2 = useRef();
    const box3 = useRef();
    const box4 = useRef();
    const box5 = useRef();
    const box6 = useRef();
    const box7 = useRef();
    const box8 = useRef();
    const box9 = useRef();

    const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];


    const toggle = (e, num) => {
        if (lock) {
            return; // Simply return if the game is locked
        }

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src=${cross} alt="cross" />`;
            data[num] = "X";
        } else {
            e.target.innerHTML = `<img src=${circle} alt="circle" />`;
            data[num] = "O";
        }
        setCount(count + 1);
        checkWinner();
    };

    const checkWinner = () => {
        // Winning combinations
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (data[a] !== "" && data[a] === data[b] && data[a] === data[c]) {
                win(data[a]); // Pass the winning player's symbol
                return; // Stop checking after a winner is found
            }
        }

        // Check for a draw
        if (count === 9) {
            titleref.current.textContent = "It's a draw!";
            setLock(true);
        }
    };

    const win = (winner) => {
        setLock(true);
        titleref.current.textContent = `Player ${winner} wins!`;
    };

    const restart = () => {
        setCount(0);
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        titleref.current.textContent = "TicTacToe Project";
        boxes.map((e) => {
            e.current.innerHTML = "";
        });
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleref}>TicTacToe <span>Project</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            <button className="Restart" onClick={() => { restart() }}>Restart</button>
        </div>
    );
};

export default TicTacToe;
