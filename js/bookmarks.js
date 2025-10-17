/**
 * 大学生AI技术分享网站 - 书签功能模块
 * 功能：实现内容收藏、书签管理和快速访问
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// 书签存储键名
const BOOKMARKS_KEY = 'ai_learning_bookmarks';

/**
 * 初始化书签功能
 */
function initBookmarks() {
    console.log('初始化书签功能...');
    
    // 创建书签界面
    createBookmarkInterface();
    
    // 绑定书签事件
    bindBookmarkEvents();
    
    // 加载用户书签
    loadUserBookmarks();
    
    // 更新页面书签状态
    updatePageBookmarkStatus();
}

/**
 * 创建书签界面
 */
function createBookmarkInterface() {
    // 检查是否已存在书签按钮
    if (document.getElementById('bookmark-button')) {
        return;
    }
    
    // 创建书签按钮
    const bookmarkButton = document.createElement('button');
    bookmarkButton.id = 'bookmark-button';
    bookmarkButton.className = 'bookmark-button';
    bookmarkButton.setAttribute('aria-label', '收藏此页面');
    bookmarkButton.innerHTML = `
        <span class="bookmark-icon">🔖</span>
        <span class="bookmark-text">收藏</span>
    `;
    
    // 创建书签管理面板
    const bookmarkPanel = document.createElement('div');
    bookmarkPanel.id = 'bookmark-panel';
    bookmarkPanel.className = 'bookmark-panel';
    bookmarkPanel.style.display = 'none';
    bookmarkPanel.innerHTML = `
        <div class="bookmark-header">
            <h3>我的收藏</h3>
            <button id="close-bookmark-panel" aria-label="关闭收藏面板">✕</button>
        </div>
        <div class="bookmark-list" id="bookmark-list">
            <div class="empty-bookmarks">
                <p>暂无收藏内容</p>
                <p>点击页面上的收藏按钮添加内容到收藏夹</p>
            </div>
        </div>
        <div class="bookmark-actions">
            <button id="export-bookmarks" class="secondary">导出收藏</button>
            <button id="clear-bookmarks" class="danger">清空收藏</button>
        </div>
    `;
    
    // 将书签元素添加到页面
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(bookmarkButton);
        document.body.appendChild(bookmarkPanel);
    }
}

/**
 * 绑定书签事件
 */
function bindBookmarkEvents() {
    const bookmarkButton = document.getElementById('bookmark-button');
    const closePanelButton = document.getElementById('close-bookmark-panel');
    const exportButton = document.getElementById('export-bookmarks');
    const clearButton = document.getElementById('clear-bookmarks');
    
    if (!bookmarkButton) return;
    
    // 书签按钮点击事件
    bookmarkButton.addEventListener('click', function() {
        toggleBookmarkPanel();
    });
    
    // 关闭面板按钮
    if (closePanelButton) {
        closePanelButton.addEventListener('click', function() {
            hideBookmarkPanel();
        });
    }
    
    // 导出收藏按钮
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportBookmarks();
        });
    }
    
    // 清空收藏按钮
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            clearBookmarks();
        });
    }
    
    // 点击页面其他区域关闭面板
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#bookmark-button') && 
            !e.target.closest('#bookmark-panel')) {
            hideBookmarkPanel();
        }
    });
    
    // 绑定页面收藏按钮事件
    bindPageBookmarkButtons();
}

/**
 * 切换书签面板显示状态
 */
function toggleBookmarkPanel() {
    const panel = document.getElementById('bookmark-panel');
    if (!panel) return;
    
    if (panel.style.display === 'none') {
        showBookmarkPanel();
    } else {
        hideBookmarkPanel();
    }
}

/**
 * 显示书签面板
 */
function showBookmarkPanel() {
    const panel = document.getElementById('bookmark-panel');
    const button = document.getElementById('bookmark-button');
    
    if (panel && button) {
        panel.style.display = 'block';
        button.classList.add('active');
        
        // 更新书签列表
        updateBookmarkList();
    }
}

