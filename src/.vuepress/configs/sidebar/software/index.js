module.exports = [
  {
    title: "数据库",
    collapsable: false,
    prefix: "database/",
    children: [
      {
        title: "MySQL",
        // collapsable: false,
        prefix: "SQL/MySQL/",
        children:require("./mysql"),
      },
      {
        title: "Redis",
        // collapsable: false,
        prefix: "NoSQL/Redis/",
        children:require("./redis"),
      },
    ],
  },
  {
    title: "node环境",
    collapsable: false,
    prefix: "nvm/",
    children: ["",],
  },
  {
    title: "工具",
    collapsable: false,
    prefix: "tool/",
    children: [
      "vpn/",
      {
        title: "在线工具",
        collapsable: true,
        prefix: "online/",
        children: ["common"],
      },
    ],
  },
];
