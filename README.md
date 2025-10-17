# 大学生AI技术分享网站

## 项目简介

这是一个面向大学生的AI技术学习分享网站，旨在帮助大学生系统学习人工智能相关知识。网站包含完整的AI学习路径，从基础概念到实际应用，为初学者提供全面的学习资源。

## 项目特点

- 🎯 **系统化学习路径**：从AI基础到深度学习，循序渐进的学习体系
- 📚 **丰富的内容模块**：涵盖AI基础、机器学习、深度学习、应用案例等
- 🎨 **现代化设计**：采用渐变色彩和卡片式设计，提供良好的用户体验
- 📱 **响应式布局**：支持各种设备访问，包括手机、平板和桌面
- 💻 **代码规范**：使用Prettier进行代码格式化，保证代码质量

## 技术栈

- **前端技术**：HTML5、CSS3
- **开发工具**：Prettier（代码格式化）
- **版本控制**：Git

## 项目结构

```
web-final-assignment/
├── css/                          # 样式文件目录
│   └── styles.css               # 主样式文件
├── ai-applications.html         # AI应用案例页面
├── ai-basics.html               # AI基础概念页面
├── deep-learning.html           # 深度学习页面
├── index.html                    # 首页
├── learning-resources.html      # 学习资源页面
├── machine-learning.html         # 机器学习页面
├── Claude.md                     # 设计文档
├── .gitignore                   # Git忽略文件配置
├── .prettierrc                  # Prettier代码格式化配置
├── package.json                 # npm配置文件
├── package-lock.json           # npm依赖锁定文件
└── README.md                    # 项目说明文档（当前文件）
```

## 页面功能

### 首页 (index.html)
- 网站导航和介绍
- 学习平台特性展示
- 推荐学习路径
- 行动号召按钮

### AI基础概念 (ai-basics.html)
- 人工智能定义和特征
- AI发展历程时间线
- AI主要分支介绍

### 机器学习 (machine-learning.html)
- 机器学习概述和类型
- 经典算法分类
- 机器学习工作流程

### 深度学习 (deep-learning.html)
- 神经网络基础
- 主要深度学习架构
- 关键技术和框架

### AI应用案例 (ai-applications.html)
- 各行业AI应用场景
- 成功案例分析
- 实际应用展示

### 学习资源 (learning-resources.html)
- 学习路线规划
- 在线课程平台推荐
- 推荐书籍和工具
- 学习建议和技巧

## 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge等）
- 无需服务器环境，可直接在浏览器中打开

### 运行方式
1. 克隆或下载项目到本地
2. 使用浏览器直接打开 `index.html` 文件
3. 或使用本地服务器运行（推荐）：
   ```bash
   # 使用Python内置服务器
   python -m http.server 8000
   
   # 或使用Node.js的http-server
   npx http-server
   ```

### 开发环境设置
1. 安装Node.js（用于代码格式化）
2. 安装项目依赖：
   ```bash
   npm install
   ```
3. 代码格式化：
   ```bash
   npx prettier --write "**/*.{html,css}"
   ```

## 设计特色

### 色彩方案
- **主色调**：紫色渐变 (#667eea → #764ba2)
- **辅助色**：粉色渐变 (#f093fb → #f5576c)
- **文字色**：深灰色系 (#333, #555, #666)

### 布局特点
- 卡片式设计，圆角边框
- 响应式网格系统
- 平滑过渡动画效果
- 移动端友好设计

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发指南

### 代码规范
- 使用Prettier进行代码格式化
- HTML文件使用语义化标签
- CSS采用BEM命名规范
- 添加详细的代码注释

### 文件命名规范
- HTML文件：使用连字符分隔，如 `ai-basics.html`
- CSS类名：使用连字符分隔，如 `.feature-card`
- 图片资源：描述性命名，如 `hero-image.jpg`

## 贡献指南

1. Fork 本项目
2. 创建特性分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m '添加新功能'`
4. 推送分支：`git push origin feature/新功能`
5. 提交Pull Request

## 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 项目GitHub仓库：[web-final-assignment](https://github.com/lggyx/web-final-assignment)
- 邮箱：example@email.com

## 更新日志

### v1.0.0 (2024-10-17)
- ✅ 完成基础网站结构搭建
- ✅ 实现响应式设计
- ✅ 添加详细代码注释
- ✅ 使用Prettier代码格式化
- ✅ 创建项目文档

---

**让我们一起探索AI的无限可能！** 🚀