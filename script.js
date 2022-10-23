var numberSequence = [];
var level = 1;
var cnote = new Audio('sounds/simon_C.mp3');
var enote = new Audio('sounds/simon_E.mp3');
var gnote = new Audio('sounds/simon_G.mp3');
var bnote = new Audio('sounds/simon_B.mp3');
var cnoterev = new Audio('sounds/simon_Crev.mp3');
var enoterev = new Audio('sounds/simon_Erev.mp3');
var gnoterev = new Audio('sounds/simon_Grev.mp3');
var bnoterev = new Audio('sounds/simon_Brev.mp3');
var lostSound = new Audio('sounds/simon_lostGame.mp3');

startGame();

function startGame() {
  $(document).on('keydown', function(event) {
    if (event.key === 'a') {
      playGame();
      console.log(event.key);
      $(document).off('keydown');
      $(document).off('touchstart');
      $('h1').text("Level 1");
      setTimeout(function() {$("body").removeClass("lost");}, (10))
    } else if (event.key === 'A') {
      playGame();
      console.log(event.key);
      $(document).off('keydown');
      $(document).off('touchstart');
      $('h1').text("Level 1");
      setTimeout(function() {$("body").removeClass("lost");}, (10))
    }
  })
  $(document).on('touchstart', function() {
    playGame();
    $(document).off('touchstart');
    $('h1').text("Level 1");
    setTimeout(function() {$("body").removeClass("lost");}, (10))
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
            setTimeout(function() {$(".box-green").addClass("lighted");}, 750)
            setTimeout(function() {$(".box-green").removeClass("lighted");}, (1000))
            setTimeout(function() {cnoterev.play();},1000)
            break;
        case 1:
            setTimeout(function() {$(".box-red").addClass("lighted");}, 750)
            setTimeout(function() {$(".box-red").removeClass("lighted");}, (1000))
            setTimeout(function() {enoterev.play();},1000)
            break;
        case 2:
            // $(".box-yellow").addClass("lighted");
            setTimeout(function() {$(".box-yellow").addClass("lighted");}, 750)
            setTimeout(function() {$(".box-yellow").removeClass("lighted");}, (1000))
            setTimeout(function() {gnoterev.play();},1000)
            break;
        case 3:
            // $(".box-blue").addClass("lighted");
            setTimeout(function() {$(".box-blue").addClass("lighted");}, 750)
            setTimeout(function() {$(".box-blue").removeClass("lighted");}, (1000))
            setTimeout(function() {bnoterev.play();},1000)
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
          setTimeout(function() {$(".box-green").addClass("clicked");}, 10)
          setTimeout(function() {$(".box-green").removeClass("clicked");}, (150))
          cnote.pause();
          cnote.currentTime = 0;
          cnote.play();
          break;
        case 'box-red':
          inputList.push(1);
          setTimeout(function() {$(".box-red").addClass("clicked");}, 10)
          setTimeout(function() {$(".box-red").removeClass("clicked");}, (150))    
          enote.pause();
          enote.currentTime = 0;
          enote.play();      
          break;
        case 'box-yellow':
          inputList.push(2);
          setTimeout(function() {$(".box-yellow").addClass("clicked");}, 10)
          setTimeout(function() {$(".box-yellow").removeClass("clicked");}, (150))
          gnote.pause();
          gnote.currentTime = 0;
          gnote.play();
          break;
        case 'box-blue':
          inputList.push(3);
          setTimeout(function() {$(".box-blue").addClass("clicked");}, 10)
          setTimeout(function() {$(".box-blue").removeClass("clicked");}, (150))
          bnote.pause();
          bnote.currentTime = 0;
          bnote.play();
          break;
      }
      inputLength++;
      console.log('Input list: ' + inputList);
      console.log('Input length: ' + inputLength);
      console.log('Last member of input list: ' + inputList[inputList.length - 1]);
      console.log('Last member of initial sequence: ' + numberSequence[inputLength - 1]);
      console.log('Initial sequence up to right now: ' + numberSequence.slice(0,inputLength - 1));
      if (inputList[inputList.length - 1] !== numberSequence[inputLength - 1]) {
        lostSound.play();
        setTimeout(function() {$('h1')[0].innerHTML = 'You lost the game. Press A or tap to play again'}, 100);
        setTimeout(function() {$("body").addClass("lost");}, 100)
        $('.box').off();
        startGame();
      } else {
// Вот здесь должна быть другая логика, чтобы последовательность сохранялась
        if (inputLength >= level) {
          level++;
          inputList = [];
          inputLength = 0;
          setTimeout(function() {$('h1').text('Level ' + level);}, 300);
          playAnimation(numberSequence[level-1]);
        }
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


