(() => {
    const topicFilters = [
        { id: "all", label: "全部领域" },
        { id: "machine-learning", label: "机器学习" },
        { id: "computer-vision", label: "计算机视觉" },
        { id: "nlp", label: "自然语言处理" },
        { id: "data-science", label: "数据科学" },
        { id: "ai-ethics", label: "AI 伦理" },
        { id: "product", label: "产品创新" }
    ];

    const levelFilters = [
        { id: "all-levels", label: "全部难度" },
        { id: "beginner", label: "入门" },
        { id: "intermediate", label: "进阶" },
        { id: "advanced", label: "高阶" }
    ];

    const categoryEntries = [
        {
            id: "machine-learning",
            name: "机器学习基石",
            summary: "系统掌握监督、非监督与深度学习核心理论，配套校园课程与 Kaggle 实战案例。",
            badges: ["入门", "在线课程", "校园项目"],
            durationWeeks: 6,
            topic: "machine-learning",
            level: "beginner",
            actions: [
                { label: "学习路线", url: "#" },
                { label: "项目集合", url: "#" }
            ]
        },
        {
            id: "computer-vision",
            name: "计算机视觉实验室",
            summary: "围绕校园图像数据集深入目标检测、语义分割与增强现实应用。",
            badges: ["进阶", "实验课", "GPU 实训"],
            durationWeeks: 8,
            topic: "computer-vision",
            level: "intermediate",
            actions: [
                { label: "开放数据集", url: "#" },
                { label: "实验指导", url: "#" }
            ]
        },
        {
            id: "nlp",
            name: "自然语言处理研修",
            summary: "从文本预处理、词向量到大模型提示词，解决校园知识库问答场景。",
            badges: ["进阶", "社团项目", "LLM"],
            durationWeeks: 7,
            topic: "nlp",
            level: "intermediate",
            actions: [
                { label: "提示词模板", url: "#" },
                { label: "部署指南", url: "#" }
            ]
        },
        {
            id: "data-science",
            name: "数据科学与可视化",
            summary: "聚焦数据分析、可视化仪表板以及决策支持，结合校园运营案例。",
            badges: ["入门", "Tableau", "竞赛"],
            durationWeeks: 5,
            topic: "data-science",
            level: "beginner",
            actions: [
                { label: "工具清单", url: "#" },
                { label: "数据集下载", url: "#" }
            ]
        },
        {
            id: "ai-ethics",
            name: "AI 伦理与社会影响",
            summary: "从安全、公平、隐私视角审视 AI 应用，结合校园治理实践案例。",
            badges: ["高阶", "研讨课", "政策"],
            durationWeeks: 4,
            topic: "ai-ethics",
            level: "advanced",
            actions: [
                { label: "研讨议题", url: "#" },
                { label: "参考资料", url: "#" }
            ]
        },
        {
            id: "product",
            name: "AI 产品创新营",
            summary: "跨专业协作完成 AI 产品从洞察、原型到落地的全过程，强调系统化设计。",
            badges: ["高阶", "设计思维", "路演"],
            durationWeeks: 6,
            topic: "product",
            level: "advanced",
            actions: [
                { label: "工作坊报名", url: "#" },
                { label: "成果展示", url: "#" }
            ]
        }
    ];

    const roadmapEntries = [
        {
            id: "llm-roadmap",
            title: "大型语言模型能力矩阵",
            description: "从 Prompt 工程、检索增强到微调部署的四阶段学习路径。",
            links: [
                { label: "阶段任务清单", url: "#" },
                { label: "知识卡片下载", url: "#" }
            ]
        },
        {
            id: "cv-roadmap",
            title: "计算机视觉竞赛晋级指南",
            description: "涵盖数据增广、模型集成与赛后复盘的实战策略。",
            links: [
                { label: "专题讲义", url: "#" },
                { label: "榜单案例分析", url: "#" }
            ]
        },
        {
            id: "product-roadmap",
            title: "AI 产品经理跃迁计划",
            description: "通过用户研究、策略规划与原型验证打造差异化 AI 产品。",
            links: [
                { label: "访谈脚本模板", url: "#" },
                { label: "案例演示", url: "#" }
            ]
        }
    ];

    const state = {
        selectedTopic: "all",
        selectedLevel: "all-levels",
        isCompact: false
    };

    document.addEventListener("DOMContentLoaded", () => {
        initializeNavigation();
        renderFilterButtons();
        renderCategories();
        renderRoadmap();
        bindInteractions();
    });

    function initializeNavigation() {
        const navToggleButton = document.querySelector(".nav-toggle");
        const primaryNav = document.querySelector(".primary-nav");
        if (!navToggleButton || !primaryNav) {
            return;
        }

        navToggleButton.addEventListener("click", () => {
            const isExpanded = navToggleButton.getAttribute("aria-expanded") === "true";
            const nextState = !isExpanded;
            navToggleButton.setAttribute("aria-expanded", String(nextState));
            primaryNav.classList.toggle("is-active", nextState);
        });

        window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
            if (event.matches) {
                primaryNav.classList.remove("is-active");
                navToggleButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    function renderFilterButtons() {
        const topicContainer = document.querySelector("#topic-filters");
        const levelContainer = document.querySelector("#level-filters");
        if (!topicContainer || !levelContainer) {
            return;
        }

        topicContainer.innerHTML = "";
        levelContainer.innerHTML = "";

        topicFilters.forEach((filter) => {
            const button = createFilterButton(filter, state.selectedTopic === filter.id);
            button.addEventListener("click", () => {
                state.selectedTopic = filter.id;
                updateFilterSelections(topicContainer, filter.id);
                renderCategories();
            });
            topicContainer.appendChild(button);
        });

        levelFilters.forEach((filter) => {
            const button = createFilterButton(filter, state.selectedLevel === filter.id);
            button.addEventListener("click", () => {
                state.selectedLevel = filter.id;
                updateFilterSelections(levelContainer, filter.id);
                renderCategories();
            });
            levelContainer.appendChild(button);
        });
    }

    function createFilterButton(filter, isSelected) {
        const button = document.createElement("button");
        button.className = "filter-button";
        button.type = "button";
        button.textContent = filter.label;
        button.setAttribute("data-filter", filter.id);
        button.setAttribute("aria-pressed", String(isSelected));
        if (isSelected) {
            button.classList.add("is-active");
        }
        return button;
    }

    function updateFilterSelections(container, activeId) {
        container.querySelectorAll(".filter-button").forEach((element) => {
            const isActive = element.getAttribute("data-filter") === activeId;
            element.classList.toggle("is-active", isActive);
            element.setAttribute("aria-pressed", String(isActive));
        });
    }

    function renderCategories() {
        const container = document.querySelector("#category-grid");
        const resultCountDisplay = document.querySelector("#result-count");
        if (!container || !resultCountDisplay) {
            return;
        }

        container.innerHTML = "";

        const filteredEntries = categoryEntries.filter((entry) => {
            const matchTopic = state.selectedTopic === "all" || entry.topic === state.selectedTopic;
            const matchLevel = state.selectedLevel === "all-levels" || entry.level === state.selectedLevel;
            return matchTopic && matchLevel;
        });

        resultCountDisplay.textContent = `共 ${filteredEntries.length} 个分类`;

        if (filteredEntries.length === 0) {
            const emptyCard = document.createElement("div");
            emptyCard.className = "empty-state";
            emptyCard.textContent = "暂未找到符合条件的分类，请调整筛选条件。";
            container.appendChild(emptyCard);
            return;
        }

        filteredEntries.forEach((entry) => {
            try {
                const card = assembleCategoryCard(entry);
                container.appendChild(card);
            } catch (error) {
                console.error("渲染分类卡片失败:", error, entry);
            }
        });
    }

    function assembleCategoryCard(entry) {
        const card = document.createElement("article");
        card.className = "category-card";
        if (state.isCompact) {
            card.style.padding = "1.2rem";
        } else {
            card.style.padding = "";
        }

        const header = document.createElement("div");
        header.className = "category-header";
        const icon = document.createElement("div");
        icon.className = "category-icon";
        icon.textContent = getCategoryIcon(entry.topic);
        const title = document.createElement("h3");
        title.className = "article-title";
        title.textContent = entry.name;
        header.append(title, icon);

        const summary = document.createElement("p");
        summary.className = "article-summary";
        summary.textContent = entry.summary;

        const badgeList = document.createElement("div");
        badgeList.className = "tag-list";
        entry.badges.forEach((badge) => {
            const badgeElement = document.createElement("span");
            badgeElement.className = "tag";
            badgeElement.textContent = badge;
            badgeList.appendChild(badgeElement);
        });

        const duration = document.createElement("span");
        duration.className = "category-pill";
        duration.textContent = `建议周期：${entry.durationWeeks} 周`;

        const actions = document.createElement("div");
        actions.className = "category-actions";
        entry.actions.forEach((action) => {
            const link = document.createElement("a");
            link.href = action.url;
            link.textContent = action.label;
            actions.appendChild(link);
        });

        card.append(header, summary, badgeList, duration, actions);
        return card;
    }

    function getCategoryIcon(topic) {
        const iconMap = {
            "machine-learning": "🤖",
            "computer-vision": "👁️",
            "nlp": "🗣️",
            "data-science": "📊",
            "ai-ethics": "⚖️",
            "product": "🚀"
        };
        return iconMap[topic] ?? "✨";
    }

    function renderRoadmap() {
        const container = document.querySelector("#roadmap-list");
        if (!container) {
            return;
        }
        container.innerHTML = "";
        roadmapEntries.forEach((entry) => {
            const card = document.createElement("article");
            card.className = "resource-card";
            const title = document.createElement("h3");
            title.className = "resource-title";
            title.textContent = entry.title;
            const description = document.createElement("p");
            description.className = "resource-description";
            description.textContent = entry.description;
            const links = document.createElement("div");
            links.className = "resource-links";
            entry.links.forEach((linkEntry) => {
                const anchor = document.createElement("a");
                anchor.href = linkEntry.url;
                anchor.textContent = linkEntry.label;
                links.appendChild(anchor);
            });
            card.append(title, description, links);
            container.appendChild(card);
        });
    }

    function bindInteractions() {
        const resetButton = document.querySelector("#reset-filters");
        const compactButton = document.querySelector("#toggle-compact");
        if (resetButton) {
            resetButton.addEventListener("click", handleResetFilters);
        }
        if (compactButton) {
            compactButton.addEventListener("click", handleToggleCompact);
        }
    }

    function handleResetFilters() {
        state.selectedTopic = "all";
        state.selectedLevel = "all-levels";
        renderFilterButtons();
        renderCategories();
    }

    function handleToggleCompact() {
        state.isCompact = !state.isCompact;
        renderCategories();
        const compactButton = document.querySelector("#toggle-compact");
        if (compactButton) {
            compactButton.textContent = state.isCompact ? "切换标准视图" : "切换紧凑视图";
        }
    }
})();