// 3D翻页书籍效果
document.addEventListener('DOMContentLoaded', function() {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.page');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    let currentPage = 0;
    const totalPages = pages.length;
    
    // 初始化页面z-index
    function initPages() {
        pages.forEach((page, index) => {
            page.style.zIndex = totalPages - index;
            // 为每页添加点击事件
            if (index < totalPages - 1) { // 不为最后一页添加点击事件
                page.addEventListener('click', function(e) {
                    // 只有点击右侧一半才触发翻页
                    if (e.offsetX > this.offsetWidth / 2) {
                        nextPage();
                    }
                });
            }
        });
    }
    
    // 下一页
    function nextPage() {
        if (currentPage < totalPages - 1) {
            const page = pages[currentPage];
            page.classList.add('flipped');
            currentPage++;
            updateButtonStates();
        }
    }
    
    // 上一页
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            const page = pages[currentPage];
            page.classList.remove('flipped');
            updateButtonStates();
        }
    }
    
    // 更新按钮状态
    function updateButtonStates() {
        if (prevButton) {
            prevButton.disabled = (currentPage === 0);
        }
        if (nextButton) {
            nextButton.disabled = (currentPage === totalPages - 1);
        }
    }
    
    // 绑定按钮事件
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            e.stopPropagation();
            nextPage();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            e.stopPropagation();
            prevPage();
        });
    }
    
    // 初始化
    initPages();
    updateButtonStates();
    
    // 键盘事件支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
});