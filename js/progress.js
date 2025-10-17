/**
 * 大学生AI技术分享网站 - 学习进度跟踪模块
 * 功能：跟踪用户学习进度，提供个性化学习建议和进度管理
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// 学习进度跟踪系统主函数
function initProgressTracking() {
    console.log('学习进度跟踪系统初始化中...');
    
    // 初始化学习进度数据
    initProgressData();
    
    // 创建进度跟踪界面
    createProgressInterface();
    
    // 设置页面访问跟踪
    setupPageTracking();
    
    // 初始化个性化推荐
    initPersonalizedRecommendations();
    
    console.log('学习进度跟踪系统初始化完成');
}

/**
 * 初始化学习进度数据
 * 从本地存储加载或创建默认进度数据
 */
function initProgressData() {
    let progressData = localStorage.getItem('aiLearningProgress');
    
    if (!progressData) {
        // 创建默认进度数据结构
        progressData = {
            userId: generateUserId(),
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            totalStudyTime: 0,
            pagesVisited: {},
            quizScores: {},
            bookmarks: 0,
            learningGoals: [],
            currentLevel: 'beginner',
            achievements: [],
            preferences: {
                learningStyle: 'visual', // visual, auditory, reading, kinesthetic
                difficulty: 'medium', // easy, medium, hard
                focusAreas: ['ai-basics', 'machine-learning', 'deep-learning']
            }
        };
        
        localStorage.setItem('aiLearningProgress', JSON.stringify(progressData));
    }
    
    return JSON.parse(progressData);
}

/**
 * 生成唯一用户ID
 */
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

/**
 * 创建进度跟踪界面
 * 在页面右下角显示学习进度面板
 */
function createProgressInterface() {
    // 创建进度按钮
    const progressButton = document.createElement('button');
    progressButton.id = 'progress-button';
    progressButton.innerHTML = `
        <span class="progress-icon">📊</span>
        <span class="progress-text">学习进度</span>
    `;
    document.body.appendChild(progressButton);
    
    // 创建进度面板
    const progressPanel = document.createElement('div');
    progressPanel.id = 'progress-panel';
    progressPanel.style.display = 'none';
    progressPanel.innerHTML = `
        <div class="progress-header">
            <h3>学习进度跟踪</h3>
            <button id="close-progress-panel">✕</button>
        </div>
        <div class="progress-content">
            <!-- 学习概览 -->
            <div class="progress-overview">
                <h4>学习概览</h4>
                <div class="overview-stats">
                    <div class="stat-item">
                        <span class="stat-value" id="total-study-time">0</span>
                        <span class="stat-label">总学习时间</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value" id="pages-completed">0</span>
                        <span class="stat-label">已学页面</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value" id="quiz-score">0%</span>
                        <span class="stat-label">平均得分</span>
                    </div>
                </div>
            </div>
            
            <!-- 学习进度条 -->
            <div class="progress-bars">
                <h4>各章节进度</h4>
                <div class="progress-bar-container">
                    <div class="progress-bar-item">
                        <span class="bar-label">AI基础概念</span>
                        <div class="progress-bar">
                            <div class="progress-fill" data-progress="0" style="width: 0%"></div>
                        </div>
                        <span class="progress-percentage">0%</span>
                    </div>
                    <div class="progress-bar-item">
                        <span class="bar-label">机器学习</span>
                        <div class="progress-bar">
                            <div class="progress-fill" data-progress="0" style="width: 0%"></div>
                        </div>
                        <span class="progress-percentage">0%</span>
                    </div>
                    <div class="progress-bar-item">
                        <span class="bar-label">深度学习</span>
                        <div class="progress-bar">
                            <div class="progress-fill" data-progress="0" style="width: 0%"></div>
                        </div>
                        <span class="progress-percentage">0%</span>
                    </div>
                    <div class="progress-bar-item">
                        <span class="bar-label">AI应用案例</span>
                        <div class="progress-bar">
                            <div class="progress-fill" data-progress="0" style="width: 0%"></div>
                        </div>
                        <span class="progress-percentage">0%</span>
                    </div>
                </div>
            </div>
            
            <!-- 学习目标 -->
            <div class="learning-goals">
                <h4>学习目标</h4>
                <div class="goals-list">
                    <div class="goal-item">
                        <input type="checkbox" id="goal-basics" class="goal-checkbox">
                        <label for="goal-basics">完成AI基础概念学习</label>
                    </div>
                    <div class="goal-item">
                        <input type="checkbox" id="goal-ml" class="goal-checkbox">
                        <label for="goal-ml">掌握机器学习基础</label>
                    </div>
                    <div class="goal-item">
                        <input type="checkbox" id="goal-dl" class="goal-checkbox">
                        <label for="goal-dl">理解深度学习原理</label>
                    </div>
                    <div class="goal-item">
                        <input type="checkbox" id="goal-applications" class="goal-checkbox">
                        <label for="goal-applications">了解AI应用案例</label>
                    </div>
                </div>
            </div>
            
            <!-- 个性化推荐 -->
            <div class="personalized-recommendations">
                <h4>个性化推荐</h4>
                <div class="recommendations-list" id="recommendations-list">
                    <p class="no-recommendations">根据您的学习进度生成个性化推荐...</p>
                </div>
            </div>
            
            <!-- 学习统计 -->
            <div class="learning-stats">
                <h4>学习统计</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-icon">📚</span>
                        <span class="stat-number" id="total-pages">0</span>
                        <span class="stat-desc">总访问页面</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-number" id="total-bookmarks">0</span>
                        <span class="stat-desc">收藏内容</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-number" id="goals-achieved">0</span>
                        <span class="stat-desc">完成目标</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">🏆</span>
                        <span class="stat-number" id="achievements-earned">0</span>
                        <span class="stat-desc">获得成就</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="progress-actions">
            <button id="export-progress" class="secondary">导出进度</button>
            <button id="reset-progress" class="danger">重置进度</button>
        </div>
    `;
    document.body.appendChild(progressPanel);
    
    // 绑定进度面板事件
    bindProgressPanelEvents();
    
    // 更新进度显示
    updateProgressDisplay();
}

