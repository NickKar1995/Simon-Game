//Color array and patter

let buttonColours = ['red', 'blue', 'yellow', 'green'];

let gamePattern = [];

let userClickPattern = [];

let level = 0;

//Game Started//

let gameStart = false;

//Function for random picking

function nextSequence() {
  userClickPattern = [];
  level++;
  $('h1').text('Level ' + level)
  let random = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[random];
  gamePattern.push(randomChosenColour);


  console.log(random)
  console.log(randomChosenColour)



  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)



}

// nextSequence();



//event click//


$(".btn").click(function(event) {
  let userChosenColour = event.target.id
  userClickPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickPattern.length-1)

})



//keypress//
$(document).keypress(function() {

  if (gameStart == false) {
    $('h1').text('Level '+ level)
    nextSequence()
    gameStart = true;
  }


})


//Sound Playing//

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//Animation function//

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  },100)

}




function checkAnswer(level) {
  if (userClickPattern[level] === gamePattern[level]) {

    console.log('success')

    if (userClickPattern.length === gamePattern.length) {

      setTimeout(function(){
        nextSequence();
      },1000)
    }

    }else {
      console.log('fail')
      console.log(gamePattern)
      $('h1').text('Game Over');
      $('body').addClass('game-over')
      setTimeout(function(){
        $('body').removeClass('game-over')
      })
      restart();
  }
}




function restart(){
   level = 0;
  gamePattern = [];
  gameStart = false;
}
