var Cell = function(){
  return{
    //atributos
    value: String(),
    set_value: function(parent){
      return function(){
        console.log(turn);
        this.disabled = true;
        this.textContent = turn;
        if(turn === "X"){
          this.setAttribute("class","cellRed");
          parent.value = "X";
          turn = "O";
        }else{
          this.setAttribute("class","cellGreen");
          parent.value = "O";
          turn = "X";
        }
        turn_label.innerHTML = "Turn of Player " + '"' + turn + '"';
        validateWinner();
      };
    },
  };
};

var validateWinner = function(){
  //Información de las 3 lineas
  line1 = cells.slice(0,3);
  line2 = cells.slice(3,6);
  line3 = cells.slice(6,9);
  var how_won = String();
  // Matriz de validación con las posibilidades de ganar.
  if(line1[0].value + line1[1].value + line1[2].value === "XXX" || line1[0].value + line1[1].value + line1[2].value === "OOO"){
    winner = true;
    how_won = "Line left to right";
    console.log(winner);
  }else if(line2[0].value + line2[1].value + line2[2].value === "XXX" || line2[0].value + line2[1].value + line2[2].value === "OOO"){
    winner = true;
    how_won = "Line left to right";
  }else if(line3[0].value + line3[1].value + line3[2].value === "XXX" || line3[0].value + line3[1].value + line3[2].value === "OOO"){
    winner = true;
    how_won = "Line left to right";
  }else if(line1[0].value + line2[0].value + line3[0].value === "XXX" || line1[0].value + line2[0].value + line3[0].value === "OOO"){
    winner = true;
    how_won = "line top to down";
  }else if(line1[1].value + line2[1].value + line3[1].value === "XXX" || line1[1].value + line2[1].value + line3[1].value === "OOO"){
    winner = true;
    how_won = "line top to down";
  }else if(line1[2].value + line2[2].value + line3[2].value === "XXX" || line1[2].value + line2[2].value + line3[2].value === "OOO"){
    winner = true;
    how_won = "line top to down";
  }else if(line1[0].value + line2[1].value + line3[2].value === "XXX" || line1[0].value + line2[1].value + line3[2].value === "OOO"){
    winner = true;
    how_won = "diagonal left to right";
  }else if(line1[2].value + line2[1].value + line3[0].value === "XXX" || line1[2].value + line2[1].value + line3[0].value === "OOO"){
    winner = true;
    how_won = "diagonal right to left";
  }
  if(winner){
    if(turn === "X"){
      how_won_label.innerHTML = "The player" + '"' + "O" + '"'+ "win ---> " + how_won;
    }else {
      how_won_label.innerHTML = "The player" + '"' + "X" + '"'+ "win ---> " + how_won;
    }
    window.confirm(how_won_label.textContent);
    reset();
  }
};

// Función de resetea el juego.
var reset = function(){
  console.log("Entro reset");
  turn = "X";
  turn_label.innerHTML = "Turn of Player " + '"X"';
  var game_buttons = document.querySelectorAll("#game_buttons button");
  winner = false;
  var i = 0;
  cells = [];
  for(i=0; i<game_buttons.length; i++){
    game_buttons[i].removeAttribute("class");
    game_buttons[i].disabled = false;
    game_buttons[i].textContent = String();
    cells.push(Cell(game_buttons[i]));
    game_buttons[i].addEventListener("click", cells[i].set_value(cells[i]));
  }
  console.log(cells);
};

// Variable que administra turno
var turn = String();
// html que visualiza el turno
var turn_label = null;
// Arreglo que contiene la información del juego
var cells = [];
// Indica el ganador
var winner = false;
// Informa cómo ganó
var how_won_label = String();
// Variable para reiniciar juego
var confirm_winner = String();
document.addEventListener("DOMContentLoaded", function(){
  // Inicia el jugador X
  turn = "X";
  turn_label = document.querySelector("#player_turn");
  how_won_label = document.querySelector("#how_won");
  var reset = document.querySelector("#reset");
  reset.addEventListener("click", this.reset);
  turn_label.innerHTML = "Turn of Player " + '"X"';
  var game_buttons = document.querySelectorAll("#game_buttons button");
  var i = 0;
  for(i=0; i<game_buttons.length; i++){
    cells.push(Cell(game_buttons[i]));
    game_buttons[i].addEventListener("click", cells[i].set_value(cells[i]));
  }
});
