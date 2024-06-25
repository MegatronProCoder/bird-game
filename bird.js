
const BIRD_SPEED = 0.2
const JUMP_DURATION = 200

export default class Bird{
    constructor(birdElem){
        this.birdElem = birdElem
        this.isJumping = false
        this.elapsedTimeAfterJump = 0
        
    }
    get position(){
        return parseFloat(getComputedStyle(this.birdElem).getPropertyValue('--top'))
    }
    set position(value){
        this.birdElem.style.setProperty('--top' , value)
    }
    rect() {
        return this.birdElem.getBoundingClientRect();
    }
    update(delta){ 
        
        if(this.isJumping){
            this.elapsedTimeAfterJump += delta
            if(this.elapsedTimeAfterJump >= JUMP_DURATION) this.isJumping = false

            else this.position = this.position - delta * BIRD_SPEED
        }
        else{
            this.position = this.position + delta * BIRD_SPEED
        }
    }
    jump(){
        if(!this.isJumping){
            this.isJumping = true;
            this.elapsedTimeAfterJump = 0;
        }
    }
}