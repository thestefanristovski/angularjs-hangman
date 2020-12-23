'use strict';

var app=angular.module(
    "HangmanApp",
    []
);

app.controller("GameController", ['$scope', '$timeout', function ($scope, $timeout){

  var words = ["hello", "world", "test", "stefan"];
  $scope.incorrectGuesses = [];
  $scope.correctGuesses = [];
  $scope.guesses = 6;
  $scope.displayWord = "";
  $scope.input = {
    letter : ''
  }

  var selectedWord = "";

  var selectRandomWord = function () {
    var index = Math.round(Math.random()*(words.length-1));
    console.log(index);
    return words[index];
  }

  var newGame = function () {
    $scope.incorrectGuesses = [];
    $scope.correctGuesses = [];
    $scope.guesses = 6;
    $scope.displayWord = '';

    selectedWord = selectRandomWord();
    console.log(selectedWord);
    var tempDisplay = '';
    for (var i = 0; i<selectedWord.length; i++)
    {
      tempDisplay += '*';
    }
    $scope.displayWord = tempDisplay;
  }

  $scope.letterChosen = function () {
    //check if letter was already played
    for (var i = 0; i< $scope.correctGuesses.length; i++) {
      if ($scope.correctGuesses[i].toUpperCase() == $scope.input.letter.toUpperCase())
      {
        $scope.input.letter = "";
        return;
      }
    }
    for (var i = 0; i< $scope.incorrectGuesses.length; i++) {
      if ($scope.incorrectGuesses[i].toUpperCase() == $scope.input.letter.toUpperCase())
      {
        $scope.input.letter = "";
        return ;
      }
    }

    var found = false;
    for (var i =0; i<selectedWord.length; i++) {
      if(selectedWord[i].toUpperCase() == $scope.input.letter.toUpperCase())
      {
        found = true;
        $scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
      }
    }

    if (!found)
    {
      $scope.guesses = $scope.guesses -1;
      $scope.incorrectGuesses.push($scope.input.letter.toUpperCase());
    } else {
      $scope.correctGuesses.push($scope.input.letter.toUpperCase());
    }

    if($scope.guesses == 0) {
      alert("you lost!");
      $timeout(function () {
        newGame();
      }, 500);
    }
    if ($scope.displayWord.indexOf('*') == -1) {
      alert("you won!");
      $timeout(function () {
        newGame();
      }, 500);
    }

    $scope.input.letter = '';


  }


  newGame();


}])


