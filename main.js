var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');
c.height = window.innerHeight;
c.width = window.innerWidth;

function Tile(x, y, c) {
    this.value = Math.pow(3, Math.round(Math.random()) + 1);
    this.pos = [x, y];
    this.color = c;
    this.tileDraw = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1] + 30 * Math.sqrt(3));
        ctx.lineTo(this.pos[0] - 30, this.pos[1]);
        ctx.lineTo(this.pos[0] + 30, this.pos[1]);
        ctx.closePath();
        ctx.fill();
    };
};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

/*var f = 0;
function drawIt() {
    window.requestAnimFrame(drawIt);
    ctx.fillRect(f,100,200,100);
    f += 5;
}
window.requestAnimFrame(drawIt);
*/