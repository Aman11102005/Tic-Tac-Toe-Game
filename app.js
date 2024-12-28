let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newBtn = document.querySelector(".new");
let main = document.querySelector(".main");
let playerX = document.querySelector(".playerX");
let playerO = document.querySelector(".playerO");
let draw2 = document.querySelector(".draw2");
let playGame = document.querySelector(".playGame");
let secondPage = document.querySelector(".secondPage");
let firstPage = document.querySelector(".firstPage");
let TTTimage = document.querySelector(".TTTimage");

TTTimage.addEventListener("click", () => {
  TTTimage.classList.remove("image");
  // audio4.pause()
});

TTTimage.addEventListener("dblclick", () => {
  TTTimage.classList.add("image");
  // audio4.play()
});

let audio4 = new Audio("Assets/Background-bgm.mp3");

playGame.addEventListener("click", () => {
  firstPage.classList.add("hide");
  secondPage.classList.remove("hide");
  audio4.play();
  audio4.loop = true;
  audio4.volume = 0.02;
});

function myFunction() {
  let user1 = prompt("Enter Name for player - X ");
  let user2 = prompt("Enter Name for player - O ");

  if (user1 == "null" || user1 == null || user1 == "") {
    user1 = "PLAYER - X";
    user2 = "PLAYER - O";
  }

  playerX.innerText = `${user1}\nX `;
  playerO.innerText = `${user2}\nO `;

  let audio = new Audio("Assets/select-sound.mp3");
  audio.volume = 0.09;
  let audio2 = new Audio("Assets/congratulations-deep-voice.mp3");
  let audio3 = new Audio("Assets/Match-draw.mp3");
  audio3.volume = 0.2;

  let playX = 0;
  let playO = 0;
  let drawScore = 0;
  playerX.style.color = "yellow";
  playerX.style["boxShadow"] = "0 0 8px #ffee10";
  let turnO = false; //playerX , playerO
  let count = 0;

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const resetGame = () => {
    if (turnO == false) {
      turnO = false;
    } else {
      turnO = true;
    }
    // audio4.play()
    audio4.volume = 0.02;
    enableBoxes();
    msgContainer.classList.add("hide");
    playerX.classList.remove("none");
    playerO.classList.remove("none");
    main.classList.remove("hide");
    count = 0;
  };

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.innerText = "O";
        box.style.color = "blue";
        turnO = false;
        audio.play();
      } else {
        box.innerText = "X";
        box.style.color = "red";
        turnO = true;
        audio.play();
      }
      if (turnO) {
        playerO.style.color = "yellow";
        playerO.style["boxShadow"] = "0 0 8px #ffee10";
        playerX.style.color = "white";
        playerX.style["boxShadow"] = "0 0 0px #ffee10";
      } else {
        playerX.style.color = "yellow";
        playerX.style["boxShadow"] = "0 0 8px #ffee10";
        playerO.style.color = "white";
        playerO.style["boxShadow"] = "0 0 0px #ffee10";
      }
      box.disabled = true;

      // console.log("box was clicked");

      let isWinner = checkWinner();

      count++;

      if (count === 9 && !isWinner) {
        // console.log("draw");
        draw();
      }
    });
  });

  const disbleBoxes = () => {
    for (box of boxes) {
      box.disabled = true;
    }
  };

  const enableBoxes = () => {
    for (box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };
  draw2.addEventListener("click", () => {
    audio4.pause();
  });
  draw2.addEventListener("dblclick", () => {
    audio4.play();
  });
  const showWinner = (winner) => {
    if (winner === "X") {
      msg.style["boxShadow"] = "0 0 15px #ffee10";
      msg.style.setProperty("-webkit-filter", "drop-shadow(0 0 4px #ffee10)");

      msg.innerText = `Congratualtions, Winner is ${user1.toUpperCase()}`;
      audio2.play();
      audio4.volume = 0.005;
    } else {
      msg.style["boxShadow"] = "0 0 15px #ffee10";
      msg.style.setProperty("-webkit-filter", "drop-shadow(0 0 4px #ffee10)");

      msg.innerText = `Congratualtions, Winner is ${user2.toUpperCase()}`;
      audio2.play();
      audio4.volume = 0.005;
    }
    audio4.volume = 0.02;
    msgContainer.classList.remove("hide");
    disbleBoxes();
    main.classList.add("hide");
    playerX.classList.add("none");
    playerO.classList.add("none");
  };

  let draw = () => {
    msg.innerText = `Match Draw`;
    msg.style["boxShadow"] = "0 0 15px #ffee10";
    msg.style.setProperty("-webkit-filter", "drop-shadow(0 0 4px #ffee10)");
    audio3.play();
    audio4.volume = 0.005;
    drawScore++;
    draw2.innerText = `DRAW = ${drawScore}`;
    msgContainer.classList.remove("hide");
    disbleBoxes();
    main.classList.add("hide");
    audio4.volume = 0.02;
  };

  const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val == pos2Val && pos2Val == pos3Val) {
          showWinner(pos1Val);

          if (pos1Val === "X" && pos2Val === "X" && pos3Val === "X") {
            playX = playX + 1;
          } else if (pos1Val === "O" && pos2Val === "O" && pos3Val === "O") {
            playO = playO + 1;
          } else {
            playO = playO;
            playX = playX;
          }
          // console.log("X = ", playX);
          // console.log("O = ", playO);

          playerX.innerText = `${user1}\nX  = ${playX}`;
          playerO.innerText = `${user2}\nO  = ${playO}`;

          return true;
        }
      }
    }
  };

  reset.addEventListener("click", resetGame);
  newBtn.addEventListener("click", resetGame);
}
