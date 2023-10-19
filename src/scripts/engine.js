const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    //timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
    //countDownTimerId: null
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("GAME OVER! O seu resultado foi " + state.values.result);
  }
}

function playSound(audioName) {
  //let audio = new Audio(`./src/audio/${audioName}.m4a`);
  let audio = new Audio("./src/audios/hit.m4a");

  audio.volume = 0.1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });


  const squareElements = document.querySelectorAll(".square");

  if (squareElements.length > 0) {
    let randomNumber = Math.floor(Math.random() * squareElements.length);
    let randomSquare = squareElements[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    //square.addEventListener("mousedown", () => {
    square.addEventListener("click", () => {
      //if (square.classList.contains("enemy")) {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  //state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  //state.actions.countDownTimerId = setInterval(countDown, 1000);
}

initialize();
