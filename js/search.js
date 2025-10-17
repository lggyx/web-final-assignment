/**
 * 大学生AI技术分享网站 - 搜索功能模块
 * 功能：实现网站内容搜索、过滤和快速导航
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// 网站内容索引数据
const searchIndex = [
    {
        id: 'ai-basics',
        title: 'AI基础概念',
        url: 'ai-basics.html',
        content: '人工智能基础概念、发展历程、主要分支和技术特征',
        tags: ['AI基础', '人工智能', '发展历史', '技术分支'],
        category: '基础概念'
    },
    {
        id: 'machine-learning',
        title: '机器学习',
        url: 'machine-learning.html',
        content: '机器学习基本原理、算法分类、工作流程和应用场景',
        tags: ['机器学习', '监督学习', '无监督学习', '强化学习', '算法'],
        category: '核心技术'
    },
    {
        id: 'deep-learning',
        title: '深度学习',
        url: 'deep-learning.html',
        content: '深度学习技术、神经网络架构、CNN、RNN、Transformer',
        tags: ['深度学习', '神经网络', 'CNN', 'RNN', 'Transformer'],
        category: '前沿技术'
    },
    {
        id: 'ai-applications',
        title: 'AI应用案例',
        url: 'ai-applications.html',
        content: '人工智能在各行业的实际应用案例和成功实践',
        tags: ['AI应用', '医疗AI', '金融AI', '教育AI', '工业AI'],
        category: '应用实践'
    },
    {
        id: 'learning-resources',
        title: '学习资源',
        url: 'learning-resources.html',
        content: 'AI学习资料、在线课程、书籍推荐和实践项目',
        tags: ['学习资源', '在线课程', '书籍推荐', '实践项目', '工具'],
        category: '学习资料'
    }
];

/**
 * 初始化搜索功能
 */
function initSearch() {
    console.log('初始化搜索功能...');
    
    // 创建搜索界面
    createSearchInterface();
    
    // 绑定搜索事件
    bindSearchEvents();
    
    // 初始化搜索索引
    buildSearchIndex();
}

/**
 * 创建搜索界面
 */
function createSearchInterface() {
    // 检查是否已存在搜索界面
    if (document.getElementById('search-container')) {
        return;
    }
    
    // 创建搜索容器
    const searchContainer = document.createElement('div');
    searchContainer.id = 'search-container';
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="search-input" placeholder="搜索AI相关内容..." aria-label="搜索内容">
            <button id="search-button" aria-label="搜索">
                <span>🔍</span>
            </button>
            <button id="clear-search" aria-label="清除搜索" style="display: none;">
                <span>✕</span>
            </button>
        </div>
        <div id="search-results" class="search-results" style="display: none;"></div>
        <div id="search-suggestions" class="search-suggestions" style="display: none;"></div>
    `;
    
    // 将搜索界面添加到页面头部
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(searchContainer);
    }
}

/**
 * 绑定搜索事件
 */
function bindSearchEvents() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchButton) return;
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value.trim());
    });
    
    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value.trim());
        }
    });
    
    // 输入框输入事件（实时搜索）
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        // 显示/隐藏清除按钮
        if (query.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
            hideSearchResults();
        }
        
        // 实时搜索建议
        if (query.length >= 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });
    
    // 清除按钮点击事件
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        this.style.display = 'none';
        hideSearchResults();
        hideSearchSuggestions();
        searchInput.focus();
    });
    
    // 点击页面其他区域隐藏搜索结果
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#search-container')) {
            hideSearchResults();
            hideSearchSuggestions();
        }
    });
}

/**
 * 执行搜索
 * @param {string} query - 搜索关键词
 */
function performSearch(query) {
    if (!query) {
        hideSearchResults();
        return;
    }
    
    console.log('执行搜索:', query);
    
    const results = searchContent(query);
    displaySearchResults(results, query);
}

/**
 * 搜索内容
 * @param {string} query - 搜索关键词
 * @returns {Array} 搜索结果
 */
function searchContent(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    searchIndex.forEach(item => {
        let score = 0;
        
        // 标题匹配（最高权重）
        if (item.title.toLowerCase().includes(lowerQuery)) {
            score += 10;
        }
        
        // 标签匹配（中等权重）
        const tagMatch = item.tags.some(tag => 
            tag.toLowerCase().includes(lowerQuery)
        );
        if (tagMatch) {
            score += 5;
        }
        
        // 内容匹配（低权重）
        if (item.content.toLowerCase().includes(lowerQuery)) {
            score += 2;
        }
        
        // 类别匹配
        if (item.category.toLowerCase().includes(lowerQuery)) {
            score += 3;
        }
        
        if (score > 0) {
            results.push({
                ...item,
                score: score
            });
        }
    });
    
    // 按分数排序
    return results.sort((a, b) => b.score - a.score);
}

/**
 * 显示搜索结果
 * @param {Array} results - 搜索结果
 * @param {string} query - 搜索关键词
 */
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <p>没有找到与 "<strong>${query}</strong>" 相关的内容</p>
                <p>建议尝试其他关键词或浏览以下分类：</p>
                <div class="suggestion-categories">
                    <button class="suggestion-category" data-category="基础概念">基础概念</button>
                    <button class="suggestion-category" data-category="核心技术">核心技术</button>
                    <button class="suggestion-category" data-category="前沿技术">前沿技术</button>
                    <button class="suggestion-category" data-category="应用实践">应用实践</button>
                </div>
            </div>
        `;
    } else {
        searchResults.innerHTML = `
            <div class="results-header">
                <p>找到 ${results.length} 个与 "<strong>${query}</strong>" 相关的结果</p>
            </div>
            <div class="results-list">
                ${results.map(result => `
                    <div class="search-result-item" data-url="${result.url}">
                        <h4>${highlightText(result.title, query)}</h4>
                        <p class="result-category">${result.category}</p>
                        <p class="result-content">${highlightText(result.content, query)}</p>
                        <div class="result-tags">
                            ${result.tags.map(tag => `
                                <span class="result-tag">${tag}</span>
                            `).join('')}
                        </div>
                        <a href="${result.url}" class="result-link">查看详情 →</a>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    searchResults.style.display = 'block';
    hideSearchSuggestions();
    
    // 绑定分类建议点击事件
    bindCategorySuggestions();
    
    // 绑定搜索结果点击事件
    bindResultClickEvents();
}

