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
        });
    }
    
    // 下一页
    function nextPage() {
        if (currentPage < totalPages - 1) {
            const page = pages[currentPage];
            page.classList.add('flipped');
            currentPage++;
        }
    }
    
    // 上一页
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            const page = pages[currentPage];
            page.classList.remove('flipped');
        }
    }
    
    // 绑定按钮事件
    if (nextButton) {
        nextButton.addEventListener('click', nextPage);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevPage);
    }
    
    // 封面点击翻页
    const frontCover = document.querySelector('.front-cover');
    if (frontCover) {
        frontCover.addEventListener('click', nextPage);
    }
    
    // 初始化
    initPages();
    
    // 键盘事件支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
});