/* The objects (box) that are being displayed on the screen*/

/* Constructor function for the object*/
function object(number,color,audio){
  this.number=number; // Object position on the screen
  this.color=color;   // Object color as shown on the screen
  this.audio=audio;   // Audio file that is to be played after the object is clicked
}

/* Initializing the objects */
let Red=new object(2,"red","sounds/red.mp3");
let Green = new object(1,"green","sounds/green.mp3");
let Yellow= new object(3,"blue","sounds/yellow.mp3");
let Blue= new object(4,"yellow","sounds/blue.mp3");

/* A global variable that represents the current level */
let level=0;

/*Bundling the objects into a single list*/
let Colors=[Green,Red,Yellow,Blue];

/* This list will contain the desired Sequence ,and will be subsequently modified
   at the end of each level*/
let Sequence=[];

/* This list holds the user entered Sequence, this would be matched with the desired
sequence at the end of each click*/
let UserClickSequence=[];

/* Setting up click listeners for all the four objects
   It displays which button is clicked , and performs check whether the user entered
   sequence is the desired one by making a call to {function: judge()}. If the verdict
   returned is true, game continues, if verdict is false , then the game ends */
Colors.forEach(function(obj){
    $("#"+obj.color).on("click",function(){
      press(obj.number);
      setTimeout(function(){release(obj.number)},200);
      UserClickSequence.push(obj.number);
      let verdict=judge();
      if(verdict){
        if(UserClickSequence.length==Sequence.length){ /* All the entries desired for the current level has been achived, and its time to move to the next level*/
          levelUP();
        }
      }
      else gameOver();
    });
})


/* This function is called at the start of the new level, it changes the level title
on the screen, and also makes a call to {function : nextTarget()}, which selects the
next target in the sequence*/
function levelUP(){
  ++level;
  UserClickSequence.length=0;
  setTimeout(function(){nextTarget();
  $("#level-title").text("Level: "+level);},1000);
}

/*This function is used to judge whether the user entered sequence matches the desired
sequence*/
function judge(){
  for(let i=0;i<UserClickSequence.length;++i)
    if(UserClickSequence[i]!=Sequence[i])
      return false; // UserClickSequence differs from Sequence, hence returning a false (negative) verdict
  return true; // All items mathced, hence returing a true (positive) verdict
}

/* This function is used to select the next object in the sequence*/
function nextTarget(){
  let x=Math.round(Math.random()*3+1);
  press(x);
  setTimeout(function(){release(x)},200);
  Sequence.push(x);
}

/* To display that the button (or the box) is clicked (or pressed)*/
function press(x){
  $("#"+Colors[x-1].color).addClass("pressed");
  audio=new Audio(Colors[x-1].audio);
  audio.play();
}

/* To display that the button (or the box) is released*/

function release(x){
  $("#"+Colors[x-1].color).removeClass("pressed");
}

/* Start the game at level 1 */
function gameStart(){
  levelUP();
}

/* This function is called when the user entered sequence is not the desired sequence
   and the game is over.
   It plays the error sound in the background , and displays the game over message*/
function gameOver(){
  audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("#level-title").text("GAME OVER! PRESS ANY KEY TO RESTART!");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },240);
  Sequence.length=0; // Clear the Sequence list
  UserClickSequence.length=0; // Clear the UserClickSequence list
  level=0;
}

/* Press any key to start the game */
$(document).on("keydown",function(){
  if(level==0)
    gameStart();
})