/**
 * 隐藏书签面板
 */
function hideBookmarkPanel() {
    const panel = document.getElementById('bookmark-panel');
    const button = document.getElementById('bookmark-button');
    
    if (panel && button) {
        panel.style.display = 'none';
        button.classList.remove('active');
    }
}

/**
 * 绑定页面收藏按钮事件
 */
function bindPageBookmarkButtons() {
    // 为页面中的收藏按钮添加事件
    const bookmarkButtons = document.querySelectorAll('.page-bookmark-button');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section-id');
            const sectionTitle = this.getAttribute('data-section-title');
            toggleSectionBookmark(sectionId, sectionTitle);
        });
    });
}

/**
 * 切换章节书签状态
 * @param {string} sectionId - 章节ID
 * @param {string} sectionTitle - 章节标题
 */
function toggleSectionBookmark(sectionId, sectionTitle) {
    const bookmarks = getUserBookmarks();
    const currentPage = getCurrentPageInfo();
    
    const bookmarkKey = `${currentPage.url}#${sectionId}`;
    const existingIndex = bookmarks.findIndex(b => b.key === bookmarkKey);
    
    if (existingIndex > -1) {
        // 移除书签
        bookmarks.splice(existingIndex, 1);
        showBookmarkNotification('已从收藏中移除', 'info');
    } else {
        // 添加书签
        const newBookmark = {
            key: bookmarkKey,
            title: sectionTitle,
            pageTitle: currentPage.title,
            url: currentPage.url,
            sectionId: sectionId,
            timestamp: new Date().toISOString()
        };
        bookmarks.push(newBookmark);
        showBookmarkNotification('已添加到收藏', 'success');
    }
    
    // 保存书签
    saveUserBookmarks(bookmarks);
    
    // 更新书签状态
    updateBookmarkButtonState(bookmarkKey);
    updatePageBookmarkStatus();
}

/**
 * 获取当前页面信息
 * @returns {Object} 页面信息
 */
function getCurrentPageInfo() {
    return {
        title: document.title,
        url: window.location.pathname.split('/').pop() || 'index.html'
    };
}

/**
 * 获取用户书签
 * @returns {Array} 书签数组
 */
function getUserBookmarks() {
    try {
        const stored = localStorage.getItem(BOOKMARKS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('获取书签数据失败:', error);
        return [];
    }
}

/**
 * 保存用户书签
 * @param {Array} bookmarks - 书签数组
 */
function saveUserBookmarks(bookmarks) {
    try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('保存书签数据失败:', error);
    }
}

/**
 * 更新书签列表显示
 */
function updateBookmarkList() {
    const bookmarkList = document.getElementById('bookmark-list');
    const bookmarks = getUserBookmarks();
    
    if (!bookmarkList) return;
    
    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = `
            <div class="empty-bookmarks">
                <p>暂无收藏内容</p>
                <p>点击页面上的收藏按钮添加内容到收藏夹</p>
            </div>
        `;
    } else {
        bookmarkList.innerHTML = bookmarks.map(bookmark => `
            <div class="bookmark-item" data-key="${bookmark.key}">
                <div class="bookmark-content">
                    <h4>${escapeHtml(bookmark.title)}</h4>
                    <p class="bookmark-page">${escapeHtml(bookmark.pageTitle)}</p>
                    <p class="bookmark-time">${formatDate(bookmark.timestamp)}</p>
                </div>
                <div class="bookmark-actions">
                    <button class="visit-bookmark" data-url="${bookmark.url}" data-section="${bookmark.sectionId}">访问</button>
                    <button class="remove-bookmark" data-key="${bookmark.key}">删除</button>
                </div>
            </div>
        `).join('');
        
        // 绑定书签项事件
        bindBookmarkItemEvents();
    }
}

