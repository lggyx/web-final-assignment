// 主JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // 获取目标元素的ID（去除#前缀）
            const targetId = this.getAttribute('href').substring(1);
            
            // 如果href是#或者没有对应的目标元素，则不执行滚动
            if (targetId === '' || !document.getElementById(targetId)) {
                // 如果是外部链接或页面内锚点但目标不存在，允许默认行为
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                }
                return;
            }
            
            e.preventDefault();
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
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