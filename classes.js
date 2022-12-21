
/**
 * The Sprite class contains all main properties and methods for every kind
 * of sprites.
 * 
 */

class Sprite {
    constructor({position, imageSrc, scale = 1,framesNumber = 1, width = 150, height = 150}){
        // properties associated with the sprite
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesNumber = framesNumber;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 6;
    }

    // Draw method
    draw(){
        ctx.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.framesNumber),
            0,
            this.image.width / this.framesNumber,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesNumber) * this.scale, 
            this.image.height * this.scale
        );
    }

    // Update method
    update(){
        this.draw();
        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold ===0){
            if(this.currentFrame < this.framesNumber -1){
                this.currentFrame++;
            }else{
                this.currentFrame = 0;
            }            
        }
    }
}

/**
 * Pokemon class extends from Sprite class contain specific pokemon's properties
 */

class Pokemon extends Sprite {
    constructor({
        position, 
        imageSrc, 
        scale = 1,
        framesNumber = 1, 
        velocity = 1, 
        points = 1, 
        pokeball = false, 
        width = 100,
        height = 100,
        name,
    }){
        // Properties associated to the sprite
        super({position, imageSrc, scale, framesNumber, width, height})

        // Specific properties
        this.velocity = velocity;
        this.points = points;
        this.pokeball = pokeball;
        this.name = name;
    }

    // Update method
    update(){

        // use update parent's method
        super.update();

        // Update pokemon's position
        this.position.x -= gameSpeed;
    }
}