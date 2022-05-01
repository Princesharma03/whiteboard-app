import React from 'react';
import io from 'socket.io-client';
import './style.css';
import { Download } from "react-bootstrap-icons";

class Board extends React.Component {
 
    
    socket = io.connect("https://limitless-oasis-67091.herokuapp.com");
    room;
    timeout;
    ctx;
    isDrawing = false;
    
    constructor(props) {
        super(props);
      
        this.socket.on("canvas-data", function(data){

            var root = this;
            var interval = setInterval(function(){
                if(root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function() {
                    ctx.drawImage(image, 0, 0);

                    root.isDrawing = false;
                };
                image.src = data;
            }, 200)
        })
        
    }

    componentDidMount() {
        //  console.log(this.props)
        this.socket.emit("join-room",this.props.room);
        this.drawOnCanvas();
    }
    

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
        this.room=newProps.room;
    }
    
    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        
        
        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;
     
        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        var rooms=this.props.room;
        // console.log(this.props.room)
        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
              
            if(root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                console.log(rooms);
                root.socket.emit("canvas-data", base64ImageData,rooms);
            }, 500)
        };
    }
   
    render() {
        return (
            <div class="sketch" id="sketch">
                <a id="download" download="whiteboard.png">
                <button type="button" className='bydownbtn' onClick={()=>{var download = document.getElementById("download");
                 var image = document.getElementById("board").toDataURL("image/png")
                 .replace("image/png", "image/octet-stream");
                 download.setAttribute("href", image);}}><Download/></button>
                </a>
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}

export default Board