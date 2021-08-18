---
title: 关于本站
article: false
breadcrumb: false
---

## 网站介绍

网站使用 [VuePress](https://v1.vuepress.vuejs.org/zh/guide/) 建站工具构建，主题使用 [vuepress-theme-hope](https://github.com/Mister-Hope/vuepress-theme-hope/)

## 文件结构

```sh
.
├──.github
|   └── workflows
|       └── deploy-github.yml(github action 用于持续部署)
|
├── src
│   ├── .vuepress 
│   │   ├── config 
|   |   |   ├── sideBar (侧边栏)
|   |   |   |   ├── backend
|   |   |   |   ├── frontend
|   |   |   |   ├── interview
|   |   |   |   ├── software
|   |   |   |   └── index.js
|   |   |   |
|   |   |   ├── navBar.js (导航栏)
|   |   |   └── private.js (私人设置，可在.gitignore中设置不加入版本管理)
│   │   |
│   │   ├── public (引用图片资源目录约定使用"/"为public目录)
|   |   |   └── assets
|   |   |       ├── icon
|   |   |       └── img
|   |   |
│   │   ├── styles (自定义主题的一些样式)
│   │   │   ├── base.styl
│   │   │   ├── index.styl
│   │   │   └── palette.styl
|   |   |
│   │   └── config.js (项目的配置)
│   │ 
│   ├── about
|   |   ├── intro.md
|   |   └── site.md
|   |  
│   ├── guide
|   |   ├── markdown.md
│   │   └── template.md
|   |
│   ├── interview
|   |   ├── Java208
│   │   └── readme.md
|   |
│   ├── program
|   |   ├── backend
│   │   └── readme.md
|   |
│   ├── blog.md (博客首页)
│   ├── content.md (目录导航)
│   └── readme.md (部落主页)
|   
├── .gitignore
├── deploy.sh (手动部署脚本)
├── package.json
└── package-lock.json
```
## 仓库链接

- [**QiQi-Blog**](https://github.com/small-universe/QiQi-Blog)

## 免责声明

- 本站内容均用于个人学习，有转载或参考的博客文章都已在每篇博客中声明，若有侵权请联系删除！

