function Model(char = "x") {
  var empty = "";
  this.player = char;
  this.comp = char = "x" ? "o" : "x";
  this.pwin = 0;
  this.cwin = 0;
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

  /* no function code */
  /* this.autoTurn = function () {
    var arr = this.field;
    var sv = 0;
    var sp = -1;
    var ss;
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
        var sx = 0; 
      for (let j = 0; j < 3; j++) {
        if (arr[i][j] === "x") {
          sx++;
            sv = sx;
            ss = i;
          console.log("find x " + "in " + i + " " + j + " SX = " + sx);
        } else if (arr[i][j] === "") {
            sp = j;
          console.log("find ..." + "in " + i + " " + j + " SP = " + sp);
        }
      }

    }
    console.log(sv);
      if (sv === 2 && sp !== -1) {
        console.log("!!!!!!!! " + ss);
        for (let i = 0; i < arr.length; i++) {
          if (this.field[ss][i] === "") {
            this.field[ss][i] = this.comp;
             console.log("!!---!!! " + (ss * 3 + i));
             count++;
            return ss * 3 + i;
          } 
        }
    }
      else {
        console.log("XXXXXXXX " + ss);
            sp = -1;
            if (count < 9) {
                do {
                  var y = ~~(Math.random() * 3);
                  var x = ~~(Math.random() * 3);
                } while (this.field[y][x] !== empty);
                this.field[y][x] = this.comp;
                count++;
                this.countLengGame();
                return y * 3 + x;
              }
        }
  }; */
 /*  end no function code */

this.smartMovie = function(token, arr) {
  for (let i = 0; i < arr.length; i++) {
    var tokenCntl = 0, spR;
    for (let j = 0; j < arr.length; j++) {
      if(arr[i][j] === token) tokenCntl++;
      if(arr[i][j] === empty) spR = j;
    } 
    if(tokenCntl === 2 && spR !== -1) return i*3+spR;
  }
}


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
          ++this.pwin;
        }
        return "p";
      } else {
        if (this.getTempMachRes) {
          this.getTempMachRes = false;
          ++this.cwin;
        }
        return "c";
      }
    }
    if (count === 9) {
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
