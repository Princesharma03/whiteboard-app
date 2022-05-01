import React from 'react';
import Board from '../board/Board'
import { useParams } from "react-router-dom";
import { Clipboard2Plus } from "react-bootstrap-icons";

import { useState } from 'react';
import './style.css';
// import io from 'socket.io-client';
// const socket = io.connect("http://localhost:3000");


const Container=()=>{
    
    const [color,setColor]=useState("#000000");
    const [size,setSize]=useState("5");
    const prams=useParams();
    // socket.emit("canvas-data",prams.room);

    const changeColor=(event)=>{
        setColor(event.target.value);
    }
    const changeSize=(event)=>{
        setSize(event.target.value);
    }
    
    const myFunction=() => {
        navigator.clipboard.writeText("https://whiteboard-app-green.vercel.app/whiteboard/"+prams.room);
    }






    return(
        <div className='container'>
                           <div className='color-picker-container'>
                               Select Brush Color : &nbsp;
                               <input type="color" value={color} onChange={changeColor} />
                           </div>
                           <div className='brushsize-container'>
                               Select Brush size : &nbsp;
                           <select value={size} onChange={setSize}> 
                               <option>5</option>
                               <option>10</option>
                               <option>15</option>
                               <option>20</option>
                               <option>25</option>
                               <option>30</option>
                           </select>
                           </div>
                           <div class="shareDiv">
                           <button className='sharebtn' onClick={myFunction}><Clipboard2Plus/></button>
                           </div>


                           {/* <input type='text' onChange={this.changeRoom.bind(this)}/> */}
                           <div className='board-container'>
                               <Board color={color} size={size} room={prams.room}></Board>
                           </div>
                       </div>

    )
    
}



export default Container