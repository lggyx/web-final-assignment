// 登录/注册页面交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // 切换到登录表单
    function showLoginForm() {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        showLoginBtn.classList.add('active');
        showRegisterBtn.classList.remove('active');
    }
    
    // 切换到注册表单
    function showRegisterForm() {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        showRegisterBtn.classList.add('active');
        showLoginBtn.classList.remove('active');
    }
    
    // 绑定切换按钮事件
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', showLoginForm);
    }
    
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', showRegisterForm);
    }
    
    // 登录表单提交处理
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            // 简单验证
            if (username && password) {
                // 这里应该发送登录请求到服务器
                alert(`登录成功！欢迎回来，${username}！`);
                // 实际项目中这里会跳转到主页或其他页面
            } else {
                alert('请填写所有必填字段！');
            }
        });
    }
    
    // 注册表单提交处理
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // 简单验证
            if (username && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('两次输入的密码不一致！');
                    return;
                }
                
                // 这里应该发送注册请求到服务器
                alert(`注册成功！欢迎加入我们，${username}！`);
                // 实际项目中这里会自动登录或跳转到登录页面
                showLoginForm();
            } else {
                alert('请填写所有必填字段！');
            }
        });
    }
    
    // 为输入框添加占位符文本
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type !== 'submit') {
            input.setAttribute('placeholder', ' ');
        }
    });
});