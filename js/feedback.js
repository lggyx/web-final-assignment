/**
 * 大学生AI技术分享网站 - 用户反馈系统模块
 * 功能：收集用户反馈、评价和建议，提升网站体验
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// 用户反馈系统主函数
function initFeedbackSystem() {
    console.log('用户反馈系统初始化中...');
    
    // 创建反馈按钮
    createFeedbackButton();
    
    // 创建反馈表单
    createFeedbackForm();
    
    // 初始化评分系统
    initRatingSystem();
    
    console.log('用户反馈系统初始化完成');
}

/**
 * 创建反馈按钮
 * 在页面右下角显示反馈按钮
 */
function createFeedbackButton() {
    const feedbackButton = document.createElement('button');
    feedbackButton.id = 'feedback-button';
    feedbackButton.innerHTML = `
        <span class="feedback-icon">💬</span>
        <span class="feedback-text">意见反馈</span>
    `;
    document.body.appendChild(feedbackButton);
    
    // 反馈按钮点击事件
    feedbackButton.addEventListener('click', function() {
        const feedbackForm = document.getElementById('feedback-form');
        if (feedbackForm) {
            const isVisible = feedbackForm.style.display === 'block';
            feedbackForm.style.display = isVisible ? 'none' : 'block';
            this.classList.toggle('active', !isVisible);
        }
    });
}

/**
 * 创建反馈表单
 * 包含多种反馈类型的表单
 */
function createFeedbackForm() {
    const feedbackForm = document.createElement('div');
    feedbackForm.id = 'feedback-form';
    feedbackForm.style.display = 'none';
    feedbackForm.innerHTML = `
        <div class="feedback-header">
            <h3>意见反馈</h3>
            <button id="close-feedback-form">✕</button>
        </div>
        <div class="feedback-content">
            <!-- 反馈类型选择 -->
            <div class="feedback-type-selector">
                <label>反馈类型：</label>
                <div class="feedback-types">
                    <button class="feedback-type active" data-type="suggestion">建议</button>
                    <button class="feedback-type" data-type="bug">问题报告</button>
                    <button class="feedback-type" data-type="praise">表扬</button>
                    <button class="feedback-type" data-type="other">其他</button>
                </div>
            </div>
            
            <!-- 评分系统 -->
            <div class="rating-section">
                <label>网站评分：</label>
                <div class="star-rating">
                    <span class="star" data-rating="1">★</span>
                    <span class="star" data-rating="2">★</span>
                    <span class="star" data-rating="3">★</span>
                    <span class="star" data-rating="4">★</span>
                    <span class="star" data-rating="5">★</span>
                </div>
                <div class="rating-text">
                    <span id="rating-description">请选择评分</span>
                </div>
            </div>
            
            <!-- 反馈内容 -->
            <div class="feedback-input-section">
                <label for="feedback-content">反馈内容：</label>
                <textarea 
                    id="feedback-content" 
                    placeholder="请详细描述您的反馈内容，这将帮助我们改进网站..."
                    rows="5"
                ></textarea>
                <div class="character-count">
                    <span id="char-count">0</span>/500
                </div>
            </div>
            
            <!-- 联系方式（可选） -->
            <div class="contact-section">
                <label for="contact-info">联系方式（可选）：</label>
                <input 
                    type="text" 
                    id="contact-info" 
                    placeholder="邮箱或微信号，方便我们回复您"
                />
            </div>
            
            <!-- 提交按钮 -->
            <div class="feedback-actions">
                <button id="submit-feedback" class="primary">提交反馈</button>
                <button id="cancel-feedback" class="secondary">取消</button>
            </div>
        </div>
    `;
    document.body.appendChild(feedbackForm);
    
    // 绑定表单事件
    bindFeedbackFormEvents();
}

/**
 * 绑定反馈表单事件
 */
function bindFeedbackFormEvents() {
    // 关闭表单
    document.getElementById('close-feedback-form').addEventListener('click', function() {
        document.getElementById('feedback-form').style.display = 'none';
        document.getElementById('feedback-button').classList.remove('active');
    });
    
    // 取消按钮
    document.getElementById('cancel-feedback').addEventListener('click', function() {
        document.getElementById('feedback-form').style.display = 'none';
        document.getElementById('feedback-button').classList.remove('active');
        resetFeedbackForm();
    });
    
    // 提交反馈
    document.getElementById('submit-feedback').addEventListener('click', submitFeedback);
    
    // 反馈类型选择
    const typeButtons = document.querySelectorAll('.feedback-type');
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 字符计数
    const textarea = document.getElementById('feedback-content');
    textarea.addEventListener('input', function() {
        const charCount = this.value.length;
        document.getElementById('char-count').textContent = charCount;
        
        if (charCount > 500) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
}

/**
 * 初始化评分系统
 */
function initRatingSystem() {
    const stars = document.querySelectorAll('.star-rating .star');
    let currentRating = 0;
    
    stars.forEach(star => {
        // 鼠标悬停效果
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        // 鼠标离开效果
        star.addEventListener('mouseleave', function() {
            highlightStars(currentRating);
        });
        
        // 点击选择评分
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateRatingDescription(currentRating);
        });
    });
    
    // 初始化评分描述
    updateRatingDescription(0);
}

