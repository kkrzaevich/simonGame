var numberSequence = [];
var level = 1;

startGame();

function startGame() {
  $(document).on('keydown', function(event) {
    if (event.key === 'a') {
      playGame();
      console.log(event.key);
      $(document).off('keydown');
      $('h1').text("Level 1");
    } else if (event.key === 'A') {
      playGame();
      console.log(event.key);
      $(document).off('keydown');
      $('h1').text("Level 1");
    }
  })
}

function getNumberSequence() {
    for (i=0; i<1000; i++) {
        numberSequence[i] = Math.floor(Math.random()*4);
    }
}

function playAnimation(frame) {
    switch (frame) {
        case 0:
            setTimeout(function() {$(".box-green").addClass("lighted");}, 500)
            setTimeout(function() {$(".box-green").removeClass("lighted");}, (750))
            break;
        case 1:
            setTimeout(function() {$(".box-red").addClass("lighted");}, 500)
            setTimeout(function() {$(".box-red").removeClass("lighted");}, (750))
            break;
        case 2:
            // $(".box-yellow").addClass("lighted");
            setTimeout(function() {$(".box-yellow").addClass("lighted");}, 500)
            setTimeout(function() {$(".box-yellow").removeClass("lighted");}, (750))
            break;
        case 3:
            // $(".box-blue").addClass("lighted");
            setTimeout(function() {$(".box-blue").addClass("lighted");}, 500)
            setTimeout(function() {$(".box-blue").removeClass("lighted");}, (750))
            break;        
        default:
            console.log(frame);
    }
}

function getInput() {


    var inputList = [];
    var inputLength = 0;
    
    $('.box').on('click', function() {
        console.log(this.classList[1]);
      switch (this.classList[1]) {
        case 'box-green':
          inputList.push(0);
          break;
        case 'box-red':
          inputList.push(1);
          break;
        case 'box-yellow':
          inputList.push(2);
          break;
        case 'box-blue':
          inputList.push(3);
          break;
      }
      inputLength++;
      console.log('Input list: ' + inputList);
      console.log('Input length: ' + inputLength);
      console.log('Last member of input list: ' + inputList[inputList.length - 1]);
      console.log('Last member of initial sequence: ' + numberSequence[inputLength - 1]);
      console.log('Initial sequence up to right now: ' + numberSequence.slice(0,inputLength - 1));
      if (inputList[inputList.length - 1] !== numberSequence[inputLength - 1]) {
        $('h1')[0].innerHTML = 'You lost the game. Press A to play again';
        $('.box').off();
        startGame();
      } else {
        level++;
        $('h1').text('Level ' + level);
        currentSequence = numberSequence.slice(0,level);
        console.log(currentSequence);
        playAnimation(currentSequence[level-1]);
      }
    })
}

function playGame() {
    var newGame = 1;
    level = 1;

    getNumberSequence();
    console.log(numberSequence);   
    var currentSequence = numberSequence.slice(0,level);
    console.log(currentSequence);
    playAnimation(currentSequence[level-1]);

    // $(".box-green").click(function() {
    //     level++;
    //     $('h1').text('Level ' + level);
    //     currentSequence = numberSequence.slice(0,level);
    //     console.log(currentSequence);
    //     playAnimation(currentSequence[level-1]);
    // });

    getInput();

}


