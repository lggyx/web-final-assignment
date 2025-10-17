/**
 * 大学生AI技术分享网站 - 主JavaScript文件
 * 功能：实现网站交互效果和动态功能
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI技术分享网站 - JavaScript交互功能已加载');
    
    // 初始化所有交互功能
    initNavigation();
    initSmoothScroll();
    initCardHoverEffects();
    initScrollToTop();
});

/**
 * 初始化导航栏功能
 * 实现滚动时导航栏高亮效果
 */
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');
    
    if (!header || navLinks.length === 0) return;
    
    // 滚动时添加/移除固定导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 导航链接高亮
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 初始化平滑滚动功能
 * 为所有内部链接添加平滑滚动效果
 */
function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 初始化卡片悬停效果
 * 为所有卡片添加交互动画
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .concept-card, .resource-card');
    
    cards.forEach(card => {
        // 鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        // 鼠标离开效果
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        // 点击效果
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

/**
 * 初始化返回顶部按钮
 * 滚动时显示/隐藏返回顶部按钮
 */
function initScrollToTop() {
    // 创建返回顶部按钮
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(scrollToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 工具函数：防抖函数
 * 防止频繁触发事件
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：节流函数
 * 控制事件触发频率
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('JavaScript交互功能模块加载完成');

/**
 * 初始化移动端菜单功能
 * 实现汉堡菜单的显示/隐藏功能
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    // 汉堡菜单点击事件
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // 切换汉堡菜单图标
        if (navLinks.classList.contains('active')) {
            this.innerHTML = '✕';
        } else {
            this.innerHTML = '☰';
        }
    });
    
    // 点击导航链接后关闭菜单（移动端）
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    });
    
    // 窗口大小改变时重置菜单状态
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
}

// 在DOM加载完成后初始化移动端菜单
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initInteractiveComponents();
    initSearchFunctionality();
});

/**
 * 初始化交互式组件功能
 * 包括测验、问答等交互元素
 */
function initInteractiveComponents() {
    console.log('初始化交互式组件...');
    
    // 初始化测验功能
    initQuizComponents();
    
    // 初始化问答功能
    initQnAComponents();
    
    // 初始化交互式图表
    initInteractiveCharts();
}

/**
 * 初始化测验组件
 * 处理测验题目的交互逻辑
 */
function initQuizComponents() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            const feedback = this.closest('.quiz-question').querySelector('.quiz-feedback');
            const allOptions = this.closest('.quiz-options').querySelectorAll('.quiz-option');
            
            // 重置所有选项状态
            allOptions.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.disabled = true;
            });
            
            // 设置当前选项状态
            if (isCorrect) {
                this.classList.add('correct');
                feedback.textContent = '✓ 回答正确！';
                feedback.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                feedback.textContent = '✗ 回答错误，请再试一次！';
                feedback.classList.add('incorrect');
                
                // 显示正确答案
                const correctOption = this.closest('.quiz-options').querySelector('[data-correct="true"]');
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
            }
        });
    });
}

/**
 * 初始化问答组件
 * 处理问答交互逻辑
 */
function initQnAComponents() {
    // 实现问答交互逻辑
    const qnaElements = document.querySelectorAll('.qna-item');
    
    qnaElements.forEach(item => {
        const question = item.querySelector('.qna-question');
        const answer = item.querySelector('.qna-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                question.classList.toggle('active');
            });
        }
    });
}

/**
 * 初始化交互式图表
 * 处理图表交互逻辑
 */
function initInteractiveCharts() {
    // 实现图表交互逻辑
    const chartElements = document.querySelectorAll('.interactive-chart');
    
    chartElements.forEach(chart => {
        const dataPoints = chart.querySelectorAll('.data-point');
        
        dataPoints.forEach(point => {
            point.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.zIndex = '10';
            });
            
            point.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            });
        });
    });
}

console.log('交互式组件功能模块加载完成');

/**
 * 初始化搜索功能
 */
function initSearchFunctionality() {
    // 检查是否已加载搜索模块
    if (typeof initSearch !== 'undefined') {
        initSearch();
        console.log('搜索功能初始化完成');
    } else {
        console.warn('搜索模块未加载，请检查js/search.js文件');
    }
}