/**
 * 显示搜索建议
 * @param {string} query - 搜索关键词
 */
function showSearchSuggestions(query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions) return;
    
    const matchingTags = [];
    searchIndex.forEach(item => {
        item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(query.toLowerCase()) && 
                !matchingTags.includes(tag)) {
                matchingTags.push(tag);
            }
        });
    });
    
    if (matchingTags.length > 0) {
        suggestions.innerHTML = `
            <div class="suggestions-list">
                <p>热门标签：</p>
                ${matchingTags.slice(0, 5).map(tag => `
                    <button class="suggestion-tag" data-tag="${tag}">${tag}</button>
                `).join('')}
            </div>
        `;
        suggestions.style.display = 'block';
        
        // 绑定建议标签点击事件
        bindSuggestionClickEvents();
    }
}

/**
 * 隐藏搜索建议
 */
function hideSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}

/**
 * 隐藏搜索结果
 */
function hideSearchResults() {
    const results = document.getElementById('search-results');
    if (results) {
        results.style.display = 'none';
    }
}

/**
 * 高亮文本中的关键词
 * @param {string} text - 原始文本
 * @param {string} query - 搜索关键词
 * @returns {string} 高亮后的文本
 */
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 绑定分类建议点击事件
 */
function bindCategorySuggestions() {
    const categoryButtons = document.querySelectorAll('.suggestion-category');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            performSearch(category);
        });
    });
}

/**
 * 绑定建议标签点击事件
 */
function bindSuggestionClickEvents() {
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.getAttribute('data-tag');
            document.getElementById('search-input').value = tagText;
            performSearch(tagText);
        });
    });
}

/**
 * 绑定搜索结果点击事件
 */
function bindResultClickEvents() {
    const resultItems = document.querySelectorAll('.search-result-item');
    resultItems.forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            window.location.href = url;
        });
    });
}

/**
 * 构建搜索索引（预留扩展功能）
 */
function buildSearchIndex() {
    // 这里可以添加更复杂的搜索索引构建逻辑
    console.log('搜索索引构建完成，共索引', searchIndex.length, '个页面');
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSearch,
        performSearch,
        searchContent
    };
}

console.log('搜索功能模块加载完成');