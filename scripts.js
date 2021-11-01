const sonic = document.querySelector('.sonic');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
        jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    sonic.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        //subindo
        position += 20;
        sonic.style.bottom = position + 'px';
       }
    }, 20);
}

function createFlower() {
    const flower = document.createElement('div');
    let flowerPosition = 1000;
    let randomTime = Math.random() * 6000;

    flower.classList.add('flower');
    flower.style.left = 1000 + 'px';
    background.appendChild(flower);

    let leftInterval = setInterval(() => {
        if (flowerPosition < -60) {
        clearInterval(leftInterval);
        background.removeChild(flower);
    } else if (flowerPosition > 0 && flowerPosition < 60 && position < 60) {
        // Game over

        clearInterval(leftInterval);
        document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1><p class="restart">PRESS F5 TO RESTART</p>';
    } else {
        flowerPosition -= 10;
        flower.style.left = flowerPosition + 'px';
        }
    }, 30);

    setTimeout(createFlower, randomTime);   
}

createFlower();
document.addEventListener('keyup', handleKeyUp);