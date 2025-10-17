/**
 * 性能优化模块
 * 功能：优化网站加载速度和用户体验
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// 图片懒加载功能
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        // 使用Intersection Observer API实现懒加载
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // 回退方案：直接加载所有图片
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// 资源预加载功能
function preloadCriticalResources() {
    const criticalResources = [
        'css/styles.css',
        'js/main.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        if (resource.endsWith('.css')) {
            link.as = 'style';
        } else if (resource.endsWith('.js')) {
            link.as = 'script';
        }
        document.head.appendChild(link);
    });
}

// 滚动性能优化
function optimizeScrollPerformance() {
    // 使用节流函数优化滚动事件
    const throttledScroll = throttle(() => {
        // 滚动时的性能优化逻辑
        updateScrollIndicators();
    }, 16); // 约60fps
    
    window.addEventListener('scroll', throttledScroll);
}

// 更新滚动指示器
function updateScrollIndicators() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

// 创建滚动进度条
function createScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    progressContainer.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(progressContainer);
}

// 性能监控
function initPerformanceMonitoring() {
    // 监控关键性能指标
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`页面加载时间: ${loadTime}ms`);
            
            // 可以在这里发送性能数据到分析服务
            if (loadTime > 3000) {
                console.warn('页面加载时间较长，建议优化');
            }
        }, 0);
    });
}

// DOM加载完成后初始化性能优化功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('性能优化模块已加载');
    
    // 初始化各项性能优化功能
    initLazyLoading();
    preloadCriticalResources();
    optimizeScrollPerformance();
    createScrollProgress();
    initPerformanceMonitoring();
});

// 工具函数：节流函数
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