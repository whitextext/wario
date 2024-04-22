const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const painelStart = document.querySelector(".painel_start");

audioStart = new Audio('./soung/musica_jogo.mpeg');
audioGameOver = new Audio('./soung/backroom.mp3');
audioJump = new Audio('./soung/jump.mp3');
somPS2 = new Audio("./soung/PS2.mp3");

const startGame = () => {
  pipe.classList.add('pipe-animation');
  start.style.display = 'none';
  painelStart.style.display = "none";

  // audio
  audioStart.play();
}

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  mario.src = './img/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';

  start.style.display = 'none';

  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;

}

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' '); 

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation');
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove('.jump');
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './img/game-over.png';
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';
      
      
      function stopAudioStart() {
        audioStart.pause();
      }
      stopAudioStart();

      audioGameOver.play();
      
      function stopAudio() {
        audioGameOver.pause();
      }
      
      gameOver.style.display = 'flex';
      
      clearInterval(loop);
    }
  }, 10);
}

loop();

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
    audioJump.play();
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    startGame();
  }
})