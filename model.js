function Model(char = "x") {
  var empty = "";
  this.player = char;
  this.comp = char = "x" ? "o" : "x";
  this.pwin = 0;
  this.cwin = 0;
  this.countGame = 0;
  this.getTempMachRes = true;

  var getClearField = function () {
    return [
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty],
    ];
  };

  this.field = getClearField();
  var count = 0;

  this.countLengGame = function () {
    return count;
  };

  this.changeToken = function () {
    if (this.player !== "o") {
      this.player = "o";
      this.comp = "x";
    } else {
      this.player = "x";
      this.comp = "o";
    }
  };

  this.playersTurn = function (cellNumber) {
    var x = cellNumber % 3;
    var y = ~~Math.floor(cellNumber / 3);
    if (this.field[y][x] !== empty) {
      return false;
    }
    this.field[y][x] = this.player;
    count++;
    this.countLengGame();
    return true;
  };

  this.smartMove = function (token, arr) {
    var  tokenCenter = 0, spCent = -1, tokenCenterSec = 0, spCentSec = -1;
    for (let i = 0; i < 3; i++) {
      var tokenCntR = 0, spR = -1, tokenCntL = 0, spL = -1;
      
      for (let j = 0; j < 3; j++) {
        if(arr[i][j] === token) tokenCntR++;
        else if (arr[i][j] === empty) spR = j;

        if(arr[j][i] === token) tokenCntL++;
        else if (arr[j][i] === empty) spL = j;

        if(arr[i][j] === token && i === j) tokenCenter++;
        else if (arr[i][j] === empty && i === j) spCent = j;

        if(arr[i][j] === token && 2-i === j) tokenCenterSec++;
        else if (arr[i][j] === empty && 2-i === j) spCentSec = i;
      }
      if (tokenCntR === 2 && spR !== -1) return i * 3 + spR;
      else if (tokenCntL === 2 && spL !== -1) return spL * 3 + i;
      else if(tokenCenter === 2 && spCent !== -1) {
        return spCent * 4;
      } else if(tokenCenterSec === 2 && spCentSec !== -1) {
        return (spCentSec+1)*2;
      }
    }
    if(token === this.comp)
      return this.smartMove(this.player, arr);
    return null;
  };

  this.autoTurn = function () {
    if (count < 9) {
      var res = this.smartMove(this.comp, this.field);
      if(this.field[1][1] === empty){
        this.field[1][1] = this.comp;
        res = 4;
      }

         //если центр ход X по Углам 0
      if(this.countGame%2 != 0){
        if(this.field[1][1] === this.player && count === 1){
          console.log(count);
          var tempP;
          do{
            tempP = ~~(Math.random()*9);
          }while(tempP !== 0 && tempP !== 2 && tempP !== 6 && tempP !== 8);
          this.field[~~(tempP / 3)][tempP % 3] = this.comp;
          console.log(tempP + " print number");
          console.log(this.field);
          return tempP;
        } 
      }

      if(res === null){
        do {
          res = ~~(Math.random() * 9);
        } while (this.field[~~(res/3)][res%3] !== empty);
      }
      this.field[~~(res / 3)][res % 3] = this.comp;
        count++;
        console.log(this.field);
        return res;
    }
  };

  var checkRezult = function (a) {
    for (var i = 0; i < 3; i++) {
      if (a[i][0] !== empty && a[i][0] === a[i][1] && a[i][1] === a[i][2]) {
        return a[i][0];
      }
      if (a[0][i] !== empty && a[0][i] === a[1][i] && a[1][i] === a[2][i]) {
        return a[0][i];
      } else if (a[1][1] !== empty) {
        if (
          (a[0][0] === a[1][1] && a[1][1] === a[2][2]) ||
          (a[2][0] === a[1][1] && a[1][1] === a[0][2])
        ) {
          return a[1][1];
        }
      }
    }
    return false;
  };

  this.getMatchResult = function () {
    var res = checkRezult(this.field);
    if (res) {
      if (res === this.player) {
        if (this.getTempMachRes) {
          this.getTempMachRes = false;
          ++this.countGame;
          ++this.pwin;
        }
        return "p";
      } else {
        if (this.getTempMachRes) {
          this.getTempMachRes = false;
          ++this.countGame;
          ++this.cwin;
        }
        return "c";
      }
    }
    if (count === 9) {
      ++this.countGame;
      ++this.pwin;
      ++this.cwin;
      return "d";
    }
    return false;
  };

  this.newGame = function () {
    this.field = getClearField();
    count = 0;
  };

  this.checkCellFree = function () {
    if (count > 8) {
      return false;
    }
  };

  this.printFieldToConsole = function () {
    for (let i = 0; i < this.field.length; i++) {
      console.log("____________");
      var temp = " ";
      for (let j = 0; j < this.field.length; j++) {
        temp += this.field[i][j] + " | ";
      }
      console.log(temp);
    }
    console.log("____________");
  };
}

if (this.name === undefined) {
  var modelG = new Model();
  modelG.playersTurn(0);
  modelG.autoTurn();
  modelG.playersTurn(3);
  modelG.autoTurn();
  modelG.playersTurn(6);
  console.log(modelG.getMatchResult());
  modelG.printFieldToConsole();
}
