var englishSpanishWords =[        //
  ["The boy","El ni\u00F1o"],     //El niño
  ["The girl","La ni\u00F1a"],    //La niña
  ["The man","El hombre"],        //The man
  ["The woman","La mujer"],       //The woman
  ["I am","Yo soy"],
  ["You are","T\u00FA eres"],     //Tú eres
  ["He is","\u00C9l es"],         //Él es
  ["She is","Ella es"],
  ["Goodbye","Adi\u00F3s"],       //Adiós
  ["Thank you","\u00A1Gracias!"],
  ["Good night","\u00A1Buenos noches!"],
  ["Good Day","\u00A1Buenos d\u00EDas"],
  ["Sorry","Lo siento"],
  ["You're Welcome","De nana"],
  ["Pardon me?","\u00BFPerd\u00F3n?"],  //¿Perdón?
  ["Excuse me","Discuple"],
  ["Nice to meet you","Mucho gusto"],
  ["My name is","Me llama"],
  ["Please","Por favor"],
  ["English","Ingl\u00E9s"],    //Inglés
  ["Spanish","Espa\u00F1ol"]    // Español
];
window.onload=shuffleCardsAssignNew;

function shuffleCardsAssignNew(){
  /*spanish characters:
  ñ = \u00F1  ú = \u00FA  é = \u00E9  É = \u00C9  í = \u00ED ó = \u00F3
  ¡ = \u00A1  ¿ = \u00BF*/

  var engCardId = "engCard";
  var spanCardId = "spanCard";
  var arrayLength = englishSpanishWords.length;
  var engCardsDisplayOrder= [0,1,2,3,4,5,6,7,8];
  var spanCardsDisplayOrder= [0,1,2,3,4,5,6,7,8];
  var wordOrder= new Array(21);
//put values 0-20 in order into wordOrder Array
for(var i = 0; i < 21; i++){
  wordOrder[i]=i;     //wordOrder[0] =0
}
//wordOrder is now [0,1,2,3,..,20]
//swap each element in the wordArray with a different element (using random number as swap index) to randomise order
  for(var i = 20; i >= 0; i--){
    var randIndexToSwapWith = Math.floor(Math.random() * i);
    var temporaryValue = wordOrder[randIndexToSwapWith];
    wordOrder[randIndexToSwapWith] = wordOrder[i];
    wordOrder[i] = temporaryValue;
  }//now wordOrder is randomised.
  //e.g. wordOrder could now be [13,1,0,20,7,6,4....] this is used to randomly select 9 word pairs to use for cards
//swap elements of eng/span cardsDisplayOrder arrays to randomise them
  for(var j = 8; j >= 0; j--){
    var engSwapIndexRand = Math.floor(Math.random() * j);
    var spanSwapIndexRand = Math.floor(Math.random() * j);
    //randomising order of array engCardsDisplayOrder
    temporaryValue = engCardsDisplayOrder[engSwapIndexRand];
    engCardsDisplayOrder[engSwapIndexRand] = engCardsDisplayOrder[j];
    engCardsDisplayOrder[j] = temporaryValue;
    //randomising order of array spanCardsDisplayOrder
    temporaryValue = spanCardsDisplayOrder[spanSwapIndexRand];
    spanCardsDisplayOrder[spanSwapIndexRand] = spanCardsDisplayOrder[j];
    spanCardsDisplayOrder[j] = temporaryValue;
    //===CODE A WENT HERE===
  }
// E.G. engCardsDisplayOrder could now be [6,4,1,0,8,7,3,5,2]
// spanCardsDisplayOrder could be [8,0,4,1,7,3,5,2,6]
  for(var k = 0;k < 9; k++){
    var engCardsOrderIndex = engCardsDisplayOrder[k];//eg if array is now [6,4,1,0,..] first iteration j=0 so arr[0] is 6
    var spanCardsOrderIndex = spanCardsDisplayOrder[k];// eg if array is now [8,0,4,1,...] first iteration j=0 so arr[0] is 8
    var wordsSelectedIndex = wordOrder[k]; // e.g. if wordOrder array is [13,1,0,20,7,6,4....] first iteration j=0 so arr[0] is 13

    engCardId += engCardsOrderIndex; //as eg above,first iteration engCardsOrderIndex[0]is 6 so  engCard += 6 so 'engCard6' is id of card where word will be inserted
    document.getElementById(engCardId).value = englishSpanishWords[wordsSelectedIndex][0];//as above eg, if wordsSelectedIndex[0]=13 then englishSpanishWords[13][0] is the word picked to be inserted at card id 'engCard6'
    engCardId = "engCard"; //reset value so no longer engCard6

     spanCardId += spanCardsOrderIndex; //as above eg, first iter spanCardsDisplayOrder[0] is 8 so spanCard += 8 so 'spanCard8': id of card where word will be inserted (spanish word equivalent of english word above)
    document.getElementById(spanCardId).value = englishSpanishWords[wordsSelectedIndex][1];//above eg wordsSelectedIndex[0]=13 so englishSpanishWords[13][1] is the word picked to be inserted
    spanCardId = "spanCard"; //reset value so no longer spanCard8
  }
}
/////////////////////////////
//global vars
var timesClicked = 0;
var firstCardClicked = "ok";
var score = 0;
/* without waitFlag, new card matches can be chosen while the checkIfCardsMatch function is still running (while borders are being changed colour etc).
Due to setTimeoutDelay, this is a problem.
waitFlag gives illusion that other cards are unselectable while the timeout function runs*/
var waitFlag = false; //false - no need to wait
var firstCardWord;
var firstCardId;
var secondCardId;
var secondCardWord;
var firstCardRow;
var firstCardCol;
var secondCardRow;
var secondCardCol;


