
/**
 * Create a canvas element and add it to DOM, it takes 2 arguments.
 * 
 * @param {int} width The width of the canvas element
 * @param {int} height The height of the canvas element
 * @returns canvas object
 */

function makeCanvas(width = 1024, height = 576){
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.getElementById('game-container').appendChild(canvas);
    canvas.ctx = canvas.getContext("2d");
    return canvas;
}

/**
 * Generate a random integer in range
 * 
 * @param {int} min The minimum value in range
 * @param {int} max The maximum value in range
 * @returns {int} The random number
 *  
 */

function generateRandomIntegerInRange(min, max) {
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
}

/**
 * Generate a random number in range
 * 
 * @param {float} min The minimum value in range
 * @param {float} max The maximum value in range
 * @returns {float} The random floating number
 *  
 */

function generateRandomFloatInRange(min, max) {
    let rand = (Math.random() * (max - min + 1)) + min;
    return rand;
}

/**
 * Get The x and y coordinates of the mouse on click
 * 
 * @param {object} canvas The canvas element 
 * @param {event} event The mousedown event
 * @returns {mousePosition} an list containing x and y coordinates of the mouse click
 *  
 */

function getMousePosition(canvas, event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    //console.log("Coordinate X: " + x + " Coordinate Y: " + y);
    let mousePosition = {
        x: x,
        y: y
    }
    return mousePosition;
}

let timer = 0;
let timerId;

/**
 *  Increase and display the timer
 */

function increaseTimer(){
    timerId = setTimeout(increaseTimer,1000)
    if(timer<70) {
        timer++;
        document.getElementById('timer').innerHTML = 'Time: ' + timer;
    }else if(timer === 70){
        clearTimeout(timerId);
    }
}