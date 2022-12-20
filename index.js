// Game variables
let score = 0;
let pokemons = [];
let framesElapsed = 0;
let framesHold = 40;
let pokeballLeft = 10;
let isPlaying = false;
let gameSpeed = 1.5;

// Setup The canvas
let canvas = makeCanvas();
let ctx = canvas.ctx;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.filter = "contrast(0.9) brightness(0.9)";

// Create Background Sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
        width: 1024 
    },
    imageSrc: './images/background.jpg',
});

/**
 * Increase the game speed
 */
function increaseDifficult(){
    if(gameSpeed <10){
        gameSpeed += 0.2;
        setTimeout(() => {increaseDifficult();},1000)        
    }
}

/**
 * Create a pokemon sprite and add it to the pokemons array
 * 
 * @returns {Object} sprite 
 */
function createPokemon(){

    // Generate random number to figure out starting coordinate, pokemon's sprite and velocity
    let Ypos = generateRandomIntegerInRange(75,475);
    let rand = generateRandomIntegerInRange(1,8);
    let src;
    let frames;
    let isPokeball = false;
    let points;

    switch (rand) {
        case 1:
            src = 'gobalt';
            frames = 16;
            points = 2;
            break;
        case 2:
            src = 'seaking';
            frames = 24;
            points = 2;
            break;
        case 3:
            src = 'zapdos';
            frames = 17;
            points = 2;
            break;
        case 4:
            src = 'aerodactyl';
            frames = 17;
            points = 3;
            break;
        case 5:
            src = 'koffing';
            frames = 15;
            points = 3;
            break;
        case 6:
            src = 'tentacruel';
            frames = 21;
            points = 1;
            break;
        case 7:
            src = 'lugia';
            frames = 21;
            points = 5;
            break;
        case 8:
            src = 'pokeball';
            frames = 12;
            isPokeball = true;
            break;
    }

    const sprite = new Pokemon({
        position: {
            x: 1024,
            y: Ypos
        },
        imageSrc: `./images/pokemons/${src}.png`,
        framesNumber: frames,
        velocity: 1,
        scale: 1,
        points: points,
        pokeball: isPokeball
    });

    // add to the pokemon's array
    pokemons.push(sprite);
    return sprite;
}

/**
 *  The main loop function
 */

function play(){

    let requestId = window.requestAnimationFrame(play);

    // Update score and pokeballs
    document.getElementById('pokeball').innerHTML = 'Pokeballs: ' + pokeballLeft;
    document.getElementById('score').innerHTML = `Score: ${score}`;


    // Display pokemons
    framesElapsed++;
    if(framesElapsed % framesHold === 0){
        if(pokemons.length <30 && isPlaying === true){
            createPokemon();
        }        
    }

    // Remove pokemon if out of screen
    pokemons.forEach(pokemon => {
        if (pokemon.position.x <= -100){

            let pokemonIndex = pokemons.indexOf(pokemon);
            pokemons.splice(pokemonIndex,1);
        }
    })

    // Call update method
    background.update();
    pokemons.forEach( pokemon => pokemon.update());

    // Display warning message if pokeballs run out
    if(pokeballLeft === 0){
        document.getElementById('msg').style.display = 'block';
    }else{
        document.getElementById('msg').style.display = 'none';
    }

    // End game if timer reach 70
    if(timer === 70){
        window.cancelAnimationFrame(requestId);
        clearTimeout(timerId)
        isPlaying = false;
        end();
    }
}

/**
 * Figure out if a pokemon was hited or not
 * 
 * @param {object} position The x and y coordinate of the mouse click
 * 
 */

function handleClick(position){

    // Loop through all pokemons and check if someone was hit
    pokemons.forEach(pokemon => {
        if (position.x > pokemon.position.x && position.x < pokemon.position.x + pokemon.width
            && position.y > pokemon.position.y && position.y < pokemon.position.y + pokemon.height){

                let pokemonIndex = pokemons.indexOf(pokemon);

                // If it remains pokeball
                if(pokeballLeft >= 1 && pokemon.pokeball === false){

                    // Decrease pokeball number
                    if(pokeballLeft > 0) pokeballLeft--;

                    // Update score
                    score += pokemon.points;

                    // Destroy pokemon and run catch annimation
                    pokemons.splice(pokemonIndex,1);                    
                }
                else if(pokemon.pokeball === true){
                    pokeballLeft++;
                    document.getElementById('pokeball').innerHTML = 'Pokeballs: ' + pokeballLeft;
                    pokemons.splice(pokemonIndex,1); 
                }
        }
    });        
}

/**
 * Reset game variables, delete listener and display result
 */

function end(){

    // Reset game variables
    score = 0;
    pokeballLeft = 15;
    timer = 0;
    pokemons = [];
    gameSpeed = 1.5;

    // Remove event listener
    canvas.removeEventListener('mousedown', (event) => {
        let position = getMousePosition(canvas, event);
        handleClick(position);
    });

    // Determine win or lose
    if(score < 70){
        document.getElementById('end-screen').style.display = 'flex';
        document.getElementById('display-text').innerHTML = 'You lose, Try again!';
        document.getElementById('display-score').innerHTML = 'Your score: ' + score;

    }else if(score >= 70){
        document.getElementById('display-text').innerHTML = 'You Win!';
    }
}

let menu = document.getElementById('menu');
menu.onclick = () => {
    start();
};

let restart = document.getElementById('restart');
restart.onclick = () => {
    start();
};

/**
 * Call at start or restart, Hide CSS and call the main loop
 */

function start(){

    // Hide menu or end Screen
    document.getElementById('menu').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';

    // Add event listener on the game-container
    canvas.addEventListener('mousedown', (event) => {
        let position = getMousePosition(canvas, event);
        handleClick(position);
    });

    // Set game state to 'play'
    isPlaying = true;
    
    // Start play function
    play();

    // Start timer
    increaseTimer();

    // Increase game speed
    increaseDifficult();
}





