// 高级动画背景效果
class AnimatedBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.points = [];
        this.animationId = null;
        this.init();
    }

    init() {
        // 设置画布属性
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.pointerEvents = 'none';
        
        // 添加到页面
        document.body.appendChild(this.canvas);
        
        // 创建点
        this.createPoints();
        
        // 绑定事件
        window.addEventListener('resize', () => this.handleResize());
        
        // 开始动画
        this.animate();
    }

    createPoints() {
        this.points = [];
        const pointCount = Math.floor((this.width * this.height) / 10000);
        
        for (let i = 0; i < pointCount; i++) {
            this.points.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                originX: Math.random() * this.width,
                originY: Math.random() * this.height,
                radius: Math.random() * 2 + 1,
                speed: Math.random() * 0.05 + 0.01,
                angle: Math.random() * Math.PI * 2,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.createPoints();
    }

    updatePoints() {
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            
            // 更新角度
            point.angle += point.speed;
            
            // 创建波动效果
            point.x = point.originX + Math.sin(point.angle) * 20;
            point.y = point.originY + Math.cos(point.angle * 0.5) * 20;
        }
    }

    drawConnections() {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                const pointA = this.points[i];
                const pointB = this.points[j];
                
                // 计算距离
                const dx = pointA.x - pointB.x;
                const dy = pointA.y - pointB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // 如果距离小于阈值，绘制连线
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(pointA.x, pointA.y);
                    this.ctx.lineTo(pointB.x, pointB.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    drawPoints() {
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            
            // 绘制点
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = point.color;
            this.ctx.globalAlpha = point.opacity;
            this.ctx.fill();
        }
        
        // 重置透明度
        this.ctx.globalAlpha = 1;
    }

    animate() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // 更新和绘制
        this.updatePoints();
        this.drawConnections();
        this.drawPoints();
        
        // 继续动画循环
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// 初始化动画背景
document.addEventListener('DOMContentLoaded', function() {
    // 创建动画背景
    const animatedBackground = new AnimatedBackground();
    
    // 添加鼠标交互效果
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // 影响附近的点
        for (let i = 0; i < animatedBackground.points.length; i++) {
            const point = animatedBackground.points[i];
            const dx = point.x - mouseX;
            const dy = point.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (1 - distance / 150) * 10;
                point.originX += (mouseX - point.x) * force * 0.01;
                point.originY += (mouseY - point.y) * force * 0.01;
            }
        }
    });
});