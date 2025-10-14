// 主JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 为所有页面添加通用功能
    console.log('AI Share Platform loaded');
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
});

// 页面加载完成后隐藏加载动画
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1000);
});