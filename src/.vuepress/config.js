// 使用的主题
const { config } = require("vuepress-theme-hope");
// 导航栏
const navbar = require("./configs/navbar");
// 侧边栏
const sidebar = require("./configs/sidebar");
const common_plugin = require("./common-plugin")

module.exports = config({
  title: "柒柒博客",  // 站点名
  description: "Actions speak louder than words.",
  port: 8090, //本地测试端口
  head: [
    // 增加一个自定义的 favicon(网页标签的图标)
    // 这里的 '/' 指向 docs/.vuepress/public 文件目录
    // 即 src/.vuepress/public/
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],

  // 生成 <link rel="prefetch"> 资源提示
  shouldPrefetch: (filename) => !filename.includes("page-"),

  themeConfig: {
    logo: "/favicon-2.png",
    author: "南辞",
    hostname: "http://qiqi.dreamagain.top",
    backToTop: true, // 回到顶部（可用小喵插件代替）
    editLinks: false, // 显示编辑本页链接（全局不显示）
    nav: navbar,
    sidebar: sidebar,
    sidebarIcon: false,  // 侧边栏图标是否显示
    
    // 主题语言:
    baseLang: "zh-CN",
    // locales: {
    //   /** 英文设置 */
    //   "/en/": {
    //     nav: navBarConfig.en,
    //     sidebar: sideBarConfig.en,
    //   },
    // },

    blog: {
     
      intro: "/about/intro.html", //个人介绍地址
      sidebarDisplay: "mobile",
      name: "南辞",  // 博客名
      avatar: "/avatar.jpg",  //头像
      links: {
        Zhihu: "https://zhihu.com/people/qiqiblog",
        Github: "https://github.com/small-universe",
        Gitee:'https://gitee.com/small-universe',
        QQ:"tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1715261428",
        Gmail:"mailto:18846770224@163.com",
      },
      timeline:"昨日重现", // 时间轴的顶部文字
      perPage: 10, //每页文章数量
    },

    // 版权
    copyright: {
      status: "global",
    },

    // 全部开启过于消耗性能，在插件配置中进行按需引入
    // mdEnhance: {
    //   // please only enable the features you need
    //   enableAll: true,
    //   presentation: {
    //     plugins: [
    //       "highlight",
    //       "math",
    //       "search",
    //       "notes",
    //       "zoom",
    //       "anything",
    //       "audio",
    //       "chalkboard",
    //     ],
    //   },
    // },

    // 评论设置,结合github actions使用，避免暴露个人重要信息
    comment: {
      type: "valine",
      appId: process.env.LEANCLOUD_APP_ID,
      appKey: process.env.LEANCLOUD_APP_KEY,
    },

    // 页脚
    footer: {
      display: true,
      content:"柒柒博客 " +
          "| <a href='http://icp.chinaz.com/%E6%BB%87ICP%E5%A4%8720004889%E5%8F%B7-1' target='_blank'>滇ICP备20004889号-1 </a>",
      copyright: "<a href='https://github.com/small-universe/vuepress-blog/blob/main/LICENSE' target='_blank'>License MIT</a> | Copyright © 2021 Mr·Yang『nanci』",
    },

    // 搜索配置
    searchPlaceholder: "Search...",
    algolia: {
      apiKey: "",
      indexName: "",
    },


    lastUpdate: {
      timezone: "Asia/Shanghai",
    },

    pwa: {
      favicon: "/favicon.png",
      themeColor: "#5c92d1",
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "柒柒博客",
        short_name: "QiQi Tribe",
        description: "羽子柒的个人博客",
        theme_color: "#5c92d1",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "分类",
            short_name: "分类",
            icons: [
              {
                src: "/assets/icon/category-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/category-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/category/",
            description: "文章分类分组",
          },
          {
            name: "标签",
            short_name: "标签",
            icons: [
              {
                src: "/assets/icon/tag-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/tag-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/tag/",
            description: "文章标签分组",
          },
          {
            name: "时间线",
            short_name: "时间线",
            icons: [
              {
                src: "/assets/icon/timeline-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/timeline-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/timeline/",
            description: "时间线文章列表",
          },
          {
            name: "个人介绍",
            short_name: "个人介绍",
            icons: [
              {
                src: "/assets/icon/about-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/about-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/about/",
            description: "个人介绍",
          },
        ],
      },
      cacheHTML: false,
      maxSize: 2048,
    },

    repo: "https://github.com/small-universe/qiqi-tribe",
    repoDisplay: false,
    repoLabel: "Github",
    docsDir: "src",
  },
  // 插件配置
  plugins: [
    
    // 阅读进度条
    ['reading-progress'],
    
    // 鼠标特效插件
    [
      'cursor-effects',
      {
        size: 1.75,
        shape: 'star',
      },
    ],
    // 悬挂小猫返回顶部
    // ['go-top',true],
    // Meting 音乐播放插件
    [
      'meting',
      {
        // metingApi: 'https://meting.sigure.xyz/api/music',
        meting: {
          server: 'netease',//网易云
          type: 'playlist',
          mid: '5306071955',
        },

        aplayer: {
          mini: true,
          fixed: true,
          lrcType: 0,//歌词解析模式(禁用歌词)
        },
      }
    ],
    // 页面加载
    ['loading-page'],
    // 集成了element-ui的插件
    ['element-ui'],
    // markdown增强插件
    [
      "md-enhance",
      {
        // 开启标记
        mark: true,
        // 启用幻灯片
        presentation: true,
      },
    ],
    // 其他自定义组件
    common_plugin,

    // 樱花
    // ["sakura", {
    //   num: 15,  // 默认数量
    //   show: true, //  是否显示
    //   zIndex: 0,   // 层级
    //   img: {
    //     replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
    //     httpUrl: '...'     // 绝对路径
    //   }
    // }],

    // 彩带背景
    // [
    //   'ribbon-animation',
    //   {
    //     size: 60,   // 默认数据90
    //     opacity: 0.2,  //  透明度
    //     zIndex: -1,   //  层级
    //     opt: {
    //       // 色带HSL饱和度
    //       colorSaturation: "80%",
    //       // 色带HSL亮度量
    //       colorBrightness: "60%",
    //       // 带状颜色不透明度
    //       colorAlpha: 0.65,
    //       // 在HSL颜色空间中循环显示颜色的速度有多快
    //       colorCycleSpeed: 6,
    //       // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
    //       verticalPosition: "center",
    //       // 到达屏幕另一侧的速度有多快
    //       horizontalSpeed: 200,
    //       // 在任何给定时间，屏幕上会保留多少条带
    //       ribbonCount: 2,
    //       // 添加笔划以及色带填充颜色
    //       strokeSize: 0,
    //       // 通过页面滚动上的因子垂直移动色带
    //       parallaxAmount: -0.5,
    //       // 随着时间的推移，为每个功能区添加动画效果
    //       animateSections: true
    //     },
    //     ribbonShow: false, //  点击彩带  true显示  false为不显示
    //     ribbonAnimationShow: true  // 滑动彩带
    //   }
    // ],
  ],
});