/**
 * 高亮星星
 */
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffd700';
        } else {
            star.style.color = '#ddd';
        }
    });
}

/**
 * 更新评分描述
 */
function updateRatingDescription(rating) {
    const descriptions = {
        0: '请选择评分',
        1: '非常不满意',
        2: '不太满意',
        3: '一般',
        4: '满意',
        5: '非常满意'
    };
    
    document.getElementById('rating-description').textContent = descriptions[rating];
    highlightStars(rating);
}

/**
 * 提交反馈
 */
function submitFeedback() {
    const feedbackType = document.querySelector('.feedback-type.active').getAttribute('data-type');
    const rating = getCurrentRating();
    const content = document.getElementById('feedback-content').value.trim();
    const contactInfo = document.getElementById('contact-info').value.trim();
    
    // 验证反馈内容
    if (!content) {
        showFeedbackNotification('请填写反馈内容', 'error');
        return;
    }
    
    if (content.length > 500) {
        showFeedbackNotification('反馈内容不能超过500字', 'error');
        return;
    }
    
    // 收集反馈数据
    const feedbackData = {
        type: feedbackType,
        rating: rating,
        content: content,
        contactInfo: contactInfo,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent
    };
    
    // 保存到本地存储（模拟提交到服务器）
    saveFeedbackToStorage(feedbackData);
    
    // 显示成功消息
    showFeedbackNotification('感谢您的反馈！', 'success');
    
    // 重置表单
    resetFeedbackForm();
    
    // 关闭表单
    document.getElementById('feedback-form').style.display = 'none';
    document.getElementById('feedback-button').classList.remove('active');
}

/**
 * 获取当前评分
 */
function getCurrentRating() {
    const stars = document.querySelectorAll('.star-rating .star');
    let rating = 0;
    
    stars.forEach(star => {
        if (star.style.color === 'rgb(255, 215, 0)') {
            rating = Math.max(rating, parseInt(star.getAttribute('data-rating')));
        }
    });
    
    return rating;
}

/**
 * 保存反馈到本地存储
 */
function saveFeedbackToStorage(feedbackData) {
    let feedbacks = JSON.parse(localStorage.getItem('aiFeedbacks') || '[]');
    feedbacks.push(feedbackData);
    localStorage.setItem('aiFeedbacks', JSON.stringify(feedbacks));
    
    console.log('反馈已保存：', feedbackData);
}

/**
 * 重置反馈表单
 */
function resetFeedbackForm() {
    document.getElementById('feedback-content').value = '';
    document.getElementById('contact-info').value = '';
    document.getElementById('char-count').textContent = '0';
    updateRatingDescription(0);
    
    // 重置反馈类型为默认
    const typeButtons = document.querySelectorAll('.feedback-type');
    typeButtons.forEach(button => button.classList.remove('active'));
    document.querySelector('.feedback-type[data-type="suggestion"]').classList.add('active');
}

/**
 * 显示反馈通知
 */
function showFeedbackNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `feedback-notification feedback-notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getFeedbackNotificationIcon(type)}</span>
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
 * 获取反馈通知图标
 */
function getFeedbackNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

/**
 * 获取反馈统计数据
 * 用于管理员查看反馈情况
 */
function getFeedbackStats() {
    const feedbacks = JSON.parse(localStorage.getItem('aiFeedbacks') || '[]');
    
    const stats = {
        total: feedbacks.length,
        byType: {
            suggestion: 0,
            bug: 0,
            praise: 0,
            other: 0
        },
        averageRating: 0,
        recentFeedback: feedbacks.slice(-5) // 最近5条反馈
    };
    
    let totalRating = 0;
    
    feedbacks.forEach(feedback => {
        stats.byType[feedback.type]++;
        totalRating += feedback.rating;
    });
    
    stats.averageRating = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : 0;
    
    return stats;
}

// 在DOM加载完成后初始化反馈系统
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化反馈系统
    setTimeout(() => {
        initFeedbackSystem();
    }, 100);
});

console.log('用户反馈系统模块加载完成');