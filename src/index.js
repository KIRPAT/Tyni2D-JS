/**
 * TODO: Game objects should have their own states.
 *  Refactor them from just domElement: Object
 *  to {name: String, domElement: Object, state: Object}
 * */

/* ENGINE CONSTANTS */
const constants = {
  FPS: 30,
  GRAVITY: 5,
  testKeyCode: {
    isW: (code) => code == (87 || 119) ? true : false,
    isS: (code) => code == (83 || 115) ? true : false,
    isA: (code) => code == (65 || 97) ? true : false,
    isD: (code) => code == (68 || 100) ? true : false,
    isSpace: (code) => code == 32 ? true : false,
  }
};

/* STATES */
let gameObjects = [];
let gameState = {
  isGameOn: false,
  gameLoop: null,
  gameObjects: [],
  loopArray: [
    dummyFunction, // DELETE
    applyGravity,
  ],
};

// DELETE
function dummyFunction() {
  let el = document.getElementById("player");
  let speed = 50;
  let newPosition = Math.round( getPositionValue(el) + ( speed * ( deltaTime()/1000 ) ));
  setPositionValue(el, newPosition);
}

/* HELPERS */
/**
* Returns the desired position value as a number, or an object that is containing all position values.
* CSS values are kept as strings. (Ex: "100px".) This function returns a number (Ex: 100).
* @domElement Object, The DOM element.
* @position String, "all", "top", "down",
* */
function getPositionValue(domElement, position = "bottom") {
  switch (position){
    case "all":
      return {
        top: parseInt(window.getComputedStyle(domElement).top),
        bottom: parseInt(window.getComputedStyle(domElement).bottom),
        left: parseInt(window.getComputedStyle(domElement).left),
        right: parseInt(window.getComputedStyle(domElement).right),
      };
    case "top":
      return parseInt(window.getComputedStyle(domElement).top);
    case "bottom":
      return parseInt(window.getComputedStyle(domElement).bottom);
    case "left":
      return parseInt(window.getComputedStyle(domElement).left);
    case "right":
      return parseInt(window.getComputedStyle(domElement).right);
  }
}

/**
 * Sets the absolute position value of any given element.
 * @domElement Object, DOM element.
 * @value Number, preferably an integer.
 * @position String, the position that the the value to be assigned. Default is bottom.
 * */
function setPositionValue(domElement, value, position = "bottom") {
  switch(position) {
    case "bottom":
      domElement.style.bottom = `${value}px`;
      break;
    case "top":
      domElement.style.top = `${value}px`;
      break;
    case "left":
      domElement.style.left = `${value}px`;
      break;
    case "right":
      domElement.style.right = `${value}px`;
      break;
  }
}

/* GAME LOOP */
/**
* Decides the interval of render calls.
* Important function. Treat it like a constant.
* */
function deltaTime() {
  return 1000 / constants.FPS;
}

/**
 * The main game loop that executes an array of functions. In delta time.
 * @functionArray Array of functions.
 * */
function gameLoop(functionArray) {
  return setInterval(() => {
    for (let i of functionArray) {
      i();
    }
  }, deltaTime());
}

/* PHYSICS */
/**
 * Applies gravity to all physics-objects.
 * */
function applyGravity() {
  let physicsObjects = document.getElementsByClassName("physics-object");
  let gravityYForce = constants.GRAVITY*(deltaTime()/1000);
  for (let i of physicsObjects) {
    getPositionValue(i) <= 0
      ? console.log("Below canvas.")
      : console.log("Above canvas.");
  }
}

/* GAME STATE MUTATIONS */
/**
 * Initializes Game Objects, and starts the game
 * */
function startGame(){
  if (gameState.isGameOn) {
    return false;
  }
  gameState.isGameOn = true;
  gameState.gameObjects = gameObjects;
  renderElements("level-1");
  // Starts the game loop.
  gameState.gameLoop= gameLoop(gameState.loopArray);
}

function stopGame(){
  if (!gameState.isGameOn) {
    return false;
  }
  gameState.isGameOn = false;
  // Stops the game loop.
  clearInterval(gameState.gameLoop);
  //gameState.gameLoop = null;
  // Removes DOM elements of "level-1"
  let element = document.getElementById("level-1");
  let child = element.lastElementChild;
  while (child) {
    child.style = "";
    element.removeChild(child);
    child = element.lastElementChild;
  }
  // Clear Game Objects from the game state.
  gameState.gameObjects = [];
}

/* Game Objects */
/**
 * Returns a Game Object into the gameObjects array;
 * @id String (becomes element.id)
 * @classNameArray String Array ["physics-object", "]
 * @position Object {
 *  value: number,
 *  position: "top" || "bottom" || "left" || "right"
 * }
 * */
function gameObject(id, classNameArray) {
  let element = document.createElement("div");
  element.id = id;
  element.className = classNameArray.join(' ');
  return element;
}

/* HTML MUTATIONS */
/**
 * Renders gameState.GameObjects by injecting them to the DOM.
 * @levelId is the element id of the scene.
 * */
function renderElements (levelId){
  for (let i of gameState.gameObjects){
    let level = document.getElementById(levelId);
    level.insertBefore(i, level.childNodes[0]);
  }
}

/* GAME SCRIPTS */
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);
gameObjects.push(gameObject("player", ["physics-object", "player"]));




