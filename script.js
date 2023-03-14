const gameContainer = document.getElementById("game");
//setting our 2 cards to be empty. have to use let so we can resssign, const does not work
let card1 = null;
let card2 = null;
//needs to be let so we can update
let noClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClick) return;
  if (event.target.classList.contains("flipped")) return;
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  //saving clicked card to a variable
  let cardClicked = event.target;
  console.log(cardClicked);
  //getting the color of the div that was clicked
  const divColor = cardClicked.className;
  //printing the color of the clicked item in the console
  console.log(divColor);
  //styling the background of clicked item to be the color 
  cardClicked.style.backgroundColor = divColor;
  //console.log(cardClicked.classList);
  
  //card1 = cardClicked;
  //console.log(card1);

  //setting card 1 and card 2 to what we clicked
  if (!card1 || !card2){
    //adds flipped to the card class right after the color
    cardClicked.classList.add("flipped");
    //console.log(cardClicked);

    //sets the first card equal to what card was clicked
    card1 = card1 || cardClicked;
    console.log("card1", card1);

    //sets card2 back to null and then sets it equal to what card was clicked
    card2 = cardClicked === card1 ? null : cardClicked;
    console.log("card2", card2);
  }
  if(card1 && card2){
    //this makes sure that we cannot click more than 2 cards
    noClick = true;
    //setting our clicked cards to be labeled match1 and match2
    let match1 = card1.className;
    let match2 = card2.className;
    console.log("match1", match1);
    console.log("match2", match2);

    //check if cards are a match, use triple equals
    if(match1 === match2){
      console.log("MATCHED");
      card1 = null;
      card2 = null;
      noClick = false;
    }
    //need to do this on a timer since without a timer you don't have enought time to see second color 
    else{
      setTimeout(function(){
      console.log("NO MATCH");
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClick = false;
    }, 2000);
    }
  }
  


}


// when the DOM loads
createDivsForColors(shuffledColors);
