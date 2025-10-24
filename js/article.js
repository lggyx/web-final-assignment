(() => {
    const relatedArticles = [
        {
            title: "知识库检索增强：让 LLM 回答更可靠",
            summary: "结合校园课程资料构建 RAG 管线，提升模型答题准确率。",
            link: "#"
        },
        {
            title: "从问卷到数据标签：校园 NLP 数据治理实践",
            summary: "介绍如何通过轻量流程构建课程问答数据集，保障隐私合规。",
            link: "#"
        },
        {
            title: "提示词工作坊：设计校园教学助手对话策略",
            summary: "使用角色扮演与多轮约束技巧优化大模型在教学场景的表现。",
            link: "#"
        }
    ];

    const commentStorageKey = "campus-ai-article-comments";

    document.addEventListener("DOMContentLoaded", () => {
        initializeNavigation();
        renderRelatedArticles();
        restoreComments();
        setupCommentForm();
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

    function renderRelatedArticles() {
        const container = document.querySelector("#related-list");
        if (!container) {
            return;
        }
        container.innerHTML = "";

        relatedArticles.forEach((article) => {
            const item = document.createElement("article");
            item.className = "related-item";
            const textContainer = document.createElement("div");
            textContainer.className = "article-summary";
            const title = document.createElement("h3");
            title.className = "article-title";
            title.textContent = article.title;
            const summary = document.createElement("p");
            summary.textContent = article.summary;
            textContainer.append(title, summary);
            const link = document.createElement("a");
            link.href = article.link;
            link.textContent = "查看详情";
            item.append(textContainer, link);
            container.appendChild(item);
        });
    }

    function restoreComments() {
        const savedCommentsRaw = window.localStorage.getItem(commentStorageKey);
        if (!savedCommentsRaw) {
            updateEmptyState(true);
            return;
        }
        try {
            const savedComments = JSON.parse(savedCommentsRaw);
            if (!Array.isArray(savedComments)) {
                updateEmptyState(true);
                return;
            }
            savedComments.forEach((comment) => appendComment(comment));
            updateEmptyState(savedComments.length === 0);
        } catch (error) {
            console.error("解析评论缓存失败", error);
            window.localStorage.removeItem(commentStorageKey);
            updateEmptyState(true);
        }
    }

    function setupCommentForm() {
        const form = document.querySelector("#comment-form");
        if (!form) {
            return;
        }
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const submitButton = form.querySelector("button[type=submit]");
            const feedback = document.querySelector("#comment-feedback");
            if (!submitButton || !feedback) {
                return;
            }

            const formData = new FormData(form);
            const commentData = {
                name: formData.get("name")?.toString().trim() ?? "",
                email: formData.get("email")?.toString().trim() ?? "",
                content: formData.get("content")?.toString().trim() ?? "",
                createdAt: new Date().toISOString()
            };

            clearValidationMessages();
            const validationResult = validateComment(commentData);
            if (!validationResult.isValid) {
                displayValidationMessages(validationResult.errors);
                feedback.innerHTML = createAlertMarkup("请完善必填信息后再提交。", "error");
                return;
            }

            submitButton.disabled = true;
            feedback.innerHTML = createAlertMarkup("正在提交...", "success");

            window.setTimeout(() => {
                try {
                    const savedCommentsRaw = window.localStorage.getItem(commentStorageKey);
                    const savedComments = savedCommentsRaw ? JSON.parse(savedCommentsRaw) : [];
                    savedComments.push(commentData);
                    window.localStorage.setItem(commentStorageKey, JSON.stringify(savedComments));
                    appendComment(commentData);
                    updateEmptyState(false);
                    form.reset();
                    feedback.innerHTML = createAlertMarkup("评论发布成功！", "success");
                } catch (error) {
                    console.error("保存评论失败", error);
                    feedback.innerHTML = createAlertMarkup("评论发布失败，请稍后再试。", "error");
                } finally {
                    submitButton.disabled = false;
                }
            }, 250);
        });
    }

    function validateComment(comment) {
        const errors = [];
        if (!comment.name || comment.name.trim().length < 2) {
            errors.push({ field: "comment-name", message: "昵称至少需要 2 个字符" });
        }
        if (!comment.email || !/^\S+@\S+\.\S+$/.test(comment.email)) {
            errors.push({ field: "comment-email", message: "请输入有效的邮箱地址" });
        }
        if (!comment.content || comment.content.trim().length < 5) {
            errors.push({ field: "comment-content", message: "评论内容至少需要 5 个字符" });
        }
        return { isValid: errors.length === 0, errors };
    }

    function displayValidationMessages(errors) {
        errors.forEach((error) => {
            const messageElement = document.querySelector(`.validation-message[data-for="${error.field}"]`);
            if (messageElement) {
                messageElement.textContent = error.message;
            }
        });
    }

    function clearValidationMessages() {
        document.querySelectorAll(".validation-message").forEach((element) => {
            element.textContent = "";
        });
        const feedback = document.querySelector("#comment-feedback");
        if (feedback) {
            feedback.innerHTML = "";
        }
    }

    function appendComment(comment) {
        const list = document.querySelector("#comment-list");
        if (!list) {
            return;
        }
        const item = document.createElement("article");
        item.className = "comment-item";
        const header = document.createElement("div");
        header.className = "comment-item-header";
        const name = document.createElement("span");
        name.textContent = comment.name;
        const timestamp = document.createElement("span");
        timestamp.className = "comment-timestamp";
        timestamp.textContent = new Intl.DateTimeFormat("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(new Date(comment.createdAt));
        header.append(name, timestamp);

        const content = document.createElement("p");
        content.textContent = comment.content;

        item.append(header, content);
        list.appendChild(item);
    }

    function updateEmptyState(isEmpty) {
        const emptyStateElement = document.querySelector("#comment-empty-state");
        const commentList = document.querySelector("#comment-list");
        if (!emptyStateElement || !commentList) {
            return;
        }
        emptyStateElement.style.display = isEmpty ? "block" : "none";
        commentList.style.display = isEmpty ? "none" : "grid";
    }

    function createAlertMarkup(message, type) {
        const typeClass = type === "error" ? "alert-error" : "alert-success";
        return `<div class="alert ${typeClass}">${message}</div>`;
    }
})();