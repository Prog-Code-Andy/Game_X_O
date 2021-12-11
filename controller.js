function Controller() {
  this.view = new View(this);
  this.model = new Model();
  this.needReset = false;
  this.view.printAva();
  this.view.setScore(this.model.pwin, this.model.cwin);

  this.handleEvent = function (event) {
    event.stopPropagation();
    if (this.needReset) {
      this.model.newGame();
      this.view.newGame();
      this.view.printAva(true);
      this.needReset = false;
      this.temp = false;
      return;
    }
    if (event.type === "click") {
      let cell = event.target.id;
      if (this.model.playersTurn(cell)) {
        this.view.drawToken(this.model.player, cell);
        let rez = this.model.getMatchResult();
        if (rez) {
          this.matchEnd(rez);
          return;
        }
        this.view.drawToken(this.model.comp, this.model.autoTurn());
        rez = this.model.getMatchResult();
        if (rez) {
          //можно дать команду на результат
          this.matchEnd(rez);
          return;
        }
      }
    }
  };
  this.matchEnd = function(result){
      console.log(result);
      this.view.printAva(result);
      this.needReset = true;
      this.model.getTempMachRes = true;
      this.view.setScore(this.model.pwin, this.model.cwin);
  }
}

var controller = new Controller();
       /* console.log(this.view.getCoords(cell)); */