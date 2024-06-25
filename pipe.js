
const PIPE_SPEED = 0.2;
const PIPE_DURATION = 3000
const HOLE_HEIGHT = 120;
const PIPE_WIDTH = 80;

export default class Pipes{
    constructor(){
        this.pipes = []
        this.timeSinceLastPipe = 0
        this.passedPipeCount = 0;
        this.createPipe()
    }
    update(delta){
        this.timeSinceLastPipe += delta
        if(this.timeSinceLastPipe >= PIPE_DURATION){
            this.createPipe()
            this.timeSinceLastPipe -= PIPE_DURATION
        }
        
        this.pipes.forEach(pipe =>{
            if (pipe.left + PIPE_WIDTH < 0) {
                this.passedPipeCount++;
                this.pipes = this.pipes.filter(p => p !== pipe)
                return pipe.remove();
            }
            pipe.left -= delta * PIPE_SPEED
        })
    }
    getPipeRects(){
        return this.pipes.flatMap(pipe => pipe.rect());
    }
    createPipe(){
        const pipeElem = document.createElement('div')
        const topElem = this.createPipeSegment('top')
        const bottomElem = this.createPipeSegment('bottom')
        pipeElem.append(topElem)
        pipeElem.append(bottomElem)
        pipeElem.classList.add('pipe')

        pipeElem.style.setProperty(
            "--gap-bw-pipe",
            this.randomNumberBetween(HOLE_HEIGHT , 2*HOLE_HEIGHT)
          );
        pipeElem.style.setProperty(
            "--top-pipe-hole",
            this.randomNumberBetween(
              HOLE_HEIGHT * 1.5,
              window.innerHeight - (HOLE_HEIGHT * 0.5)
            )
        );
        const pipe = new Pipe(pipeElem)
        pipe.left = window.innerWidth
        document.body.append(pipeElem)
        this.pipes.push(pipe)
    }
    createPipeSegment(position){
        const elem = document.createElement('div')
        elem.classList.add(position)
        elem.classList.add('segment')
        return elem
    }
    getPassedPipeCount(){
        return this.passedPipeCount
    }

    randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

class Pipe{
    constructor(pipeElem){
        this.pipeElem = pipeElem   
    }
    get left(){
        return parseFloat(getComputedStyle(this.pipeElem).getPropertyValue('--pipe-left'))
    }
    set left(value){
        this.pipeElem.style.setProperty('--pipe-left' , value)
    }
    remove(){
        this.pipeElem.remove()
    }
    rect(){
        return [
            this.pipeElem.querySelector('.top').getBoundingClientRect(),
            this.pipeElem.querySelector('.bottom').getBoundingClientRect()
        ]
    }
}