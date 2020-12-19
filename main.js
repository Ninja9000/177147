var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
var gridW = window.innerWidth;
var gridH = window.innerHeight;

ctx.fillStyle = "darkgray";
ctx.beginPath();
ctx.moveTo(gridW / 2, gridH / 2 - 116 * Math.sqrt(3) + 4);
ctx.lineTo(gridW / 2 - 154, gridH / 2 + 34 * Math.sqrt(3) + 11);
ctx.lineTo(gridW / 2 + 154, gridH / 2 + 34 * Math.sqrt(3) + 11);
ctx.closePath();
ctx.fill();

/*window.addEventListener("keyup", event => {
    if (event.keyCode === 65) {
        console.log("A was pressed");
    } else if (event.keyCode === 87) {
        console.log("W was pressed");
    } else if (event.keyCode === 69) {
        console.log("E was pressed");
    } else if (event.keyCode === 68) {
        console.log("D was pressed");
    } else if (event.keyCode === 88) {
        console.log("X was pressed");
    } else if (event.keyCode === 90) {
        console.log("Z was pressed");
    }
});*/

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function Tile(x, y) {
    this.value = 0;
    this.pos = [x, y];
    this.color = "lightgray";

    this.draw = function() {
        var evenSpace = (this.pos[0] + this.pos[1]) % 2 == 0;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        if (evenSpace) {
            ctx.moveTo(gridW / 2 + this.pos[0] * 37, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 28 * Math.sqrt(3) + 7);
            ctx.lineTo(gridW / 2 + this.pos[0] * 37 - 30, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 7);
            ctx.lineTo(gridW / 2 + this.pos[0] * 37 + 30, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 7);
        } else {
            ctx.moveTo(gridW / 2 + this.pos[0] * 37, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 11);
            ctx.lineTo(gridW / 2 + this.pos[0] * 37 - 30, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 30 * Math.sqrt(3) + 10);
            ctx.lineTo(gridW / 2 + this.pos[0] * 37 + 30, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 30 * Math.sqrt(3) + 10);
        }

        ctx.closePath();
        ctx.fill();

        if (this.value != 0) {
            ctx.fillStyle = "gray";
            ctx.font = "bold 18pt Arial";
            
            if (evenSpace) {
                ctx.fillText(this.value, gridW / 2 + this.pos[0] * 37 - 7, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 19 * Math.sqrt(3));
            } else {
                ctx.fillText(this.value, gridW / 2 + this.pos[0] * 37 - 7, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 30 * Math.sqrt(3));
            }
        }
    };
    
    this.recolor = function() {
        this.color = "white";
    }

    this.realize = function() {
        this.value = Math.pow(3, Math.round(Math.random()) + 1);
        this.color = "white";
        this.draw();
    }

    this.getPos = function() {
        return this.pos;
    };
};

var tiles = [];
let i = 0;

for (let x = -3; x < 4; x++) {
    tiles[i] = new Tile(x, 0);
    tiles[i].draw();
    i++;
}

for (let x = -2; x < 3; x++) {
    tiles[i] = new Tile(x, 1);
    tiles[i].draw();
    i++;
}

for (let x = -1; x < 2; x++) {
    tiles[i] = new Tile(x, 2);
    tiles[i].draw();
    i++;
}

tiles[i] = new Tile(0, 3);
tiles[i].draw();

a = Math.round(Math.random() * 14) + 1;
b = Math.round(Math.random() * 14) + 1;

while (a == b) {
    b = Math.round(Math.random() * 14) + 1;
}

tiles[a].realize();
tiles[b].realize();