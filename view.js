function View(controller) {


    /* document.getElementById('resetButton').addEventListener('click', controller); */

    var startBlockGame = document.querySelector('.field');
    startBlockGame.style.display = "block";


    var playFeild = document.querySelector('.game_field').getElementsByTagName("span");
    for (let i = 0; i < playFeild.length; i++) {
        playFeild[i].id = "" + i;
        playFeild[i].addEventListener("click", controller, /*  {capture : true} */ );
    };

    this.setResetOnClick = function () {
        document.body.addEventListener("click", this.controller, {
            once: true
        })
    };

    this.newGame = function () {
        var round = document.querySelector(".game_field").getElementsByTagName("span");
        for (let i = 0; i < round.length; i++) {
            round[i].className = "";
        }
    };

    this.drawToken = function (move, cell) {
        var playFeild = document.querySelector('.game_field').getElementsByTagName('span');
        if (move === "x") {
                playFeild[cell].className = "numX";
        }
        if (move !== "x") {
                playFeild[cell].className = "numO";
        }
    };

    this.setScore = function (comp, player) {
        var textResult = document.querySelector('.numb_rez').getElementsByClassName('rez');
        textResult[0].innerHTML = String(player);
        textResult[1].innerHTML = String(comp);
    };

    this.lineWin = function () {
        var gorizThree = document.querySelector('.gorizont_three');
        var line = document.createElement("div");
        line.className = "line";
        var hr = document.createElement('hr');
        line.appendChild(hr);
        gorizThree.prepend(line);
    };

    this.onClickTest = function (obj) {
        console.log("test");
        console.log(obj.target.id);
    };

    this.printAva = function (res) {
        var avatOne = document.querySelector('.avatar-one'),
            avatTwo = document.querySelector('.avatar-two');
        if(!res){
        var pictOne = document.createElement("IMG"),
            pictTwo = document.createElement("IMG");
            pictOne.src = "img/grimace-solid.svg";
            pictTwo.src = "img/plyer-start.svg";
            avatOne.appendChild(pictOne);
            avatTwo.appendChild(pictTwo);
        }
        
            var bot = res;
            var player = res;
            var avatDirBot = avatOne.getElementsByTagName("img");
            var avatDirPl = avatTwo.getElementsByTagName("img");
            avatDirBot[0].outerHTML = '<img src="img/grimace-solid.svg">';
            avatDirPl[0].outerHTML = '<img src="img/plyer-start.svg">';
            if(bot === "c" || player === "p"){
                if(bot === "c"){
                    avatDirBot[0].outerHTML = '<img src="img/win.svg">'
                }else{
                    avatDirBot[0].outerHTML = '<img src="img/lose.svg">'
                }
                if(player === "p"){
                    avatDirPl[0].outerHTML = '<img src="img/win.svg">'
                }else{
                    avatDirPl[0].outerHTML = '<img src="img/lose.svg">'
                }
            }
    };

    this.getCoords = function(cell) {
        /* https://learn.javascript.ru/coordinates-document */
        let box = playFeild[cell].getBoundingClientRect();
        return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
      }

}