//glob vars end

function checkIfCardsMatch(currentCardId){
//array[i][j]  =array[row][column]
  if(waitFlag == false){ //if there is no need to wait carry out code, else skip code
    if(timesClicked === 0){ //if its the first card of a pair to be clicked
      firstCardSelected(currentCardId);
      }
    else{//else second card is picked
      secondCardPicked(currentCardId);
      loopToFindBothCardRowNum();
      if(firstCardRow === secondCardRow && !sameCardClicked()){ //if cards are a match but they are not the exact same card i.e. card1:cat card2:cat
        cardsAreMatch();
        updateScore();
      }
      else{//not a match
        cardsNotMatch();
      }
      timesClicked =0; //as second card has been clicked then we reset this variable so we can carry out a new match
    }
  }
}
//===============

function firstCardSelected(currentCardId){
  //console.log("first card selected function call");
  firstCardId = currentCardId;
  document.getElementById(firstCardId).style.border = "4px solid green";
  firstCardWord = document.getElementById(firstCardId).value;
  timesClicked++;
}
function secondCardPicked(currentCardId){
  waitFlag = true; // while the styling is being changed on cards (particularly with setTimeoutDelay)
  secondCardId = currentCardId;
  secondCardWord = document.getElementById(secondCardId).value;
}
function loopToFindBothCardRowNum(){
  /*determine if match : e.g. arr is [["cat","catInSpanish"],["dog","dog in spanish"]]
  cat is at index [0,0] row 0, col 0         catInSpanish is [0,1] row 0 col
   dog is at index [1,0]  row 1 col 0         doginspanish is [1,1] row 1 col 0
   matching values are in the same row as one another so there i/row valeus would be equal
  */
  for(var row = 0;row <= englishSpanishWords.length-1; row++){
      for(var col = 0; col < 2; col++){ //column
        if(englishSpanishWords[row][col] === firstCardWord){//find the first card word in the word array
          firstCardRow = row;
          firstCardCol = col;
          //break; //value found so no need for for loop to keep running
        }
        else if(englishSpanishWords[row][col] === secondCardWord){//find the first card word in the word array
          secondCardRow = row;
          firstCardCol = col;
         // break;//value found so no need for for loop to keep running
        }
      }
  }
}
function sameCardClicked(){
  var exactSameCard;
  if(firstCardRow === secondCardRow && firstCardCol == secondCardCol){
    exactSameCard = true;    //same card clicked
  }
  else {
    exactSameCard = false;
  }
  return exactSameCard;
}

function cardsAreMatch(){
  document.getElementById(secondCardId).style.border = "4px solid green";
  var hideMatchedCard1 =
  setTimeout(function(){$("#"+secondCardId).css("visibility", "hidden")},1000);
  setTimeout(function(){$("#"+firstCardId).css("visibility", "hidden")},1000);
  setWaitFlagToFalse();
}
function cardsNotMatch(){
  document.getElementById(secondCardId).style.border = "4px solid red";
  document.getElementById(firstCardId).style.border = "4px solid red";
  var changeBorderBackNormal =
  setTimeout(function(){
    document.getElementById(firstCardId).style.border = "2px solid grey";
    },1000);
  setTimeout(function(){
    document.getElementById(secondCardId).style.border = "2px solid grey";
  },1000);
  setWaitFlagToFalse();
}
function setWaitFlagToFalse(){
  setTimeout(function(){
    /*once time is up and cards are styled and/or hidden, set wait flag to false so other cards can be chosen*/
    waitFlag = false;},1000);
}
function updateScore(){
  score++;
  document.getElementById("score").value = score;
}
