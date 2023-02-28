const qwerty = document.querySelector("#qwerty");
const phraseLetters = document.querySelector("#letters");
const btnReset = document.querySelector(".btn__reset");
const overLay = document.querySelector("#overlay");
const tries = document.querySelectorAll(".tries img");
let missed = 0;
let lettersFound = 0;
let phraseLength = 0;
// return a random phrase from array
function getRandomPhraseAsArray(phrases) {
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const phrase = randomPhrase.split("");
  return phrase;
}

// adds the letters of a string to the display
const addPhraseToDisplay = (phrase) => {
  for (let i = 0; i < phrase.length; i++) {
    const letter = phrase[i];
    const li = document.createElement("li");
    li.innerHTML = letter;
    if (letter === " ") {
      li.className = "space";
    } else {
      li.className = "letter";
      phraseLength++;
    }
    phraseLetters.append(li);
  }
};

// check if the game has been won or lost
const checkWin = () => {
  //checks for win
  if (lettersFound === phraseLength) {
    overLay.style.display = "flex";
    overLay.className = "win";
    btnReset.innerText = "Play Again";
  }
  //Checks for Lose
  if (missed > 4) {
    overLay.style.display = "flex";
    overLay.className = "lose";
    btnReset.innerText = "Try Again";
  }
};

function main() {
  const phrases = [
    "about the author",
    "a new job",
    "all paid up",
    "bite to eat",
    "come join us",
  ];

  //listen for the start game button to be pressed
  btnReset.addEventListener("click", () => {
    const phrase = getRandomPhraseAsArray(phrases);
    phraseLetters.innerHTML = "";
    //resets live heart images
    for (let i = 0; i < tries.length; i++) {
      const liveHeart = tries[i];
      liveHeart.src = "images/liveHeart.png";
    }
    // resets chosen buttons
    const buttons = document.querySelectorAll("#qwerty button");
    for (let b = 0; b < buttons.length; b++) {
      const buttonElement = buttons[b];
      buttonElement.className = "";
    }
    addPhraseToDisplay(phrase);
    //resets misses
    missed = 0;
    overLay.style.display = "none";
  });

  // listen for the onscreen keyboard to be clicked
  qwerty.addEventListener("click", (e) => {
    if (
      e.target.localName === "button" &&
      !e.target.classList.contains("chosen")
    ) {
      var children = phraseLetters.children;
      let letterFound = false;
      // Checks for correct letters
      for (var i = 0; i < children.length; i++) {
        const letterElement = children[i];
        if (e.target.innerText === letterElement.innerText) {
          letterElement.className = "letter show";
          letterFound = true;
          lettersFound++;
        }
      }
      if (!letterFound) {
        missed++;
        const tryElement = tries[missed - 1];
        tryElement.src = "images/lostHeart.png";
      }
      checkWin();
      // shows if letter has already been selected
      e.target.classList.add("chosen");
    }
  });
}

main();
