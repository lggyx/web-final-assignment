(() => {
    document.addEventListener("DOMContentLoaded", () => {
        initializeBackToTop();
    });

    function initializeBackToTop() {
        const backToTopButton = document.getElementById("back-to-top");
        
        if (!backToTopButton) {
            return;
        }

        // 滚动显示/隐藏按钮
        const toggleBackToTop = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            if (scrollY > viewportHeight * 0.5) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        };

        // 平滑滚动到顶部
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };

        // 添加事件监听器
        window.addEventListener("scroll", toggleBackToTop, { passive: true });
        backToTopButton.addEventListener("click", scrollToTop);

        // 键盘导航支持
        backToTopButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollToTop();
            }
        });

        // 初始状态检查
        toggleBackToTop();
    }
})();