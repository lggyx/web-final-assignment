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

/**
 * 初始化书签功能
 * 为用户提供内容收藏和反馈机制
 */
function initBookmarks() {
    console.log('书签功能初始化中...');
    
    // 创建书签按钮
    const bookmarkButton = document.createElement('button');
    bookmarkButton.className = 'bookmark-button';
    bookmarkButton.innerHTML = `
        <span class="bookmark-icon">🔖</span>
        <span class="bookmark-text">我的书签</span>
    `;
    document.body.appendChild(bookmarkButton);
    
    // 创建书签面板
    const bookmarkPanel = document.createElement('div');
    bookmarkPanel.className = 'bookmark-panel';
    bookmarkPanel.style.display = 'none';
    bookmarkPanel.innerHTML = `
        <div class="bookmark-header">
            <h3>我的书签</h3>
            <button id="close-bookmark-panel">✕</button>
        </div>
        <div class="bookmark-list">
            <div class="empty-bookmarks">
                <p>暂无收藏内容</p>
                <p>点击页面中的收藏按钮添加书签</p>
            </div>
        </div>
        <div class="bookmark-actions">
            <button class="secondary" id="clear-all-bookmarks">清空全部</button>
        </div>
    `;
    document.body.appendChild(bookmarkPanel);
    
    // 书签按钮点击事件
    bookmarkButton.addEventListener('click', function() {
        const isVisible = bookmarkPanel.style.display === 'block';
        bookmarkPanel.style.display = isVisible ? 'none' : 'block';
        this.classList.toggle('active', !isVisible);
    });
    
    // 关闭书签面板
    document.getElementById('close-bookmark-panel').addEventListener('click', function() {
        bookmarkPanel.style.display = 'none';
        bookmarkButton.classList.remove('active');
    });
    
    // 清空全部书签
    document.getElementById('clear-all-bookmarks').addEventListener('click', function() {
        if (confirm('确定要清空所有书签吗？')) {
            localStorage.removeItem('aiBookmarks');
            updateBookmarkList();
            showNotification('所有书签已清空', 'success');
        }
    });
    
    // 为页面内容添加收藏按钮
    addBookmarkButtonsToContent();
    
    console.log('书签功能初始化完成');
}

/**
 * 为页面内容添加收藏按钮
 * 在每个章节标题旁添加收藏按钮
 */
function addBookmarkButtonsToContent() {
    const headings = document.querySelectorAll('main h2, main h3');
    
    headings.forEach(heading => {
        const bookmarkButton = document.createElement('button');
        bookmarkButton.className = 'page-bookmark-button';
        bookmarkButton.innerHTML = '🔖 收藏';
        bookmarkButton.setAttribute('data-section', heading.textContent);
        
        // 插入到标题旁边
        heading.style.display = 'inline-flex';
        heading.style.alignItems = 'center';
        heading.style.gap = '10px';
        heading.appendChild(bookmarkButton);
        
        // 收藏按钮点击事件
        bookmarkButton.addEventListener('click', function() {
            const sectionTitle = this.getAttribute('data-section');
            const pageTitle = document.title;
            const pageUrl = window.location.href;
            
            toggleBookmark(sectionTitle, pageTitle, pageUrl, this);
        });
        
        // 检查是否已收藏
        checkBookmarkStatus(bookmarkButton, heading.textContent);
    });
}

/**
 * 切换书签状态
 * 添加或移除书签
 */
function toggleBookmark(sectionTitle, pageTitle, pageUrl, button) {
    const bookmarks = getBookmarks();
    const bookmarkKey = `${pageTitle}-${sectionTitle}`;
    
    if (bookmarks[bookmarkKey]) {
        // 移除书签
        delete bookmarks[bookmarkKey];
        button.classList.remove('bookmarked');
        button.innerHTML = '🔖 收藏';
        showNotification('已取消收藏', 'info');
    } else {
        // 添加书签
        bookmarks[bookmarkKey] = {
            sectionTitle: sectionTitle,
            pageTitle: pageTitle,
            pageUrl: pageUrl,
            timestamp: new Date().toISOString()
        };
        button.classList.add('bookmarked');
        button.innerHTML = '⭐ 已收藏';
        showNotification('收藏成功', 'success');
    }
    
    // 保存到本地存储
    localStorage.setItem('aiBookmarks', JSON.stringify(bookmarks));
    
    // 更新书签列表
    updateBookmarkList();
}

