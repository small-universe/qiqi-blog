module.exports = [
    { text: "主页", link: "/", icon: "home" },
    { text: "指南", link: "/guide/", icon: "guide" },
    {
      text: "后端",
      icon:'backend',
      prefix: "/backend/",
      items: [
        { text: "Java", link: "Java/", icon: "java" },
      ],
    },
    { text: "算法", link: "/algorithm/", icon: "algorithm" },
    { text: "文档", link: "/docs/", icon: "docs" },
    {
      text: "专题",
      icon:'subject',
      items: [
        { text: "Python", link: "http://python.dreamagain.top/", icon: "python" },
        { text: "Go", link: "/Go/", icon: "goland"}
      ],
    },
]
