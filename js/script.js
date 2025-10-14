// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    // 为每个导航链接添加点击事件监听器
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的活动状态
            navLinks.forEach(item => item.classList.remove('active'));
            
            // 为当前点击的链接添加活动状态
            this.classList.add('active');
            
            // 平滑滚动到目标部分
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 为CTA按钮添加点击事件
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // 滚动到技术部分
            const techSection = document.querySelector('#technologies');
            if (techSection) {
                window.scrollTo({
                    top: techSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // 添加滚动事件监听器，用于处理滚动时的导航栏效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        // 根据滚动位置更新活动导航项
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // 联系表单提交处理
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的留言！我们会尽快回复您。');
            this.reset();
        });
    }
});

// 页面加载完成后设置第一个导航项为活动状态
window.addEventListener('load', function() {
    const firstNavLink = document.querySelector('nav a');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
});