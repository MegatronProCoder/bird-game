import Bird from "./bird.js";
import Pipes from "./pipe.js";

const pipes = new Pipes()
const bird = new Bird(document.getElementById("bird"));
let gameStarted = false;

const title = document.querySelector(".title");
const subTitle = document.querySelector(".sub-title");

window.addEventListener("keypress", (e) => {
  if (gameStarted && e.code === "Space") bird.jump();
});

window.addEventListener("keypress", (e) => handleStart(), { once: true });

let startTime;
function main(currentTime) {
  if (startTime != null) {
    gameStarted = true;
    if(checkLose()) return handleLose()
    const delta = currentTime - startTime;
    bird.update(delta);
    pipes.update(delta)
  }
  startTime = currentTime;
  window.requestAnimationFrame(main);
}


function handleStart() {
  window.removeEventListener("keypress", handleStart);
  bird.position = window.innerHeight/2
  title.classList.add("hide");
  window.requestAnimationFrame(main);
}


function checkLose(){
    const birdRect = bird.rect();
    if (birdRect.top < 0 || birdRect.bottom > window.innerHeight) {
      return true
    }
    const insidePipe = pipes.getPipeRects().some(rect => isCollision(birdRect , rect))
    return insidePipe
}

function isCollision(rect1, rect2) {
    const value = (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
    if(value) {
        console.log(rect1);
        console.log(rect2)
    }
    return value
}

function handleLose() {
    gameStarted = false
    subTitle.textContent = `${pipes.getPassedPipeCount()} pipes`
    subTitle.classList.remove("hide");
    setTimeout(()=>{
        const restart = confirm("want to play again ,press OK")    
        if(restart) window.location.reload()
    } , 700)
}
