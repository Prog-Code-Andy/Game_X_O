function Controller(){
    this.view = new View(this);
    this.model = new Model();
    this.needReset = false;
    this.temp = false;
    this.view.setScore(this.model.pwin, this.model.cwin);

    this.handleEvent = function(event){
        event.stopPropagation();
        if(this.needReset){
            this.model.newGame();
            this.view.newGame();
            this.needReset = false;
            this.temp = false;
            return;
        }
        if(event.type === 'click'){
            let cell = event.target.id;
                if(this.model.checkCellFree() === false){
                    this.needReset;
                    return;
                }
                if(this.model.playersTurn(cell)){
                    if(!this.temp){
                        this.view.drawToken(this.model.player, cell, this.model.countLengGame());
                    }
                    this.temp = this.model.getMatchResult();
                    
                    /* console.log(this.view.getCoords(cell)); */
                    if(!this.temp){
                    this.view.drawToken(this.model.comp, this.model.autoTurn(), this.model.countLengGame());
                    }
                    this.temp = this.model.getMatchResult();
                    if(this.model.getMatchResult())
                    {
                        console.log(this.model.getMatchResult());
                        this.needReset = true;
                        this.view.setScore(this.model.pwin, this.model.cwin);
                        this.model.getTempMachRes = true;
                        this.view.setResetOnClick();
                    }
                }
         }
    };
}

var controller = new Controller();