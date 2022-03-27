const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

window.addEventListener("keydown", function (event) {

    switch (event.key) {
        case "1":
            selectedCellIndex = 1;
            break;
        case "2":
            selectedCellIndex = 2;
            break;
        case "3":
            selectedCellIndex = 3;
            break;
        case "4":
            selectedCellIndex = 4;
            break;
        case "5":
            selectedCellIndex = 5;
            break;
        case "6":
            selectedCellIndex = 6;
            break;



        case "ArrowLeft": 
            selectedCellIndex = ((selectedCellIndex + ((mancala.turn == 0) ? 4 : 6)) % 6) + 1;
            break;
        case "ArrowRight": 
            selectedCellIndex = ((selectedCellIndex + ((mancala.turn == 0) ? 6 : 4)) % 6) + 1;
            break;
        

        case " ":
            mancala.makeMove(selectedCellIndex);
            break;

        default:
            return;
  }
})



myCanvas.width = window.innerWidth;
myCanvas.height = 0.4 * myCanvas.width;

var w = myCanvas.width
var h = myCanvas.height


class Mancala {
    constructor() {
        this.stonesInCells = [0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4];
        this.turn = 0;
    }

    show() {
        var topRow = "  ";
        for (var i = 13; i >= 8; i--) {
            topRow += this.stonesInCells[i].toString() + " ";
        }
        topRow += " ";

        var midRow = this.stonesInCells[0].toString() + "                   " + this.stonesInCells[7].toString();

        var bottomRow = "  ";
        for (var i = 1; i <= 6; i++) {
            bottomRow += this.stonesInCells[i].toString() + " ";
        }
        bottomRow += " ";

        console.log(topRow);
        console.log(midRow);
        console.log(bottomRow);
    }

    makeMove(cellIndex) {
        cellIndex += this.turn * 7;
        var stones = this.stonesInCells[cellIndex];
        if (stones == 0) {
            console.log("not valid move");
            return;
        }
        this.stonesInCells[cellIndex] = 0

        var currCellIndex = cellIndex;
        while (stones > 0) {
            currCellIndex = (currCellIndex + 1) % 14;

            if (currCellIndex == (this.turn == 0 ? 0 : 7)) 
                continue;

            this.stonesInCells[currCellIndex]++;
            stones--;
        }


        if (currCellIndex != (this.turn == 0 ? 7 : 0)) {
            if (this.stonesInCells[currCellIndex] == 1 &&  (this.turn == 0 ? currCellIndex <= 6 : currCellIndex >= 8)) {
                this.stonesInCells[currCellIndex] = 0;
                this.stonesInCells[this.turn == 0 ? 7 : 0] += this.stonesInCells[Math.abs(14 - currCellIndex)] + 1;
                this.stonesInCells[Math.abs(14 - currCellIndex)] = 0;
            }

            this.changeTurn();
        }

    }

    changeTurn() {
        this.turn = (this.turn == 0) ? 1 : 0;
    }

    getStonesCollectedByPlayer(player) {
        return stonesInCells[player == 0 ? 7 : 0];
    }
}

var mancala = new Mancala();

var selectedCellIndex = 1;

var size = w / 10.7;
var margin = size * 0.3;
var offset = size * 0.3;



function draw() {

    myCanvas.width = window.innerWidth;
    myCanvas.height = 0.4 * myCanvas.width;

    w = myCanvas.width
    h = myCanvas.height

    size = w / 10.7;
    margin = size * 0.3;
    offset = size * 0.3;    

    //clearing
    ctx.clearRect(0, 0, w, h);



    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";

    ctx.fillStyle = "rgb(100, 0, 0)";
    ctx.fillRect(w - margin - size, margin, size, size * 3);
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillText(mancala.stonesInCells[7].toString(), w - margin - size + size * 0.5, margin + size * 1.5);

    ctx.fillStyle = "rgb(0, 0, 100)";
    ctx.fillRect(margin, margin, size, size * 3);
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillText(mancala.stonesInCells[0].toString(), margin + size * 0.5, margin + size * 1.5);


    //turn
    //ctx.fillStyle = mancala.turn == 0 ? "rgb(100, 0, 0)" : "rgb(0, 0, 100)";
    //ctx.fillRect(w/2 - size*0.4, h/2 - size*0.4, size*0.8, size*0.8);


    //draw selected cell countour
    if (mancala.turn == 0) {
        ctx.fillStyle = "rgb(35, 201, 255)";
        ctx.fillRect(margin + (size + offset) * selectedCellIndex - offset * 0.5, margin + 2 * size  - offset * 0.5, size + offset, size + offset);
    } else {
        ctx.fillStyle = "rgb(35, 201, 255)";
        ctx.fillRect(margin + (size + offset) * (7 - selectedCellIndex) - offset * 0.5, margin - offset * 0.5, size + offset, size + offset);
    }


    for (var i = 1; i <= 6; i++) {
        

        ctx.fillStyle = "rgb(100, 0, 0)";
        ctx.fillRect(margin + (size + offset) * i, margin + 2 * size, size, size);

        //text numer of stones (red)
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillText(mancala.stonesInCells[i].toString(), margin + (size + offset) * i + size * 0.5, margin + 2 * size + size * 0.6);


        ctx.fillStyle = "rgb(0, 0, 100)";
        ctx.fillRect(margin + (size + offset) * i, margin, size, size);

        //text number of stones (blue)
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillText(mancala.stonesInCells[7 - i + 7].toString(), margin + (size + offset) * i + size * 0.5, margin + size * 0.6);

        
    }
}

setInterval(draw, 10);