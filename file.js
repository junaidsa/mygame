const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll('.grid div'));
const score = document.getElementById("score");
const startBtn = document.getElementById("start-button");
const btnImg = document.getElementById("btnImg");


let count = 0;
const width = 10;
// rought code
// for(i=0; i<200; i++){
//     squares[i].textContent=count
//     count++
// };
// arrow button
const leftBtn = document.getElementById("left")
const rightBtn = document.getElementById("right")
const downBtn = document.getElementById("down")
const rotateBtn = document.getElementById("rotate")
/// color
const color = [
    "#FF3353",
    "#A03EFF",
    "#33ff01",
    "#FFE833",
    "#15e915"
]

// shapes
const lshape = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
];
const zshape = [
    [width+1, width+2, width*2 , width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2 , width*2+1],
    [0, width, width+1, width*2+1],
];
const tshape = [
    [1,width,width+1,width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1],
];
const oshape = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    
];
const ishape = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width*+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];
const theshapes =[lshape, zshape, oshape, tshape, ishape];
//  center is users 
let currentposition = 4;
let currentRotation = 0;


// randomly selecting shapes
let random = Math.floor(Math.random()*theshapes.length)
let currentShape = theshapes[random][currentRotation];
// draw the shapes
function draw(){
    currentShape.forEach((index)=>{
        squares[currentposition + index].style.background = color[random]
    })
}
draw();
// erase the shape
function erase(){
    currentShape.forEach((index)=>{
        squares[currentposition + index].style.background = ''
    });
}
// movedown 
function moveDown(){
    erase()
    currentposition += width
    draw()
    stop()

}
draw()
var timer = setInterval(moveDown, 300);
function stop(){
    if(currentShape.some(index => squares[currentposition + index + width].classList.contains('freeze'))){
        currentShape.forEach(index => squares[currentposition + index].classList.add('freeze'))
// ### start an new shape falling
        random = Math.floor(Math.random()*theshapes.length)
        currentRotation = 0
        currentShape = theshapes[random][currentRotation]
        currentposition = 4

        draw()
        gameOver();
        // addscore();
        addScore();
    }
}
// contorl the game
function control(e){
    if(e.keyCode === 37){
        moveLeft()
    }
    else if(e.keyCode === 39){
        moveRight()
    }
    else if(e.keyCode === 40){
        moveDown()

    }
    else if(  e.keyCode === 32){
        rotate()
    } 
    
}
window.addEventListener("keydown", control);
// #####
leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
downBtn.addEventListener("click", moveDown);
// rotateBtn.addEventListener("click", rotate);


// moveleft funation
function moveLeft(){
    erase()
    let LeftBlockage = currentShape.some(index=>(currentposition + index) % width === 0)
    let Blockage = currentShape.some(index => squares[currentposition + index - 1].classList.contains('freeze'));
   if(!LeftBlockage && !Blockage){
    currentposition--;
   }
   draw()
}

function moveRight(){
    erase()
    let RightBlockage = currentShape.some(index=>(currentposition + index) % width === width-1)
    let Blockage = currentShape.some(index => squares[currentposition + index + 1].classList.contains('freeze'));
   if(!RightBlockage && !Blockage){
    currentposition++;
   }
   draw()
}
 // Rotate function
 function rotate(){
     erase()
     currentRotation++
     if(currentRotation === 4){
         currentRotation = 0
     }
     currentShape = theshapes[random][currentRotation];
     draw()
 }
 // add functionality to Pause button
function Pause(){
    if(timer){
        clearInterval(timer)
        timer = null;
        btnImg.src = './img/play.png';
    }else{
        draw()
        timer = setInterval(moveDown, 1000);
        btnImg.src = "./img/pause.png"
    }
}



startBtn.addEventListener("click", Pause)

/// game over funcation
 function gameOver(){
if(currentShape.some(index => squares[currentposition + index].classList.contains('freeze'))){
    Pause()
    alert("Game over")
    location.reload();
    

    clearInterval(timer)
   
}
 }
//  Add function
function addScore(){
    for(let i=0; i<199; i += width){
        const row = [i , i+1, i+2, i+3, i+4, i+5, i+6 ,i+7, i+8, i+9];
        console.log(row)
        if(row.every(index => squares[index].classList.contains("freeze"))){
            count +=10
            score.textContent = `score:${count}`
            var audio = new Audio('sms-gun-2481-53247.mp3');
            audio.play();
            row.forEach(index =>{
                squares[index].classList.remove("freeze");
                squares[index].style.background = ''
            });
   const squareRemoved = squares.splice(i,width)
   console.log(squareRemoved)
   squares = squareRemoved.concat(squares)
   squares.forEach(square => grid.appendChild(square))
        }
    }
}

function refresh(){
    window.location.reload("Refresh")
  }

