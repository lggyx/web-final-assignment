// 星空背景效果
const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.getElementById('starCanvas');
const context = canvas.getContext('2d');

let scale = 1;
let width;
let height;
let stars = [];
let pointerX;
let pointerY;
let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
let touchInput = false;

function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
    }
}

function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}

function recycleStar(star) {
    let direction = 'z';
    let vx = Math.abs(velocity.x);
    let vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }
        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 't') {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }
}

function resize() {
    scale = window.devicePixelRatio || 1;
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;
    canvas.width = width;
    canvas.height = height;
    stars.forEach(placeStar);
}

function step() {
    context.clearRect(0, 0, width, height);
    update();
    render();
    requestAnimationFrame(step);
}

function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star);
        }
    });
}

function render() {
    stars.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.beginPath();
        context.moveTo(star.x, star.y);

        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}

function movePointer(x, y) {
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        let ox = x - pointerX;
        let oy = y - pointerY;
        velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }
    pointerX = x;
    pointerY = y;
}

function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
}

function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
    event.preventDefault();
}

function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}

// 层层海浪效果
const randColor = () => `rgba(${Math.random() * 50 + 50}, ${Math.random() * 100 + 150}, ${Math.random() * 50 + 200}, ${(Math.random() * 0.3 + 0.2).toFixed(2)})`;
const randDuration = () => `${(Math.random() * 20 + 3).toFixed(1)}s`;
const randPos = i => ({
    x: Math.random() * 100 - 50,
    y: -5 - i * 3 + Math.random() * 8 - 4
});

const container = document.getElementById('waves-container');
const svgNS = "http://www.w3.org/2000/svg";

Array.from({ length: 20 }, (_, i) => {
    const { x, y } = randPos(i);
    const wave = {
        x,
        y,
        fill: randColor(),
        opacity: `${Math.floor(Math.random() * 70 + 5)}%`,
        duration: randDuration()
    };

    const use = document.createElementNS(svgNS, "use");
    use.setAttribute("href", "#wave");
    use.setAttribute("x", wave.x);
    use.setAttribute("y", wave.y);
    use.setAttribute("fill", wave.fill);
    use.setAttribute("opacity", wave.opacity);

    const animate = document.createElementNS(svgNS, "animateMotion");
    animate.setAttribute("dur", wave.duration);
    animate.setAttribute("repeatCount", "indefinite");
    const mpath = document.createElementNS(svgNS, "mpath");
    mpath.setAttribute("href", "#wave-path");

    animate.appendChild(mpath);
    use.appendChild(animate);
    container.appendChild(use);
});

// 加载动画控制
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }, 200);
});

// 弹出文字效果
const texts = [
    "AI技术正在改变世界", 
    "学习AI，拥抱未来", 
    "算法是AI的核心", 
    "深度学习推动技术进步", 
    "机器学习让生活更智能",
    "神经网络模拟人脑思维",
    "大数据是AI的燃料",
    "计算机视觉识别万物",
    "自然语言处理理解人类语言",
    "强化学习训练智能体"
];

document.onclick = function(e) {
    const span = document.createElement("span");
    span.className = "popup-text";
    span.style.left = e.clientX + "px";
    span.style.top = e.clientY + "px";
    span.innerHTML = texts[Math.floor(Math.random() * texts.length)];

    setTimeout(function() {
        span.style.opacity = "1";
        span.style.transform = "translateY(-100px)";
    }, 100);

    setTimeout(function() {
        span.style.opacity = "0";
        span.style.transform = "translateY(-230px)";
    }, 1500);

    const children = document.getElementsByClassName("popup-text");
    for(let i = 0; i < children.length; i++) {
        if(children[i].style.opacity === "0") {
            document.body.removeChild(children[i]);
        }
    }

    document.body.appendChild(span);
};

// CSS高级动效
const gridElement = document.getElementById('dynamicGrid');
let htmlCode = '';

for (let i = 0; i < 110; i++) {
    let rowStartDelay = -0.2 * Math.floor(i / 10);
    let delay = rowStartDelay + -0.22 * (i % 10);
    htmlCode += `<i style="--delay:${delay}s;"></i>`;
}

gridElement.innerHTML = htmlCode;

// 初始化星空
generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;