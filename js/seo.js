/**
 * SEO优化模块
 * 功能：提升网站在搜索引擎中的可见性
 * 作者：AI技术分享团队
 * 版本：1.0
 */

// 结构化数据（Schema.org）
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "大学生AI技术分享平台",
        "url": window.location.origin,
        "description": "面向大学生的AI技术学习分享网站，提供人工智能基础知识、机器学习、深度学习等学习资源",
        "publisher": {
            "@type": "Organization",
            "name": "AI技术分享团队",
            "logo": {
                "@type": "ImageObject",
                "url": window.location.origin + "/logo.png"
            }
        },
        "mainEntity": {
            "@type": "EducationalOrganization",
            "name": "大学生AI技术学习平台",
            "description": "帮助大学生学习人工智能技术的在线教育平台"
        }
    };

    // 创建结构化数据脚本
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// 面包屑导航结构化数据
function addBreadcrumbStructuredData() {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": getBreadcrumbItems()
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
}

// 获取面包屑导航项
function getBreadcrumbItems() {
    const path = window.location.pathname;
    const items = [];
    
    // 首页
    items.push({
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": window.location.origin
    });
    
    // 根据当前页面添加相应项
    if (path.includes('ai-basics')) {
        items.push({
            "@type": "ListItem",
            "position": 2,
            "name": "AI基础概念",
            "item": window.location.href
        });
    } else if (path.includes('machine-learning')) {
        items.push({
            "@type": "ListItem",
            "position": 2,
            "name": "机器学习",
            "item": window.location.href
        });
    } else if (path.includes('deep-learning')) {
        items.push({
            "@type": "ListItem",
            "position": 2,
            "name": "深度学习",
            "item": window.location.href
        });
    } else if (path.includes('ai-applications')) {
        items.push({
            "@type": "ListItem",
            "position": 2,
            "name": "AI应用案例",
            "item": window.location.href
        });
    } else if (path.includes('learning-resources')) {
        items.push({
            "@type": "ListItem",
            "position": 2,
            "name": "学习资源",
            "item": window.location.href
        });
    }
    
    return items;
}

// 页面标题优化
function optimizePageTitles() {
    const pageTitles = {
        'index.html': '大学生AI技术分享平台 - 人工智能学习资源',
        'ai-basics.html': 'AI基础概念 - 人工智能基础知识详解',
        'machine-learning.html': '机器学习教程 - 从入门到实践',
        'deep-learning.html': '深度学习指南 - 神经网络与AI技术',
        'ai-applications.html': 'AI应用案例 - 人工智能实际应用场景',
        'learning-resources.html': 'AI学习资源 - 推荐书籍、课程和工具'
    };
    
    const currentPage = window.location.pathname.split('/').pop();
    if (pageTitles[currentPage] && document.title === '大学生AI技术分享') {
        document.title = pageTitles[currentPage];
    }
}

// 元描述优化
function optimizeMetaDescriptions() {
    const metaDescriptions = {
        'index.html': '面向大学生的AI技术学习分享平台，提供系统的人工智能学习路径，包括AI基础概念、机器学习、深度学习等专业知识。',
        'ai-basics.html': '详细讲解人工智能的基础概念，包括AI发展历史、核心技术和应用领域，适合AI初学者系统学习。',
        'machine-learning.html': '全面的机器学习教程，涵盖监督学习、无监督学习、深度学习等核心算法和实际应用案例。',
        'deep-learning.html': '深度学习技术深度解析，包括神经网络原理、CNN、RNN、Transformer等先进模型和应用实践。',
        'ai-applications.html': '展示人工智能在各行业的实际应用案例，包括医疗、金融、教育、自动驾驶等领域。',
        'learning-resources.html': '精选AI学习资源推荐，包括优质书籍、在线课程、开发工具和实践项目，助力AI学习之路。'
    };
    
    const currentPage = window.location.pathname.split('/').pop();
    const description = metaDescriptions[currentPage];
    
    if (description) {
        // 更新或创建meta description标签
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;
    }
}

// 规范URL设置
function setCanonicalURL() {
    const canonicalURL = window.location.href.split('?')[0]; // 去除查询参数
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = canonicalURL;
}

// Open Graph标签设置
function setOpenGraphTags() {
    const ogTags = {
        'og:title': document.title,
        'og:type': 'website',
        'og:url': window.location.href,
        'og:description': getMetaDescription(),
        'og:site_name': '大学生AI技术分享平台',
        'og:locale': 'zh_CN'
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
        if (content) {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        }
    });
}

// 获取meta描述
function getMetaDescription() {
    const metaDesc = document.querySelector('meta[name="description"]');
    return metaDesc ? metaDesc.content : '面向大学生的AI技术学习分享平台';
}

// 初始化SEO优化功能
function initSEO() {
    console.log('SEO优化模块已加载');
    
    // 执行各项SEO优化
    addStructuredData();
    addBreadcrumbStructuredData();
    optimizePageTitles();
    optimizeMetaDescriptions();
    setCanonicalURL();
    setOpenGraphTags();
}

// DOM加载完成后初始化SEO优化
document.addEventListener('DOMContentLoaded', function() {
    initSEO();
});