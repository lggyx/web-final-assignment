// 浩瀚星空背景效果
class StarryBackground {
    constructor() {
        // 定义星星的颜色（调整为更符合AI主题的蓝白色）
        this.STAR_COLOR = '#fff';
        // 定义星星的大小
        this.STAR_SIZE = 3;
        // 定义星星的最小缩放比例
        this.STAR_MIN_SCALE = 0.2;
        // 定义溢出阈值
        this.OVERFLOW_THRESHOLD = 50;
        // 定义星星的数量（根据屏幕尺寸调整）
        this.STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
        
        // 初始化变量
        this.canvas = null;
        this.context = null;
        this.scale = 1; // device pixel ratio
        this.width = 0;
        this.height = 0;
        this.stars = [];
        this.pointerX = null;
        this.pointerY = null;
        this.velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
        this.touchInput = false;
        
        // 初始化背景
        this.init();
    }
    
    init() {
        // 创建canvas元素
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'starry-background';
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        
        // 生成星星
        this.generate();
        // 调整大小
        this.resize();
        // 运行动画
        this.step();
        
        // 绑定事件
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.onMouseLeave());
        document.addEventListener('mouseleave', () => this.onMouseLeave());
    }
    
    // 生成星星
    generate() {
        for (let i = 0; i < this.STAR_COUNT; i++) {
            this.stars.push({
                x: 0,
                y: 0,
                z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE),
            });
        }
    }
    
    // 将星星放置到随机位置
    placeStar(star) {
        star.x = Math.random() * this.width;
        star.y = Math.random() * this.height;
    }
    
    // 回收星星并重新放置到新的位置
    recycleStar(star) {
        // 初始化方向为 'z'
        let direction = 'z';
        // 获取速度的绝对值
        let vx = Math.abs(this.velocity.x);
        let vy = Math.abs(this.velocity.y);
        // 如果速度的绝对值大于1，则根据速度的大小随机确定方向
        if (vx > 1 || vy > 1) {
            let axis;
            // 如果水平速度大于垂直速度，则根据水平速度的比例随机确定水平或垂直方向
            if (vx > vy) {
                axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
            } else {
                axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
            }
            // 根据方向确定具体的移动方向
            if (axis === 'h') {
                direction = this.velocity.x > 0 ? 'l' : 'r';
            } else {
                direction = this.velocity.y > 0 ? 't' : 'b';
            }
        }
        // 随机设置星星的缩放比例
        star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE);
        // 根据方向设置星星的位置
        if (direction === 'z') {
            // 如果方向为 'z'，则将星星放置在屏幕中心
            star.z = 0.1;
            star.x = Math.random() * this.width;
            star.y = Math.random() * this.height;
        } else if (direction === 'l') {
            // 如果方向为 'l'，则将星星放置在屏幕左侧
            star.x = -this.OVERFLOW_THRESHOLD;
            star.y = this.height * Math.random();
        } else if (direction === 'r') {
            // 如果方向为 'r'，则将星星放置在屏幕右侧
            star.x = this.width + this.OVERFLOW_THRESHOLD;
            star.y = this.height * Math.random();
        } else if (direction === 't') {
            // 如果方向为 't'，则将星星放置在屏幕顶部
            star.x = this.width * Math.random();
            star.y = -this.OVERFLOW_THRESHOLD;
        } else if (direction === 'b') {
            // 如果方向为 'b'，则将星星放置在屏幕底部
            star.x = this.width * Math.random();
            star.y = this.height + this.OVERFLOW_THRESHOLD;
        }
    }
    
    // 调整大小
    resize() {
        // 获取设备像素比例
        this.scale = window.devicePixelRatio || 1;
        // 设置画布的宽度和高度
        this.width = window.innerWidth * this.scale;
        this.height = window.innerHeight * this.scale;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // 将所有星星重新放置到屏幕上
        this.stars.forEach(star => this.placeStar(star));
    }
    
    // 动画的每一帧
    step() {
        // 清空画布
        this.context.clearRect(0, 0, this.width, this.height);
        // 更新星星的位置和速度
        this.update();
        // 绘制星星
        this.render();
        // 请求下一帧动画
        requestAnimationFrame(() => this.step());
    }
    
    // 更新星星的位置和速度
    update() {
        // 缓动速度
        this.velocity.tx *= 0.96;
        this.velocity.ty *= 0.96;
        // 更新速度
        this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8;
        this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8;
        // 遍历所有星星
        this.stars.forEach((star) => {
            // 根据速度和缩放比例更新星星的位置
            star.x += this.velocity.x * star.z;
            star.y += this.velocity.y * star.z;
            // 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
            star.x += (star.x - this.width / 2) * this.velocity.z * star.z;
            star.y += (star.y - this.height / 2) * this.velocity.z * star.z;
            // 更新星星的缩放比例
            star.z += this.velocity.z;
            // 如果星星超出屏幕范围，则重新放置到屏幕上
            if (
                star.x < -this.OVERFLOW_THRESHOLD ||
                star.x > this.width + this.OVERFLOW_THRESHOLD ||
                star.y < -this.OVERFLOW_THRESHOLD ||
                star.y > this.height + this.OVERFLOW_THRESHOLD
            ) {
                this.recycleStar(star);
            }
        });
    }
    
    // 绘制星星
    render() {
        // 遍历所有星星
        this.stars.forEach((star) => {
            // 设置绘制星星的样式
            this.context.beginPath();
            this.context.lineCap = 'round';
            this.context.lineWidth = this.STAR_SIZE * star.z * this.scale;
            this.context.globalAlpha = 0.5 + 0.5 * Math.random();
            this.context.strokeStyle = this.STAR_COLOR;
            // 绘制星星的路径
            this.context.beginPath();
            this.context.moveTo(star.x, star.y);
            // 计算星星的尾巴坐标
            let tailX = this.velocity.x * 2;
            let tailY = this.velocity.y * 2;
            // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
            if (Math.abs(tailX) < 0.1) tailX = 0.5;
            if (Math.abs(tailY) < 0.1) tailY = 0.5;
            // 绘制星星的尾巴
            this.context.lineTo(star.x + tailX, star.y + tailY);
            this.context.stroke();
        });
    }
    
    // 移动鼠标指针
    movePointer(x, y) {
        // 如果之前有记录鼠标指针的位置，则计算鼠标指针的移动距离，并更新速度
        if (typeof this.pointerX === 'number' && typeof this.pointerY === 'number') {
            let ox = x - this.pointerX;
            let oy = y - this.pointerY;
            this.velocity.tx = this.velocity.tx + (ox / 8) * this.scale * (this.touchInput ? 1 : -1);
            this.velocity.ty = this.velocity.ty + (oy / 8) * this.scale * (this.touchInput ? 1 : -1);
        }
        // 更新鼠标指针的位置
        this.pointerX = x;
        this.pointerY = y;
    }
    
    // 当鼠标在canvas上移动时的事件处理函数
    onMouseMove(event) {
        this.touchInput = false;
        this.movePointer(event.clientX, event.clientY);
    }
    
    // 当触摸屏在canvas上移动时的事件处理函数
    onTouchMove(event) {
        this.touchInput = true;
        this.movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
        event.preventDefault();
    }
    
    // 当鼠标离开canvas时的事件处理函数
    onMouseLeave() {
        this.pointerX = null;
        this.pointerY = null;
    }
}

// 页面加载完成后初始化星空背景
document.addEventListener('DOMContentLoaded', function() {
    window.starryBackground = new StarryBackground();
});