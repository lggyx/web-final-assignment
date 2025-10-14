// 粒子背景效果
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        // 设置画布大小
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // 创建粒子
        this.createParticles();

        // 开始动画
        this.animate();

        // 将画布添加到页面
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 5000);
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
            });
        }
    }

    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            // 更新位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // 边界检查
            if (particle.x > this.canvas.width || particle.x < 0) {
                particle.speedX = -particle.speedX;
            }

            if (particle.y > this.canvas.height || particle.y < 0) {
                particle.speedY = -particle.speedY;
            }
        }
    }

    drawParticles() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制粒子
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        }

        // 绘制粒子之间的连线
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载完成后初始化粒子系统
document.addEventListener('DOMContentLoaded', function() {
    // 创建粒子系统
    new ParticleSystem();
});