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

    this.drawToken = function (move, cell, countTemp) {
        var playFeild = document.querySelector('.game_field').getElementsByTagName('span');
        if (countTemp > 9) return false;
        if (move === "x") {
                playFeild[cell].className = "numX";
        }
        if (countTemp >= 9) return false;
        if (move !== "x") {
                playFeild[cell].className = "numO";
        }
    };

    this.writeResultText = function (text) {
        var textResult = document.querySelector('.block_element').getElementsByTagName('span');
    };

    this.setScore = function (comp, player) {
        var textResult = document.querySelector('.numb_rez').getElementsByTagName('span');
        textResult[0].innerHTML = player;
        textResult[1].innerHTML = comp;
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
