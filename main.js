var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
var gridW = window.innerWidth;
var gridH = window.innerHeight;

let wait = true;

let score = 0;
let hScore = 0;

ctx.fillStyle = "#8492a6";
ctx.beginPath();
ctx.moveTo(gridW / 2, gridH / 2 - 116 * Math.sqrt(3) + 4);
ctx.lineTo(gridW / 2 - 154, gridH / 2 + 34 * Math.sqrt(3) + 11);
ctx.lineTo(gridW / 2 + 154, gridH / 2 + 34 * Math.sqrt(3) + 11);
ctx.closePath();
ctx.fill();

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

window.addEventListener("keyup", event => {
    if (wait == true) {
        wait = false;
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
        wait = true;
    }
});

function Tile(x, y) {
    this.value = 0;
    this.pos = [x, y];
    this.color = "#b4c8da";

    this.draw = function() {
        var evenSpace = (this.pos[0] + this.pos[1]) % 2 == 0;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        if (evenSpace) {
            ctx.moveTo(gridW / 2 + this.pos[0] * 37, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 30 * Math.sqrt(3) + 7);
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
            ctx.font = "bold 18pt Arial";
            this.recolor();
            
            if (evenSpace) {
                ctx.fillText(Math.pow(3, this.value), gridW / 2 + this.pos[0] * 37 - 7, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 19 * Math.sqrt(3));
            } else {
                ctx.fillText(Math.pow(3, this.value), gridW / 2 + this.pos[0] * 37 - 7, gridH / 2 - this.pos[1] * 37 * Math.sqrt(3) + 30 * Math.sqrt(3));
            }
        }
    };
    
    this.recolor = function() {
        ctx.fillStyle = "white";
        if (this.value == 1) {
            this.color = "#e9e9ef";
            ctx.fillStyle = "#8492a6";
        } else if (this.value == 2) {
            this.color = "#9aa4de";
        } else if (this.value == 4) {
            this.color = "#738ef1";
        } else if (this.value == 8) {
            this.color = "#b05cff";
        } else if (this.value == 16) {
            this.color = "#d646b2";
        } else if (this.value == 32) {
            this.color = "#ee6473";
        }
    }

    this.realize = function() {
        this.value = Math.pow(2, Math.round(Math.random() * 4));
        this.recolor();
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
    tiles[i].realize();
    i++;
}

for (let x = -2; x < 3; x++) {
    tiles[i] = new Tile(x, 1);
    tiles[i].realize();
    i++;
}

for (let x = -1; x < 2; x++) {
    tiles[i] = new Tile(x, 2);
    tiles[i].realize();
    i++;
}

tiles[i] = new Tile(0, 3);
tiles[i].realize();

a = Math.round(Math.random() * 14) + 1;
b = a
c = b

while (a == b) {
    b = Math.round(Math.random() * 14) + 1;
}

while (a == c || b == c) {
    c = Math.round(Math.random() * 14) + 1;
}

tiles[a].realize();
tiles[b].realize();
tiles[c].realize();