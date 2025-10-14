// 星空背景动画
class Starfield {
    constructor() {
        this.canvas = document.getElementById('starCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createStars();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        const starCount = Math.min(1000, Math.floor((this.canvas.width * this.canvas.height) / 1000));
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.05 + 0.01,
                brightness: Math.random() * 0.5 + 0.5,
                twinkleSpeed: Math.random() * 0.02 + 0.005
            });
        }
    }

    animate() {
        // 清空画布
        this.ctx.fillStyle = 'rgba(10, 10, 30, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制星星
        this.stars.forEach(star => {
            // 更新星星位置（视差效果）
            star.y += star.speed;
            
            // 闪烁效果
            star.brightness = 0.5 + Math.sin(Date.now() * star.twinkleSpeed) * 0.3;
            
            // 如果星星移出屏幕底部，则从顶部重新出现
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            
            // 绘制星星
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化星空背景
document.addEventListener('DOMContentLoaded', () => {
    new Starfield();
});