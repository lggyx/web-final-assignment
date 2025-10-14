// 主要交互功能
document.addEventListener('DOMContentLoaded', function() {
    // CTA按钮点击效果
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('欢迎加入AI技术学习之旅！');
        });
    }

    // 导航链接悬停效果增强
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 页面点击产生动态文字效果
    document.body.addEventListener('click', function(e) {
        // 排除按钮和链接的点击
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            return;
        }

        createFloatingText(e.clientX, e.clientY);
    });

    // 创建浮动文字效果
    function createFloatingText(x, y) {
        const texts = ['AI', '学习', '探索', '创新', '未来'];
        const text = texts[Math.floor(Math.random() * texts.length)];
        
        const floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.style.position = 'fixed';
        floatingText.style.left = x + 'px';
        floatingText.style.top = y + 'px';
        floatingText.style.color = getRandomColor();
        floatingText.style.fontSize = (Math.random() * 20 + 20) + 'px';
        floatingText.style.pointerEvents = 'none';
        floatingText.style.zIndex = '1000';
        floatingText.style.userSelect = 'none';
        floatingText.style.opacity = '1';
        floatingText.style.transition = 'all 2s ease';
        
        document.body.appendChild(floatingText);
        
        // 添加动画效果
        setTimeout(() => {
            floatingText.style.opacity = '0';
            floatingText.style.transform = `translate(${Math.random() * 100 - 50}px, -100px)`;
        }, 10);
        
        // 删除元素
        setTimeout(() => {
            if (floatingText.parentNode) {
                floatingText.parentNode.removeChild(floatingText);
            }
        }, 2000);
    }

    // 获取随机颜色
    function getRandomColor() {
        const colors = ['#4cc9f0', '#4361ee', '#f72585', '#b5179e', '#7209b7', '#3a0ca3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
});