/**
 * 绑定进度面板事件
 */
function bindProgressPanelEvents() {
    // 进度按钮点击事件
    document.getElementById('progress-button').addEventListener('click', function() {
        const progressPanel = document.getElementById('progress-panel');
        const isVisible = progressPanel.style.display === 'block';
        progressPanel.style.display = isVisible ? 'none' : 'block';
        this.classList.toggle('active', !isVisible);
        
        if (!isVisible) {
            updateProgressDisplay();
        }
    });
    
    // 关闭进度面板
    document.getElementById('close-progress-panel').addEventListener('click', function() {
        document.getElementById('progress-panel').style.display = 'none';
        document.getElementById('progress-button').classList.remove('active');
    });
    
    // 导出进度
    document.getElementById('export-progress').addEventListener('click', exportProgressData);
    
    // 重置进度
    document.getElementById('reset-progress').addEventListener('click', function() {
        if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
            resetProgressData();
            updateProgressDisplay();
            showProgressNotification('学习进度已重置', 'info');
        }
    });
    
    // 学习目标复选框事件
    const goalCheckboxes = document.querySelectorAll('.goal-checkbox');
    goalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateLearningGoals(this.id, this.checked);
        });
    });
}

/**
 * 设置页面访问跟踪
 * 记录用户在页面的停留时间和访问情况
 */
function setupPageTracking() {
    const pageUrl = window.location.pathname;
    const pageTitle = document.title;
    
    // 记录页面访问
    recordPageVisit(pageUrl, pageTitle);
    
    // 设置学习时间跟踪
    let startTime = Date.now();
    let totalTime = 0;
    
    // 页面可见性变化时记录时间
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面不可见，记录学习时间
            totalTime += Date.now() - startTime;
            updateStudyTime(totalTime);
        } else {
            // 页面重新可见，重置开始时间
            startTime = Date.now();
        }
    });
    
    // 页面卸载时保存学习时间
    window.addEventListener('beforeunload', function() {
        totalTime += Date.now() - startTime;
        updateStudyTime(totalTime);
    });
}

/**
 * 记录页面访问
 */
