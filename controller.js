function Controller(){
    this.view = new View(this);
    this.model = new Model();
    this.needReset = false;

    this.handleEvent = function(event){
        event.stopPropagation();
        if(this.needReset){
            this.model.newGame();
            this.view.newGame();
            this.needReset = false;
            return;
        }
        if(event.type === 'click'){
            let cell = event.target.id;
                if(this.model.checkCellFree() === false){
                    this.needReset;
                    return;
                }
                if(this.model.playersTurn(cell)){
                    this.view.drawToken(this.model.player, cell, this.model.countTemp());
                    console.log(this.view.getCoords(cell));
                    //написать проверку не закончилась ли игра? - нужна ли?
                    this.view.drawToken(this.model.comp, this.model.autoTurn(), this.model.countTemp());
                    //написать проверку не закончилась ли игра? - нужна ли?
                    if(this.model.getMatchResult())
                    {
                        console.log(this.model.getMatchResult());
                        this.needReset = true;
                        this.view.setResetOnClick();
                    }
                }
         }
    };

    this.view.setScore("0","0");
}

var controller = new Controller();