/**
 * 绑定书签项事件
 */
function bindBookmarkItemEvents() {
    // 访问书签按钮
    const visitButtons = document.querySelectorAll('.visit-bookmark');
    visitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            const sectionId = this.getAttribute('data-section');
            visitBookmark(url, sectionId);
        });
    });
    
    // 删除书签按钮
    const removeButtons = document.querySelectorAll('.remove-bookmark');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
            removeBookmark(key);
        });
    });
}

/**
 * 访问书签
 * @param {string} url - 页面URL
 * @param {string} sectionId - 章节ID
 */
function visitBookmark(url, sectionId) {
    if (window.location.pathname.endsWith(url)) {
        // 当前页面，滚动到对应章节
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // 跳转到其他页面
        window.location.href = `${url}#${sectionId}`;
    }
    hideBookmarkPanel();
}

/**
 * 移除书签
 * @param {string} key - 书签键名
 */
function removeBookmark(key) {
    const bookmarks = getUserBookmarks();
    const updatedBookmarks = bookmarks.filter(b => b.key !== key);
    saveUserBookmarks(updatedBookmarks);
    updateBookmarkList();
    showBookmarkNotification('书签已删除', 'info');
}

/**
 * 导出书签
 */
function exportBookmarks() {
    const bookmarks = getUserBookmarks();
    if (bookmarks.length === 0) {
        showBookmarkNotification('暂无书签可导出', 'warning');
        return;
    }
    
    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        bookmarks: bookmarks
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-learning-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showBookmarkNotification('书签导出成功', 'success');
}

/**
 * 清空书签
 */
function clearBookmarks() {
    if (confirm('确定要清空所有收藏吗？此操作不可撤销。')) {
        localStorage.removeItem(BOOKMARKS_KEY);
        updateBookmarkList();
        updatePageBookmarkStatus();
        showBookmarkNotification('所有收藏已清空', 'info');
    }
}

/**
 * 更新页面书签状态
 */
function updatePageBookmarkStatus() {
    const bookmarks = getUserBookmarks();
    const currentPage = getCurrentPageInfo();
    
    // 更新主书签按钮状态
    const hasBookmarks = bookmarks.some(b => b.url === currentPage.url);
    const bookmarkButton = document.getElementById('bookmark-button');
    if (bookmarkButton) {
        if (hasBookmarks) {
            bookmarkButton.classList.add('has-bookmarks');
        } else {
            bookmarkButton.classList.remove('has-bookmarks');
        }
    }
}

/**
 * 更新书签按钮状态
 * @param {string} bookmarkKey - 书签键名
 */
function updateBookmarkButtonState(bookmarkKey) {
    const bookmarks = getUserBookmarks();
    const isBookmarked = bookmarks.some(b => b.key === bookmarkKey);
    
    // 更新页面中的收藏按钮状态
    const bookmarkButtons = document.querySelectorAll(`[data-bookmark-key="${bookmarkKey}"]`);
    bookmarkButtons.forEach(button => {
        if (isBookmarked) {
            button.classList.add('bookmarked');
            button.innerHTML = '★ 已收藏';
        } else {
            button.classList.remove('bookmarked');
            button.innerHTML = '☆ 收藏';
        }
    });
}

/**
 * 显示书签通知
 * @param {string} message - 通知消息
 * @param {string} type - 通知类型
 */
function showBookmarkNotification(message, type) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `bookmark-notification bookmark-notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 自动隐藏
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
 * @param {string} type - 通知类型
 * @returns {string} 图标字符
 */
function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || 'ℹ';
}

/**
 * 转义HTML特殊字符
 * @param {string} text - 原始文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 格式化日期
 * @param {string} dateString - 日期字符串
 * @returns {string} 格式化后的日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBookmarks,
        toggleSectionBookmark,
        getUserBookmarks
    };
}

console.log('书签功能模块加载完成');