/**
 * 检查书签状态
 * 根据本地存储数据设置按钮状态
 */
function checkBookmarkStatus(button, sectionTitle) {
    const bookmarks = getBookmarks();
    const pageTitle = document.title;
    const bookmarkKey = `${pageTitle}-${sectionTitle}`;
    
    if (bookmarks[bookmarkKey]) {
        button.classList.add('bookmarked');
        button.innerHTML = '⭐ 已收藏';
    }
}

/**
 * 获取所有书签
 * 从本地存储中读取书签数据
 */
function getBookmarks() {
    const bookmarksJson = localStorage.getItem('aiBookmarks');
    return bookmarksJson ? JSON.parse(bookmarksJson) : {};
}

/**
 * 更新书签列表显示
 * 动态生成书签列表内容
 */
function updateBookmarkList() {
    const bookmarkList = document.querySelector('.bookmark-list');
    const bookmarks = getBookmarks();
    const bookmarkKeys = Object.keys(bookmarks);
    
    if (bookmarkKeys.length === 0) {
        bookmarkList.innerHTML = `
            <div class="empty-bookmarks">
                <p>暂无收藏内容</p>
                <p>点击页面中的收藏按钮添加书签</p>
            </div>
        `;
    } else {
        let html = '';
        bookmarkKeys.forEach(key => {
            const bookmark = bookmarks[key];
            const time = new Date(bookmark.timestamp).toLocaleString('zh-CN');
            
            html += `
                <div class="bookmark-item">
                    <div class="bookmark-content">
                        <h4>${bookmark.sectionTitle}</h4>
                        <p class="bookmark-page">${bookmark.pageTitle}</p>
                        <p class="bookmark-time">${time}</p>
                    </div>
                    <div class="bookmark-actions">
                        <button class="visit-bookmark" onclick="window.location.href='${bookmark.pageUrl}'">访问</button>
                        <button class="remove-bookmark" onclick="removeBookmark('${key}')">删除</button>
                    </div>
                </div>
            `;
        });
        bookmarkList.innerHTML = html;
    }
    
    // 更新书签按钮状态
    updateBookmarkButtonStatus();
}

/**
 * 删除单个书签
 * 从书签列表中移除指定书签
 */
function removeBookmark(key) {
    const bookmarks = getBookmarks();
    delete bookmarks[key];
    localStorage.setItem('aiBookmarks', JSON.stringify(bookmarks));
    updateBookmarkList();
    showNotification('书签已删除', 'info');
}

/**
 * 更新书签按钮状态
 * 根据书签数量显示不同状态
 */
function updateBookmarkButtonStatus() {
    const bookmarkButton = document.querySelector('.bookmark-button');
    const bookmarks = getBookmarks();
    const hasBookmarks = Object.keys(bookmarks).length > 0;
    
    if (hasBookmarks) {
        bookmarkButton.classList.add('has-bookmarks');
    } else {
        bookmarkButton.classList.remove('has-bookmarks');
    }
}

/**
 * 显示通知
 * 为用户操作提供反馈
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `bookmark-notification bookmark-notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 3秒后隐藏并移除通知
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * 获取通知图标
 * 根据通知类型返回对应图标
 */
function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

// 在DOM加载完成后初始化书签功能
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化书签功能，确保其他模块已加载
    setTimeout(() => {
        initBookmarks();
    }, 100);
});

console.log('书签功能模块加载完成');

/**
 * 初始化学习进度跟踪功能
 * 为用户提供学习进度管理和个性化学习路径推荐
 */
function initProgressTracking() {
    console.log('学习进度跟踪功能初始化中...');
    
    // 检查是否已加载进度跟踪模块
    if (typeof initProgressTracking !== 'undefined') {
        // 延迟初始化，确保DOM完全加载
        setTimeout(() => {
            window.initProgressTracking();
        }, 200);
        console.log('学习进度跟踪功能初始化完成');
    } else {
        console.warn('学习进度跟踪模块未加载，请检查js/progress.js文件');
    }
}

// 在DOM加载完成后初始化学习进度跟踪功能
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化学习进度跟踪功能
    setTimeout(() => {
        initProgressTracking();
    }, 150);
});

console.log('学习进度跟踪功能模块加载完成');