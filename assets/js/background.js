const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let xspacing = 8;       // 缩小间距，点更密集
let amplitude = 50;     // 振幅可适当调节
let period = 400;
let dx;
let yvalues;
let theta = 0;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    dx = (2 * Math.PI / period) * xspacing;
    yvalues = new Array(Math.floor(width / xspacing));
}
window.addEventListener('resize', resize);
resize();

function calcWave() {
    theta += 0.03;  // 动画速度微调
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = Math.sin(x) * amplitude;
        x += dx;
    }
}

function renderWave() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 150, 255, 0.6)';
    for (let i = 0; i < yvalues.length; i++) {
        ctx.beginPath();
        // 小点更细，半径调小
        ctx.arc(i * xspacing, height / 2 + yvalues[i], 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    calcWave();
    renderWave();
    requestAnimationFrame(animate);
}

animate();
