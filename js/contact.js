(() => {
    const contactStorageKey = "campus-ai-contact-messages";

    document.addEventListener("DOMContentLoaded", () => {
        initializeContactForm();
    });

    function initializeContactForm() {
        const form = document.getElementById("contact-form");
        if (!form) {
            return;
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const submitButton = form.querySelector("button[type=submit]");
            const feedback = document.getElementById("contact-feedback");
            
            if (!submitButton || !feedback) {
                return;
            }

            const formData = new FormData(form);
            const contactData = {
                name: formData.get("name")?.toString().trim() ?? "",
                email: formData.get("email")?.toString().trim() ?? "",
                subject: formData.get("subject")?.toString().trim() ?? "",
                message: formData.get("message")?.toString().trim() ?? "",
                createdAt: new Date().toISOString(),
                status: "pending"
            };

            clearValidationMessages();
            const validationResult = validateContactForm(contactData);
            
            if (!validationResult.isValid) {
                displayValidationMessages(validationResult.errors);
                feedback.innerHTML = createAlertMarkup("请完善必填信息后再提交。", "error");
                return;
            }

            submitButton.disabled = true;
            feedback.innerHTML = createAlertMarkup("正在发送消息...", "success");

            // 模拟发送过程
            window.setTimeout(() => {
                try {
                    // 保存到本地存储（模拟发送成功）
                    const savedMessagesRaw = window.localStorage.getItem(contactStorageKey);
                    const savedMessages = savedMessagesRaw ? JSON.parse(savedMessagesRaw) : [];
                    savedMessages.push(contactData);
                    window.localStorage.setItem(contactStorageKey, JSON.stringify(savedMessages));
                    
                    // 显示成功消息
                    feedback.innerHTML = createAlertMarkup("消息发送成功！我们会在 24 小时内回复您。", "success");
                    form.reset();
                    
                    // 可选：滚动到反馈消息位置
                    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    
                } catch (error) {
                    console.error("保存联系消息失败", error);
                    feedback.innerHTML = createAlertMarkup("消息发送失败，请稍后再试。", "error");
                } finally {
                    submitButton.disabled = false;
                }
            }, 500);
        });
    }

    function validateContactForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push({ field: "contact-name", message: "姓名至少需要 2 个字符" });
        }
        
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.push({ field: "contact-email", message: "请输入有效的邮箱地址" });
        }
        
        if (!data.subject) {
            errors.push({ field: "contact-subject", message: "请选择联系主题" });
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push({ field: "contact-message", message: "详细内容至少需要 10 个字符" });
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
        const feedback = document.getElementById("contact-feedback");
        if (feedback) {
            feedback.innerHTML = "";
        }
    }

    function createAlertMarkup(message, type) {
        const typeClass = type === "error" ? "alert-error" : "alert-success";
        return `<div class="alert ${typeClass}">${message}</div>`;
    }
})();