(() => {
    const latestArticleEntries = [
        {
            id: "campus-vision-lab",
            title: "用校园数据构建视觉识别实验室",
            summary: "基于校园景观数据集搭建计算机视觉训练管线，完成从采集、标注到模型部署的全流程实践。",
            publishDate: "2025-10-18",
            readTimeMinutes: 8,
            tags: ["计算机视觉", "数据工程"],
            link: "pages/article.html"
        },
        {
            id: "llm-study-group",
            title: "大型语言模型研习社：从提示词到微调",
            summary: "结合课程作业介绍如何围绕中文语料定制提示词策略，并完成一次轻量化微调实验。",
            publishDate: "2025-10-16",
            readTimeMinutes: 10,
            tags: ["自然语言处理", "Prompt 工程"],
            link: "pages/article.html"
        },
        {
            id: "ml-starter-kit",
            title: "机器学习入门套件：助教带你搭建第一个模型",
            summary: "面向零基础同学设计的学习路线，包含必修概念、工具清单与校园实战项目建议。",
            publishDate: "2025-10-13",
            readTimeMinutes: 7,
            tags: ["机器学习", "学习路线"],
            link: "pages/article.html"
        }
    ];

    const resourceCollections = [
        {
            id: "starter",
            title: "AI 基础起步",
            description: "掌握机器学习核心概念与编程基础，适用于刚接触 AI 的同学。",
            links: [
                { label: "Coursera 课程精选", url: "https://www.coursera.org/collections/machine-learning" },
                { label: "Python 数据科学入门", url: "https://www.kaggle.com/learn" },
                { label: "校内讲义下载", url: "#" }
            ]
        },
        {
            id: "builder",
            title: "项目实践指南",
            description: "精选校园开源项目案例，配套数据集、技术栈与部署方案。",
            links: [
                { label: "开源项目仓库", url: "https://github.com" },
                { label: "校园赛事案例库", url: "#" },
                { label: "模型部署手册", url: "https://vercel.com/guides" }
            ]
        },
        {
            id: "career",
            title: "职业发展与实习",
            description: "聚焦简历打磨、面试准备与顶尖实习资源，助你完成校招跃迁。",
            links: [
                { label: "AI 实习机会榜", url: "#" },
                { label: "面试题库", url: "https://leetcode.cn" },
                { label: "导师计划报名", url: "mailto:mentor@campusaihub.com" }
            ]
        }
    ];

    document.addEventListener("DOMContentLoaded", () => {
        initializeNavigation();
        populateLatestArticles();
        populateResourceCollections();
    });

    function initializeNavigation() {
        const navToggleButton = document.querySelector(".nav-toggle");
        const primaryNav = document.querySelector(".primary-nav");

        if (!navToggleButton || !primaryNav) {
            return;
        }

        const closeNavigation = () => {
            primaryNav.classList.remove("is-active");
            navToggleButton.setAttribute("aria-expanded", "false");
        };

        navToggleButton.addEventListener("click", () => {
            const isExpanded = navToggleButton.getAttribute("aria-expanded") === "true";
            const nextState = !isExpanded;
            navToggleButton.setAttribute("aria-expanded", String(nextState));
            primaryNav.classList.toggle("is-active", nextState);
        });

        document.addEventListener("click", (event) => {
            if (!primaryNav.classList.contains("is-active")) {
                return;
            }
            if (!(event.target instanceof Element)) {
                return;
            }
            const isInsideNav = primaryNav.contains(event.target) || navToggleButton.contains(event.target);
            if (!isInsideNav) {
                closeNavigation();
            }
        });

        // 添加键盘导航支持
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && primaryNav.classList.contains("is-active")) {
                closeNavigation();
                navToggleButton.focus();
            }
        });

        window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
            if (event.matches) {
                closeNavigation();
            }
        });
    }

    function populateLatestArticles() {
        const container = document.querySelector("#latest-articles");
        if (!container) {
            return;
        }
        container.innerHTML = "";

        simulateAsync(latestArticleEntries).then((articles) => {
            if (!Array.isArray(articles)) {
                throw new Error("数据格式错误");
            }
            articles.forEach((article) => {
                const card = assembleArticleCard(article);
                container.appendChild(card);
            });
        }).catch((error) => {
            console.error("加载文章失败:", error);
            const fallback = document.createElement("div");
            fallback.className = "empty-state";
            fallback.textContent = `加载最新分享时出现问题：${error instanceof Error ? error.message : "未知错误"}`;
            container.appendChild(fallback);
        });
    }

    function populateResourceCollections() {
        const container = document.querySelector("#resource-list");
        if (!container) {
            return;
        }
        container.innerHTML = "";

        simulateAsync(resourceCollections).then((resources) => {
            resources.forEach((resource) => {
                const card = assembleResourceCard(resource);
                container.appendChild(card);
            });
        }).catch((error) => {
            const fallback = document.createElement("div");
            fallback.className = "empty-state";
            fallback.textContent = `资源加载失败：${error instanceof Error ? error.message : "未知错误"}`;
            container.appendChild(fallback);
        });
    }

    function assembleArticleCard(article) {
        const card = document.createElement("article");
        card.className = "article-card";

        const metadata = document.createElement("div");
        metadata.className = "article-meta";
        const dateSpan = document.createElement("span");
        dateSpan.textContent = formatDate(article.publishDate);
        const readTimeSpan = document.createElement("span");
        readTimeSpan.textContent = `${article.readTimeMinutes} 分钟阅读`;
        metadata.append(dateSpan, readTimeSpan);

        const title = document.createElement("h3");
        title.className = "article-title";
        title.textContent = article.title;

        const summary = document.createElement("p");
        summary.className = "article-summary";
        summary.textContent = article.summary;

        const tagList = document.createElement("div");
        tagList.className = "tag-list";
        article.tags.forEach((tagLabel) => {
            const tagElement = document.createElement("span");
            tagElement.className = "tag";
            tagElement.textContent = tagLabel;
            tagList.appendChild(tagElement);
        });

        const footer = document.createElement("div");
        footer.className = "card-footer";
        const link = document.createElement("a");
        link.href = article.link;
        link.textContent = "阅读全文";
        const idSpan = document.createElement("span");
        idSpan.textContent = `编号：${article.id}`;
        footer.append(link, idSpan);

        card.append(metadata, title, summary, tagList, footer);
        return card;
    }

    function assembleResourceCard(resource) {
        const card = document.createElement("article");
        card.className = "resource-card";

        const title = document.createElement("h3");
        title.className = "resource-title";
        title.textContent = resource.title;

        const description = document.createElement("p");
        description.className = "resource-description";
        description.textContent = resource.description;

        const linkContainer = document.createElement("div");
        linkContainer.className = "resource-links";
        resource.links.forEach((resourceLink) => {
            const anchor = document.createElement("a");
            anchor.href = resourceLink.url;
            anchor.target = resourceLink.url.startsWith("http") ? "_blank" : "_self";
            anchor.rel = anchor.target === "_blank" ? "noopener" : "";
            anchor.textContent = resourceLink.label;
            linkContainer.appendChild(anchor);
        });

        card.append(title, description, linkContainer);
        return card;
    }

    function formatDate(dateInput) {
        const date = new Date(dateInput);
        if (Number.isNaN(date.getTime())) {
            return "日期待定";
        }
        return new Intl.DateTimeFormat("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(date);
    }

    function simulateAsync(value) {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve(structuredClone(value));
            }, 120);
        });
    }
})();