function recordPageVisit(pageUrl, pageTitle) {
    const progressData = initProgressData();
    const pageKey = pageUrl.replace(/\.html$/, '').replace(/^\//, '') || 'index';
    
    if (!progressData.pagesVisited[pageKey]) {
        progressData.pagesVisited[pageKey] = {
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            visitCount: 1,
            totalTime: 0,
            completed: false
        };
    } else {
        progressData.pagesVisited[pageKey].lastVisit = new Date().toISOString();
        progressData.pagesVisited[pageKey].visitCount++;
    }
    
    progressData.lastUpdated = new Date().toISOString();
    localStorage.setItem('aiLearningProgress', JSON.stringify(progressData));
}

/**
 * 更新学习时间
 */
function updateStudyTime(timeSpent) {
    const progressData = initProgressData();
    const pageKey = window.location.pathname.replace(/\.html$/, '').replace(/^\//, '') || 'index';
    
    if (progressData.pagesVisited[pageKey]) {
        progressData.pagesVisited[pageKey].totalTime += timeSpent;
    }
    
    progressData.totalStudyTime += timeSpent;
    progressData.lastUpdated = new Date().toISOString();
    localStorage.setItem('aiLearningProgress', JSON.stringify(progressData));
}

/**
 * 更新进度显示
 * 刷新进度面板中的统计数据
 */
function updateProgressDisplay() {
    const progressData = initProgressData();
    
    // 更新学习概览
    document.getElementById('total-study-time').textContent = 
        formatStudyTime(progressData.totalStudyTime);
    document.getElementById('pages-completed').textContent = 
        Object.keys(progressData.pagesVisited).length;
    
    // 更新章节进度条
    updateChapterProgress(progressData);
    
    // 更新学习目标状态
    updateGoalsStatus(progressData);
    
    // 更新学习统计
    updateLearningStats(progressData);
    
    // 更新个性化推荐
    updatePersonalizedRecommendations(progressData);
}

/**
 * 格式化学习时间
 */
function formatStudyTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}小时${minutes}分钟`;
    } else {
        return `${minutes}分钟`;
    }
}

/**
 * 更新章节进度
 */
function updateChapterProgress(progressData) {
    const chapters = {
        'index': { label: 'AI基础概念', weight: 0.2 },
        'ai-basics': { label: 'AI基础概念', weight: 0.2 },
        'machine-learning': { label: '机器学习', weight: 0.3 },
        'deep-learning': { label: '深度学习', weight: 0.3 },
        'ai-applications': { label: 'AI应用案例', weight: 0.2 }
    };
    
    Object.keys(chapters).forEach(chapter => {
        const progress = calculateChapterProgress(chapter, progressData);
        const progressFill = document.querySelector(`.progress-fill[data-progress="${chapter}"]`);
        const percentage = document.querySelector(`.progress-bar-item:nth-child(${Object.keys(chapters).indexOf(chapter) + 1}) .progress-percentage`);
        
        if (progressFill && percentage) {
            progressFill.style.width = `${progress}%`;
            progressFill.setAttribute('data-progress', progress);
            percentage.textContent = `${Math.round(progress)}%`;
        }
    });
}

/**
 * 计算章节进度
 */
function calculateChapterProgress(chapter, progressData) {
    const pageData = progressData.pagesVisited[chapter];
    if (!pageData) return 0;
    
    // 基于访问次数、停留时间和完成状态计算进度
    let progress = 0;
    
    // 访问次数权重 (30%)
    progress += Math.min(pageData.visitCount * 10, 30);
    
    // 学习时间权重 (40%)
    const timeWeight = Math.min(pageData.totalTime / (1000 * 60 * 10), 1) * 40; // 每10分钟为完整学习
    progress += timeWeight;
    
    // 完成状态权重 (30%)
    if (pageData.completed) {
        progress += 30;
    }
    
    return Math.min(progress, 100);
}

/**
 * 更新学习目标状态
 */
function updateGoalsStatus(progressData) {
    const goals = {
        'goal-basics': ['index', 'ai-basics'],
        'goal-ml': ['machine-learning'],
        'goal-dl': ['deep-learning'],
        'goal-applications': ['ai-applications']
    };
    
    Object.keys(goals).forEach(goalId => {
        const checkbox = document.getElementById(goalId);
        if (checkbox) {
            const chapterKeys = goals[goalId];
            const completed = chapterKeys.every(chapter => {
                const pageData = progressData.pagesVisited[chapter];
                return pageData && pageData.completed;
            });
            
            checkbox.checked = completed;
            checkbox.disabled = completed;
        }
    });
}

/**
 * 更新学习统计
 */
function updateLearningStats(progressData) {
    document.getElementById('total-pages').textContent = Object.keys(progressData.pagesVisited).length;
    document.getElementById('total-bookmarks').textContent = progressData.bookmarks || 0;
    
    // 计算完成的目标数量
    const completedGoals = Object.keys(progressData.learningGoals || {}).filter(
        goal => progressData.learningGoals[goal]
    ).length;
    document.getElementById('goals-achieved').textContent = completedGoals;
    
    document.getElementById('achievements-earned').textContent = progressData.achievements.length;
}

/**
 * 初始化个性化推荐
 */
function initPersonalizedRecommendations() {
    // 基于用户学习数据生成初始推荐
    generateRecommendations();
}

/**
 * 更新个性化推荐
 */
function updatePersonalizedRecommendations(progressData) {
    const recommendationsList = document.getElementById('recommendations-list');
    
    if (Object.keys(progressData.pagesVisited).length === 0) {
        recommendationsList.innerHTML = '<p class="no-recommendations">开始学习AI基础概念，建立扎实的知识基础！</p>';
        return;
    }
    
    const recommendations = generateRecommendations(progressData);
    let html = '';
    
    recommendations.forEach(rec => {
        html += `
            <div class="recommendation-item">
                <span class="rec-icon">${rec.icon}</span>
                <div class="rec-content">
                    <strong>${rec.title}</strong>
                    <p>${rec.description}</p>
                    ${rec.action ? `<button class="rec-action" onclick="${rec.action}">${rec.buttonText}</button>` : ''}
                </div>
            </div>
        `;
    });
    
    recommendationsList.innerHTML = html;
}

/**
 * 生成个性化推荐
 */
function generateRecommendations(progressData) {
    const recommendations = [];
    
    // 基于学习进度生成推荐
    if (!progressData.pagesVisited['ai-basics']) {
        recommendations.push({
            icon: '📖',
            title: '学习AI基础概念',
            description: '建议先学习AI的基本定义和发展历程',
            action: "window.location.href='ai-basics.html'",
            buttonText: '开始学习'
        });
    }
    
    // 基于学习时间推荐
    if (progressData.totalStudyTime < 1000 * 60 * 30) { // 少于30分钟
        recommendations.push({
            icon: '⏱️',
            title: '增加学习时间',
            description: '建议每天至少学习30分钟以获得更好的效果',
            buttonText: '继续学习'
        });
    }
    
    // 基于完成度推荐
    const completedChapters = Object.keys(progressData.pagesVisited).filter(
        chapter => progressData.pagesVisited[chapter].completed
    ).length;
    
    if (completedChapters >= 3) {
        recommendations.push({
            icon: '🏆',
            title: '学习成就',
            description: '您已经完成了多个章节的学习，继续保持！',
            buttonText: '查看成就'
        });
    }
    
    return recommendations.slice(0, 3); // 最多显示3条推荐
}

/**
 * 导出进度数据
 */
function exportProgressData() {
    const progressData = initProgressData();
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `ai-learning-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showProgressNotification('学习进度数据已导出', 'success');
}

/**
 * 重置进度数据
 */
function resetProgressData() {
    localStorage.removeItem('aiLearningProgress');
    initProgressData(); // 重新初始化默认数据
}

/**
 * 更新学习目标
 */
function updateLearningGoals(goalId, completed) {
    const progressData = initProgressData();
    
    if (!progressData.learningGoals) {
        progressData.learningGoals = {};
    }
    
    progressData.learningGoals[goalId] = completed;
    progressData.lastUpdated = new Date().toISOString();
    localStorage.setItem('aiLearningProgress', JSON.stringify(progressData));
}

/**
 * 显示进度通知
 */
function showProgressNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `progress-notification progress-notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getProgressNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
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
 * 获取进度通知图标
 */
function getProgressNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

// 在DOM加载完成后初始化进度跟踪系统
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initProgressTracking();
    }, 100);
});

console.log('学习进度跟踪模块加载完成');