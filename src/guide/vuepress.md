---
title: VuePresss入坑指南
category: 使用指南
sticky: 999
tags:
  - vuepress
---
   
<!-- more -->


在利用vuepress搭建个人博客的过程中参考过很多教程，最权威的教程是[vuepress官网](https://v1.vuepress.vuejs.org/zh/)，其他不懂的细节再通过百度基本能解决，不过不得不说如果要自定义主题、编写自己的组件或者开发一下插件的时候，这方面的教程很少，即使是仅有的教程也没有达到我所期望的质效果。

## 一、VuePresss简介

通过[官方介绍](https://v1.vuepress.vuejs.org/zh/guide/)提取如下几点关键信息

### 1、什么是VuePresss

Vue全家桶成员之一，尤雨溪大神于2018年4月12日推出

- **VuePresss = [极简静态网站生成器](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core) + [默认主题](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html)**



### 2、VuePresss是干什么的

- 它的诞生初衷是为了支持 Vue 及其子项目的文档需求

- 现在，你可以通过添加**博客主题**来搭建属于自己的静态博客

  软硬件要求：

  - vuepress 
  - vuepress主题模板

  - ~~vuepress插件~~ （可选）
  - ~~第三方组件库，如Element-UI，View UI~~ （可选）
  - ~~自己的服务器~~ （可选）
  - ~~自己的备案域名~~（可选）



### 3、VuePresss工作原理

- 一个 VuePresss网站是一个由 [Vue ](http://vuejs.org/)、[Vue Router](https://github.com/vuejs/vue-router)和 [webpack ](http://webpack.js.org/)驱动的单页应用
- 所以，VuePresss是借鉴了Nuxt框架，采用服务端渲染。**一个VuePresss网站=应用**。



### 4、使用体验

- 推荐使用VuePresss的社区主题，样式比较好看
- 使用主题也并非开箱即用，还是需要不少的配置
- 文章写在md文件中，有时需要插入网页标签，会带来一定的不便
- 使用Markdown请使用比较友好的编辑器，推荐`Typora`



接下来就看看如何一步步搭建、扩展以及使用。



## 二、开始搭建

### （一）创建项目目录

在任意位置新建一个目录`qiqi-algorithm`

### （二）初始化

进入qiqi-blog目录中，执行下面的命令

```sh
yarn init 
或
npm init
```

可以一直回车，不用填任何信息

![](./assets/vuepress01.png)

执行结束后项目下会生成`package.json`文件

```json
{
  "name": "`qiqi-algorithm`",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

::: tip 

npm 和 yarn都是包管理工具，在使用之前需要安装node.js

如果你还没有安装过node.js、npm、yarn这些基础环境可以参考[windows下安装多版本Node.js](/software/nvm/readme.md)

:::

### （三）安装 vuepress

==官方推荐局部安装==，听官方的准没错，省去一些可能不必要的麻烦

```sh
yarn add -D vuepress 
或
npm install -D vuepress
```

::: warning 官方提示

注意

如果你的现有项目依赖了 webpack 3.x，我们推荐使用 [Yarn (opens new window)](https://classic.yarnpkg.com/zh-Hans/)而不是 npm 来安装 vuepress。因为在这种情形下，npm 会生成错误的依赖树。

yarn能够解决npm存在的一些问题，所以推荐还是使用yarn

:::

### （四）创建目录src

在`qiqi-algorithm`下创建目录`src`，这个目录可以任意命名，只是后面要提交的脚本要相应改一下就行。官方是`docs`



### （五）`package.json` 

在 `package.json` 中添加以下内容

```json
{
  "scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src"
  }
}
```

添加该内容后将把 `src`目录作为 `targetDir`

如果按照官方创建的是docs目录，添加的内容是：

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

dev、build是vuepress中的相关命令，更多命令参考：[命令行接口](https://www.vuepress.cn/api/cli.html)，还可以使用 [extendCli](https://www.vuepress.cn/plugin/option-api.html#extendcli) 来创建自定义命令。

所以可以据个人需要设置一下在此处添加更多命令

这里我改一下script内容为：

```json
{
"scripts": {
    "dev": "vuepress dev src --open --host localhost",
    "build": "vuepress build src --dest dist"
  }
}
```



### （六）编写首页

在src目录下创建readme.md文件并在开头插入[Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html)内容

```md
---
home: true
heroImage: /favicon.png
heroText: 七七算法
tagline: welcome
actionText: 了解更多 →
actionLink: /
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: vuepress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: Copyright © 2021 Mr·Yang
---

```



### （七）在本地启动服务器

根据第五步执行相关命令

按照官网来启动命令是：

```sh
yarn docs:dev 
或
npm run docs:dev
```

按照我自己配置的就应该是：

```sh
yarn dev 
或
npm run dev
```

此时`package.json`完整内容应该是这样

```json
{
  "name": "qiqi-algorithm",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "vuepress dev src --open --host localhost",
    "build": "vuepress build src --dest dist"
  },
  "license": "MIT",
  "devDependencies": {
    "vuepress": "^1.8.1"
  }
}

```

::: tip 

不按照官网主要是为了更直观看到那些地方可以自定义

:::

运行结果：

![](./assets/vuepress02.png)

能运行出来说明配置没有出错，仔细看还有圈出来的基础地方没有显示，说明我们还要接着做一些配置

官网里也详细指出我们接下来的工作了：

<img src="./assets/vuepress03.png"/>



### （八）创建基本项目结构

官方只有[推荐目录结构](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.vuepress.cn%2Fguide%2Fdirectory-structure.html)，并没有现成的cli，所以需要通过命令行或手动创建如下结构：

```ruby
qiqi-algorithm
├─package.json
├─docs
|  ├─readme.md
|  ├─.vuepress
|  |     ├─config.js
|  |     ├─public
|  |     |   └logo.png
|  |     |   └favicon.ico
```

其中有后缀的是文件，没后缀的是文件夹



### （九）配置config.js

该文件为项目最重要的配置文件，几乎所有配置项都是在此进行。

 我们先来一个最简单的配置看看效果：

```js
module.exports = {
    title: '七七算法',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    themeConfig: {
      logo: '/favicon.png',  // 左上角logo
      nav:[ // 导航栏配置
        {text: '首页', link: '/' },
        {text: '侧边栏测试', link: '/sidebar' },
        {text: '七七部落', link: 'http://qiqi.dreamagain.top' }, 
      ],
      sidebar: 'auto', // 配置为自动生成侧边栏
    }
  };
```

详细配置可直接查询[官网-config配置](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.vuepress.cn%2Fconfig%2F%23%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)

::: tip 注意

1. 此时路由根路径为src文件夹（我们在package.json中通过build、dev命令后的参数指定的）
2. 静态资源（图片）根路径为public文件夹（这是VuePress约定的）

:::

在src下新建：sidebar.md

```md
---
title: 侧边栏测试
---
## 二级标题01

### 三级标题01-1

## 二级标题02

### 三级标题02-1 

```



### （十）再次启动项目

`yarn run dev`

 效果如下：

<img src="./assets/vuepress04.png" style="zoom: 80%;" />

<img src="./assets/vuepress05.png" style="zoom: 80%;" />



我们配置的title、nav、sidebar、logo全都生效了！

到这里一个极简的框架已经搭建起来了

这里默认使用的是**官方默认主题**：

- 左上角的logo与title
- 右上角的全局搜索框与nav导航栏
- 左侧的sidebar导航栏（自动将md一级标题设置为导航文案）
- 右侧的markdown内容

**注意：项目自带热更新; 但config.js有时可能会热更新失败，需要重启项目**



## 三、详细配置

接下来参照官网[基本配置](https://www.vuepress.cn/guide/basic-config.html)进行一些更细节的配置



### （一）更换主题

::: tip 主题分类

- 默认主题
- 自定义主题

默认主题样式比较简洁，如果要使用丰富样式的主题就使用官方或社区提供的一些自定义主题，如果实力允许你也可以开发一个自定义主题。不想那么麻烦，但默认主题又不满足需求？那就在默认主题基础上做一些修改，以满足需求。

:::



可以在[npm官网](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.npmjs.com%2F)中输入`vuepress-theme`寻找相关的vuepress主题，其中以 @vuepress/theme- 开头的主题是官方维护的主

这里使用  [vuepress-theme-reco](https://github.com/vuepress-reco/vuepress-theme-reco)，[官方文档](https://vuepress-reco-doc.now.sh/views/1.x/)

该主题提供了快速构建的脚手架，这里选择yarn安装

**1、使用脚手架安装**

```sh
// 安装脚手架
yarn add global @vuepress-reco/theme-cli

// 初始化
theme-cli init reco-demo

```

执行` theme-cli init reco-demo`命令后根据提示填写相关信息

```sh
PS F:\program\我的博客\qiqi-algorithm> theme-cli init reco-demo
? What's the name of new directory? reco-demo
? What's the title of your project? reco-demo
? What's the description of your project? Create a blog template with vuepress-theme-reco.
? What's the author's name? nanci
? What style do you want your home page to be?(Select afternoon-grocery, if you want to download reco_luan's '午后南杂')? What style do you want your home page to be?(Select afternoon-grocery, if you want to download reco_luan's '午后南杂')? What style do you want your home page to be?(Select afternoon-grocery, if you want to download reco_luan's '午后南杂')? What style do you want your home page to be?(Select afternoon-grocery, if you want to download reco_luan's '午后南杂') 
> blog
  doc
  afternoon-grocery

```

> \>blog
>
> doc
>
> afternoon-grocery

通过上下键来选择，这里选择blog，回车



继续执行以下命令

```sh
yarn install

# run
yarn dev

# build
yarn build
```

运行效果：

![](./assets/vuepress06.png)

查看项目的目录结构和package.json文件

![](./assets/vuepress28.png)

说明是把项目根目录作为 `targetDir`，如果要按照官方推荐的目录就手动改一下，不过改不改这都无伤大雅。



::: tip 官方说明

vuepress官网也提供了 [使用主题](https://www.vuepress.cn/theme/using-a-theme.html) 的方法

**使用社区主题**

```js
// .vuepress/config.js
module.exports = {
  theme: 'vuepress-theme-xx'
}

// 主题名以 vuepress-theme- 开头，可以使用缩写来省略这个前缀：
module.exports = {
  theme: 'xxx'
}
```

**使用官方主题**

```js
// .vuepress/config.js
module.exports = {
  theme: '@org/vuepress-theme-xxx', //一个官方主题: '@vuepress/theme-xxx'
}
// 缩写
module.exports = {
  theme: '@org/xxx', // 或者一个官方主题: '@vuepress/xxx'
}
```



所以如果你不想使用[vuepress-theme-reco脚手架](#)开始搭建，而是在旧项目中使用，可以像官方介绍的这样来安装

1、安装

```sh
yarn add vuepress-theme-reco
```

2、引用

```sh
// .vuepress/config.js

module.exports = {
  theme: 'reco'
}  
```

:::





**2、查看`package.json`**

```json
{
  "name": "reco-demo",
  "version": "1.0.0",
  "author": "nanci",
  "scripts": {
    "dev": "vuepress dev . --open --host \"localhost\"",
    "build": "vuepress build ."
  },
  "devDependencies": {
    "vuepress": "1.7.1",
    "vuepress-theme-reco": "1.6.1"
  },
  "description": "Create a blog template with vuepress-theme-reco."
}

```



**3、更新依赖**（3种方式）

1. 下载npm-check-updates
2. yarn upgrade-interactive --latest
3. yarn upgrade package@version

**第一种**

```sh
// 先下载
yarn global add npm-check-updates

// 更新包（yarn.lock和package.json同步更新）
ncu --upgrade --upgradeAll && yarn upgrade
```

**第二种**

```sh
yarn upgrade-interactive --latest
// 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```

**第三种**

```sh
yarn upgrade package@version
// yarn.lock和package.json都会更新，但是会进行版本锁定 "echarts": "4.2.0-rc.2"
```

::: right 参考

[多纤果冻](https://blog.csdn.net/qq_37939251/article/details/107832805)

:::

::: tip

- yarn upgrade  依赖包小版本升级
- yarn upgrade-interactive --latest  大版本升级。忽略package.json指定的版本范围，并使用latest注册表中标记的版本。
  大版本升级会让你手动选择要升级的工具包，尽量选择范围调整到最小，以防止项目出现问题
- 小版本升级一般不会影响现在的工具使用，大版本升级要慎用，由于最新的ES语法babel不能识别，特地将babel进行了大版本升级。

==推荐使用第二种`yarn upgrade-interactive --latest`不需要安装过多的依赖就可以达到目的==

::: 



大胆尝试更新，运行报错无法解决我们再退回到以前版本即可。

执行命令后依赖版本如下:

```json
{
  "name": "reco-demo",
  "version": "1.0.0",
  "author": "nanci",
  "scripts": {
    "dev": "vuepress dev . --open --host \"localhost\"",
    "build": "vuepress build ."
  },
  "devDependencies": {
    "vuepress": "1.8.1",
    "vuepress-theme-reco": "1.6.4"
  },
  "description": "Create a blog template with vuepress-theme-reco."
}
```

**4、测试运行**

发现页面空白，后台也没有任何报错信息

去到github官网查看[`vuepress-theme-reco`的发布版本](https://github.com/vuepress-reco/vuepress-theme-reco/releases)，当前已发布版本如下：

![](./assets/vuepress07.png)

发现1.6.2、1.6.3、1.6.4 才是最近发布的，可能存在不少bug，查看`issue`，找到这样的信息

![](./assets/vuepress52.png)

明确是版本的问题，我们还是还是切换回之前的1.6.1版本。

测试发现，只要改用`"vuepress-theme-reco": "1.6.1"`就能正常显示，所以在更新依赖的时候不更新`vuepress-theme-reco`就可以了



**5、修改配置文件config.js**

修改的同时我们也可以安装一些实用的插件

```sh
// 阅读进度条
yarn add vuepress-plugin-reading-progress 
// 代码一键复制
yarn add @mr-hope/vuepress-plugin-copy-code 
或
yarn add @xiaopanda/vuepress-plugin-code-copy
// RSS
yarn add @vuepress-reco/vuepress-plugin-rss 
// 加载进度条
yarn add @vuepress/plugin-nprogress 
// 音乐
yarn add vuepress-plugin-meting 
```

**config.js**完整内容如下：

```js
module.exports = {
  host: "127.0.0.1", // 生成网页地址（本地调试使用）
  port: "65535", // 生成网页端口（本地调试使用）
  title: "reco-demo", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "A blog template with vuepress-theme-reco.", // meta 中的描述文字，用于SEO
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }], //浏览器的标签栏的网页图标,基地址/.vuepress/public
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ], //在移动端，搜索框在获得焦点时会放大
  ],
  theme: "reco", //选择主题‘reco’
  themeConfig: {
    type: "blog", //选择类型博客
    fullscreen: true,
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认 “标签”
      },
      socialLinks: [
        { icon: "reco-github", link: "https://github.com/small-universe" },
        { icon: "reco-qq", link: "tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1715261428" },
        { icon: "reco-mail", link: "mailto:18846770224@163.com" },
        { icon: "reco-gitee", link: "https://gitee.com/small-universe" },
        { icon: "reco-csdn", link: "https://blog.csdn.net/qq_39839033/"  },
      ],
    },
    nav: [
      //导航栏设置
      {text: '首页', link: '/', icon: 'reco-home'},
    { text: "时间线", link: "/timeline/", icon: "reco-date" },
    {
        text: "联系",
        icon: "reco-message",
        items: [
            {text: '七七部落', link: 'http://qiqi.dreamagain.top/', icon: 'reco-logo'},
            {text: 'GitHub', link: 'https://github.com/small-universe/qiqi-algorithm', icon: 'reco-github'},
            {text: "CSDN", link: "https://blog.csdn.net/qq_27961843/", icon: "reco-csdn"},
            {text: "QQ", link: "tencent://message/?uin=1715261428", icon: "reco-qq"},
            {text: "Gmail", link: "mailto:18846770224@163.com", icon: "reco-mail"},
        ],
    },
    ],

    // displayAllHeaders: true, // 默认值：false
    subSidebar: "auto",

    record: "滇ICP备20004889号-1",
    recordLink: "https://icp.chinaz.com/home/info?host=dreamagain.top",
    // cyberSecurityRecord: "全国互联网安全管理服务平台",
    // cyberSecurityLink:
    //   "http://www.beian.gov.cn/portal/registerSystemInfo",
    startYear: "2021", // 项目开始时间，只填写年份
    lastUpdated: "最后更新时间", // string | boolean
    author: "nanci",
    authorAvatar: "/avatar.jpg", //作者头像
    mode: "light", //默认显示白天模式
    codeTheme: "okaidia", // default 'tomorrow'
    smooth: "true", //平滑滚动
    // 评论设置,结合github actions使用，避免暴露个人重要信息
    valineConfig: {
      appId: process.env.LEANCLOUD_APP_ID,
      appKey: process.env.LEANCLOUD_APP_KEY,
    },
  },
  markdown: {
    lineNumbers: true, //代码显示行号
  }, // 搜索设置
  search: true,
  searchMaxSuggestions: 10, // 插件
  plugins: [
    // 音乐
    [
      "meting",
      {
        // metingApi: "https://meting.sigure.xyz/api/music",
        meting: {
          server: "netease",
          type: "playlist",
          // 歌单id
          mid: "3047591896",
        },
        aplayer: {
          lrcType: 3,
          theme: "#3489fd",
        },
      },
    ],
    // ],
    [
      "@vuepress-reco/vuepress-plugin-rss", //RSS插件
      {
        site_url: "http://algorithm.dreamagain.top", //网站地址
        copyright: "nanci", //版权署名
      },
    ],
    ["@vuepress/nprogress"], // 加载进度条
    ["reading-progress"], // 阅读进度条
    ["vuepress-plugin-code-copy"], //一键复制代码插件
  ],
};

```



### （二）修改主题

**1、添加图标**

主题有默认图标，如果还不满足需求，怎么办？引入阿里妈妈提供的矢量图标库

**第一步：**

首先你需要登录并创建自己的一下项目，如下示例：

<img src="./assets/vuepress08.png" style="zoom: 80%;" />



为了统一图标前缀，新建一个项目`reco-demo`并添加一个gitee的图标，如下图所示：

==新建项目reco-demo== :

<img src="./assets/vuepress09.png" style="zoom:80%;" />

==添加图标gitee== ：

<img src="./assets/vuepress10.png" style="zoom: 50%;" />



**第二步：**

在.vuepress/styles/下创建一个index.styl文件，将上图所示的代码添加进去

```css
//.vuepress/styles/index.styl

@import '//at.alicdn.com/t/font_2372941_unkgma3bras.css'
```

这也是上面配置`config.js`留下的一个小坑，个人信息栏没有显示**gitee**，也就是默认图标库中没有`reco-gitee`这个图标

![](./assets/vuepress11.png)

**第三步：**

运行测试，图标可以正常显示。在其他地方扩展图标也是按照这样的步骤来就可以

![](./assets/vuepress12.png)



### （三）修改默认主题

::: tip 

- 学习的话可以花些时间捣鼓捣鼓
- 使用的话可以直接跳过此节

:::

在使用默认主题的情况下可将默认主题的各功能组件释放出来，只需执行命令：

```sh
 vuepress eject docs
```

 你会发现，在根目录下，多了一个theme文件夹，如下：

![](./assets/vuepress13.png)


 上图列出了主要的布局组件，只需在其中做适量修改以满足业务需求即可。

不过我们用的`vuepress-theme-reco`主题已经很强大了，没有必要花费太多精力在搭建博客上面，而是花更多的时间在内容创作上。





### （四）客户端增强

如果你想对自己的应用做一些优化，比如使用router做登录拦截、给Vue实例挂载全局变量或注册其他组件等，可以在.vuepress下新建文件`enhanceApp.js`：

```dart
export default ({
  Vue, // vuepress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
}
```

这个文件类似于`vue-cli`脚手架中的main.js文件

这个功能还是比较实用的，可以引入你想要的vue组件库并在md文件中使用。或者利用组件库来封装一个自定义组件。

**1、尝试集成Element-UI组件**

参照[Element-UI官方文档](https://element.eleme.cn/#/zh-CN/component/installation)

（1）安装组件

```sh
yarn add element-ui
```

（2）引入组件

```js
//.vuepress/enhanceApp.js

/**
 * 扩展 vuepress 应用
 */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue, 
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Element)
}
```

在扩展之后，就可以在自定义的组件或者md文件中使用element的组件了。

（3）测试在md中使用

创建` blogs/components/element-ui.md`，内容如下

::: details  element-ui.md

```md
---
title: Element-UI Test
date: 2021-1-15
tags:
  - element-ui
categories:
  - Vue Components
---
<template>
<el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>

<el-row>
  <el-button plain>朴素按钮</el-button>
  <el-button type="primary" plain>主要按钮</el-button>
  <el-button type="success" plain>成功按钮</el-button>
  <el-button type="info" plain>信息按钮</el-button>
  <el-button type="warning" plain>警告按钮</el-button>
  <el-button type="danger" plain>危险按钮</el-button>
</el-row>

<el-row>
  <el-button round>圆角按钮</el-button>
  <el-button type="primary" round>主要按钮</el-button>
  <el-button type="success" round>成功按钮</el-button>
  <el-button type="info" round>信息按钮</el-button>
  <el-button type="warning" round>警告按钮</el-button>
  <el-button type="danger" round>危险按钮</el-button>
</el-row>

<el-row>
  <el-button icon="el-icon-search" circle></el-button>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-row>
</template>

```

:::

（4）运行测试

页面空白，打开控制台查看报错信息

![](./assets/vuepress14.png)



::: tip 问题解决

使用命令安装依赖

```sh
yarn add async-validator@1.11.5 
或
npm install async-validator@1.11.5
```

另外，使用命令：

```
npx vuepress info
```

查看vue包的版本，有助于查看版本是否对应

::: right 感谢

[无休止的bug](https://blog.csdn.net/qq_32855007/article/details/108726430) 



::: 



再次运行，页面可以正常显示

点击文章Element-UI Test，显示的效果如下

![](./assets/vuepress15.png)

在npm官网中也可以找到相关的插件，我们可以免去自己集成的麻烦。经测试，插件[vuepress-plugin-element-ui](https://superbiger.github.io/vuepress-plugin-tabs/)可以正常使用。使用yarn安装网站能正常使用，但如果使用npm安装就不行，页面显示是空白的，好在对应github仓库的issue中已经给出解决方法，就是版本对应的问题。

不过如果你要用这个插件就使用yarn来安装，减少不必要的麻烦。

![](./assets/vuepress51.png)



**2、尝试集成View UI组件**

::: warning 提示

View UI原来叫做iview，[官方文档]()

:::

（1）安装iview

```sh
yarn add view-design
```

（2）引入组件

```js
/**
 * 扩展 vuepress 应用
 */
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


export default ({
                    Vue,
                }) => {
    // ...做一些其他的应用级别的优化
    // Vue.use(Element);
    Vue.use(ViewUI);

}
```

（3）在md中测试

创建` blogs/components/view-ui.md`，内容如下

::: details view-ui.md

```md
---
title: View UI Test
date: 2021-01-15
tags:
  - iview
  - view ui
categories:
  - Vue Components
---
<template>
    <Row>
        <Col span="8">
            <Menu :theme="theme2">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper" />
                        内容管理
                    </template>
                    <MenuItem name="1-1">文章管理</MenuItem>
                    <MenuItem name="1-2">评论管理</MenuItem>
                    <MenuItem name="1-3">举报管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people" />
                        用户管理
                    </template>
                    <MenuItem name="2-1">新增用户</MenuItem>
                    <MenuItem name="2-2">活跃用户</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Col>
        <Col span="8">
            <Menu :theme="theme2" active-name="1-2" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper" />
                        内容管理
                    </template>
                    <MenuItem name="1-1">文章管理</MenuItem>
                    <MenuItem name="1-2">评论管理</MenuItem>
                    <MenuItem name="1-3">举报管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people" />
                        用户管理
                    </template>
                    <MenuItem name="2-1">新增用户</MenuItem>
                    <MenuItem name="2-2">活跃用户</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Col>
        <Col span="8">
            <Menu :theme="theme2" :open-names="['1']" accordion>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper" />
                        内容管理
                    </template>
                    <MenuItem name="1-1">文章管理</MenuItem>
                    <MenuItem name="1-2">评论管理</MenuItem>
                    <MenuItem name="1-3">举报管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people" />
                        用户管理
                    </template>
                    <MenuItem name="2-1">新增用户</MenuItem>
                    <MenuItem name="2-2">活跃用户</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Col>
    </Row>
    <br>
    <p>Change theme</p>
    <RadioGroup v-model="theme2">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
        data () {
            return {
                theme2: 'light'
            }
        }
    }
</script>

```

:::

（4）运行测试

发现页面空白，控制台信息如下，所以不知道是哪里有问题

![](./assets/vuepress16.png)

索性把enhanceApp.js内容全部注释，页面恢复正常。为什么会这样，原因未知，有待继续深入学习。

参照view ui文档中的main.js

![](./assets/vuepress17.png)

修改enhanceApp.js的内容如下：

```js
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

export default ({
                    Vue,
                }) => {
    // ...做一些其他的应用级别的优化
    // Vue.use(Element);
}
```

查看首页面已经能够正常显示，点开View UI Test文章查看，效果也正常显示

![](./assets/vuepress18.png)



以上测试了两个前端常用的组件库Element-UI和View UI，其他的组件库的使用也是类似，如果出现页面空白而后台没有报错的情况，先查看浏览器控制台报错信息，问题不明显可百度查找解决方法。

::: tip

**修改enhanceApp.js内容后项目不用重启，直接看浏览器中是否正常显示**。

:::



### （五）个性化组件开发

上一小节演示的是直接在md文件中使用vue，实际写博客时这样操作就失去了写博客的初衷了，所以我们一般都是利用第三方的组件库来便携编写一个我们自己的组件，方便我们在md文件中使用

如果我们需要开发自己的组件，那么在`.vuepress`下新建`components`文件夹，可以在里面编写vue文件，与vue-cli开发无异，而且，组件是全局注册的，组件之间互相调用，不用手动引入，**在md文件中，在theme中都可以使用**。

下图是对应的官方说明

<img src="./assets/vuepress19.png" style="zoom:80%;" />



### （六）博客的自动路由

vuepress是一个单页面应用，所谓路由，是VueRouter模拟出来的假象，通过官方对[元数据](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#%E7%BD%91%E7%AB%99%E5%92%8C%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%85%83%E6%95%B0%E6%8D%AE) 的描述，我们可以了解到`vuepress`能够提供博客中的分类、标签、时间线等功能支持主要就是使用元数据 **$page** 来实现，看一下官方文档中比较关键的说明：

::: info 元数据

`pages` 是一个包含了每个页面元数据对象的数据，包括它的路径、页面标题（明确地通过 [YAML front matter](https://vuepress.vuejs.org/zh/guide/markdown.html#front-matter) 指定，或者通过该页面的第一个标题取到），以及所有源文件中的 `YAML front matter` 的数据。

如果用户在 `.vuepress/config.js` 配置了 `themeConfig`，你将可以通过 `$site.themeConfig` 访问到它。如此一来，你可以通过它来对用户开放一些自定义主题的配置 —— 比如指定目录或者页面的顺序，你也可以结合 `$site.pages` 来动态地构建导航链接。

最后，别忘了，作为 Vue Router API 的一部分，`this.$route` 和 `this.$router` 同样可以使用。

:::

没错，**$pages**它记录了所有md文件的元数据，我可以通过在元数据中添加分类、标签，以及时间来实现路由。

每一次新写的文章，无需在config.js中设置路由，只需要在md中按照元数据的格式，设置好type(分类),tags(标签)。

最后编译，push到github，就可以在相应的菜单中看到它。

==如果你有兴趣去做一些相关开发，元数据是你得好好深入学习一下==



### （七）导航栏与侧边栏

我们不必把导航栏和侧边栏的配置都放到config.js中，我们可以单独配置然后在config.js中引用

**1、.vuepress下创建以下的文件结构**

```js
.vuepress
├─ config
	├─ navbar
    |  └── index.js
	└─ sidebar
       └── index.js

```

navbar/index.js内容

```js
module.exports=[

    {text: '首页', link: '/', icon: 'reco-home'},
    { text: "时间线", link: "/timeline/", icon: "reco-date" },
    {
        text: "联系",
        icon: "reco-message",
        items: [
            {text: '七七部落', link: 'http://qiqi.dreamagain.top/', icon: 'reco-logo'},
            {text: 'GitHub', link: 'https://github.com/small-universe/qiqi-algorithm', icon: 'reco-github'},
            {text: "CSDN", link: "https://blog.csdn.net/qq_27961843/", icon: "reco-csdn"},
            {text: "QQ", link: "tencent://message/?uin=1715261428", icon: "reco-qq"},
            {text: "Gmail", link: "mailto:18846770224@163.com", icon: "reco-mail"},
        ],
    },
]

```

sidebar/index.js内容

```
//侧边栏
module.exports = {
    '/blogs/': [
        {
            title: '分类一',
            collapsable: false,
            children: [
                './category1/2018/121501',
                './category1/2019/092101',
            ]
        },
        {
            title: '分类二',
            collapsable: false,
            children: [
                './category2/2016/121501',
                './category2/2017/092101',
            ]
        },
        {
            title: '组件',
            // collapsable: false,
            children: [
                './components/element-ui',
                './components/view-ui',
            ]
        },
    ],

}


```

**2、config.js中导入**

```js {1,2,7,8}
const sidebar = require('./config/sidebar')
const nav = require('./config/navbar')
......
  themeConfig: {
    type: "blog", //选择类型博客
    fullscreen: true,
    nav, //导航栏设置
    sidebar, //侧边栏
    subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
  }
......
```

**3、测试**

![](./assets/vuepress20.png)

::: info 问题小结

1. ~~切换主题颜色的按钮样式改变，如下图所示~~ ：==引入第三方组件库导致==

2. ~~点击标签，页面跳转后显示空白~~：==引入第三方组件库导致==

   ![](./assets/vuepress50.png)

3. ~~去除组件库后，按钮样式正常，标签和分类功能出现返回时页面404~~： ==标签和分类不能是中文，不能有空格==

当前版本还是存在一些不足之处，坐等主题稳定新版本。

:::

## 四、部署

### （一）通过deploy.sh脚本部署

在项目的根路径下创建脚本deploy.sh，内容如下：

```
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd .vuepress/dist

# 如果是发布到自定义域名
#　echo 'reco-demo.dreamagain.top' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f git@github.com:small-universe/reco-demo.git master:gh-pages

cd -

```

在package.json的script中添加如下内容

```json {2}
"scripts": {
    "deploy": "deploy.sh"
  },
```

执行命令

```sh
yarn run deploy
```

项目构建的静态文件已经被发布到对应的github仓库的gh-pages分支

![](./assets/vuepress21.png)



点开仓库的设置往下找到GitHub Pages

![](./assets/vuepress22.png)

![](./assets/vuepress23.png)



访问https://small-universe.github.io/reco-demo/，结果surprise，我们的页面样式丢失了。

![](./assets/vuepress24.png)

==更多的报错信息说是无法加载静态资源：==

<img src="./assets/vuepress25.png" style="zoom:80%;" />

​		仔细查看访问静态资源使用的都是'/'开头，说明默认是从根路径开始查找，但是实际上我们应该使用相对路径，接下来怎么办？

​        回头再仔细看看官方文档有没有什么被我们忽略的说明。



果然在[基本配置](https://vuepress.vuejs.org/zh/config/#base)里有这样的说明：

![](./assets/vuepress26.png)

那就在config.js中配置一下`base: "/reco-demo/",`

```js
module.exports = {
  host: "127.0.0.1", // 生成网页地址（本地调试使用）
  port: "65535", // 生成网页端口（本地调试使用）
  title: "reco-demo", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "A blog template with vuepress-theme-reco.", // meta 中的描述文字，用于SEO
  base: "/reco-demo/",
  ......
}
```

再执行一下命令`yarn run deploy`，这次正常显示了

![](./assets/vuepress27.png)

::: tip

配置到此，基本的使用是没有问题了，可以开开心心写博客了。

但还有下面几个步骤，推荐配置一下Github Actions自动部署，这样使用起来会更舒心一些，每次只需要push文件到远程仓库即可，使用deploy.sh部署的这种方式就可以不用了。

:::

### （二）Github Actions自动部署（推荐）

在 Github 网页上添加 Github Actions 配置文件，参考[官方的文档](https://docs.github.com/cn/actions/quickstart)，可自行取舍相应内容，其中需要保密的部分需要添加 Github Secrets 环境变量【仓库的 Settings --> Secrets --> Add a new secret】

在看官方文档之前建议看一下简单的入门教程，推荐[阮一峰 GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)，对`Guthub Actions`有基本了解后就可以参照官方文档进行详细的配置

**1、配置步骤：**

第一步: 创建`.github/workflows`目录并在该目录下创建`deploy.yml`文件，内容如下：

```yml
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      # 获取源码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
          ssh-key: ${{ secrets.SSH_PRIVATE_KEY }}
          submodules: true
          fetch-depth: 0
	  # 缓存依赖项配置
      - uses: actions/cache@v2
        id: node-modules
        with:
          path: node_modules/
          key: ${{ runner.os }}-node-modules-${{ hashFiles('yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-
	  # 安装依赖
      - name: Install Deps
        if: steps.node-modules.outputs.cache-hit != 'true'
        run: yarn install --frozen-lockfile

	  # 构建
      - name: Build reco-demo
        run: yarn run build

	  # 部署
      - name: Deploy To gh-pages
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: .vuepress/dist
```

第二步：配置`ACCESS_TOKEN`

1、生成Personal access tokens（ ==仅第一次显示== ）

![](./assets/vuepress29.png)

2、复制 `ACCESS_TOKEN`内容到仓库的Settings --> Secrets-->`ACCESS_TOKEN`

![](./assets/vuepress32.png)



第三步：配置`SSH_PRIVATE_KEY`

1、生成sshkey: 输入命令ssh-keygen -t rsa -C "邮箱地址" 【邮箱地址：注册github时填写的邮箱地址】

```sh
ssh-keygen -t rsa -C "1715261428@qq.com"
```

2、进入.ssh目录

![](./assets/vuepress30.png)

3、复制 id_rsa内容到仓库的 Settings --> Secrets-->SSH_PRIVATE_KEY

![](./assets/vuepress31.png)



第四步：测试

报错如下

![](./assets/vuepress33.png)

我们config.js的配置这样：

```js
const sidebar = require('./config/sidebar')
const nav = require('./config/navbar')
```

本地测试正常，线上就出问题，那我们就配置完整路径

```js
const sidebar = require('./config/sidebar/index.js')
```

再次提交，测试，部署成功。

![](./assets/vuepress34.png)



第五步：配置域名

::: tip 设置域名dns指向（ 补充）

方法有**3种**：

- **第一种：**
  A记录：域名直接映射IP，但是这个IP换成了192.30.252.153或192.30.252.154。
- **第二种：**
  如果域名提供商支持ALIAS或ANAME，将域名指向username.github.io，这样可以在域名解析的时候得到一个动态的IP，这个IP是一台离你最近的镜像主机。
- **第三种：**
  CNMAE：如果你希望使用二级域名访问，将一个二级域名配置成CNAME，指向username.github.io，这样可以在域名解析的时候得到一个动态的IP，这个IP是一台离你最近的镜像主机

这里使用的是第三种方法CNAME。

:::

在域名供应商处新增一个CNAME类型的域名域名解析,记录类型固定的是 ：**CNAME**，记录值就是你的**GitHub**地址

这里还白嫖了百度云CDN加速

![](./assets/vuepress35.png)



Github Pages添加自定义域名，点击`save`等它解析一会

![](./assets/vuepress36.png)

如下图所示，你可以通过域名http://reco-demo.dreamagain.top访问了

![](./assets/vuepress37.png)

访问测试，又是一个surprise！！！,就是惊喜加意外。

![](./assets/vuepress38.png)

如上图中资源的访问路径应该是没有问题，那我们通过deploy.sh直接设置自定义域名试一下

```sh
# 如果是发布到自定义域名
echo 'reco-demo.dreamagain.top' > CNAME
```

执行命令`yarn run deploy`，运行结束后再次访问`reco-demo.dreamagain.top`，样式依旧还是没有出来

两种方式下自定义域名都出现样式丢失，想到之前样式丢失的时候我们加了`base:"/reco-demo/"`，我们注释掉base配置尝试一下。

结果发现注释之后能通过自定义域名正常访问了。

![](./assets/vuepress39.png)



对比一下没有配置自定义域名的情况下如何访问到静态资源的

![](./assets/vuepress40.png)

这就是说明了自定义域名`http://reco-demo.dreamagain.top/`-->`https://small-universe.github.io/reco-demo/`

在vuepress中没有看到这样的说明，那我们就去github中看看自定义域名的相关文档，

![](./assets/vuepress41.png)

与测试时得出的结论有点出入，但大体是一个意思。仓库下配置类自定义域名`reco-demo.dreamagain.top`虽然只是替换的`<user>.github.io`，但此时Gihub Pages服务已经默认通过域名直接访问仓库中资源，所以这时候不用在config.js中添加`base:"/reco-demo/"`了

::: tip 小结

仓库名为`<username>.github.io`或者是使用自定义域名，不用在config.js中配置base字段

不使用自定义域名且仓库名不是`<username>.github.io`,那么`base` 应该被设置成 `"/<仓库名>/"`

:::

**2、完善评论功能**

第一步：[LeanCloud](https://console.leancloud.cn/login)注册并登录

![](./assets/vuepress42.png)

第二步：创建应用

![](./assets/vuepress43.png)

第三步：获取AppKey和AppID

![](./assets/vuepress44.png)

![](./assets/vuepress45.png)

第四步：在仓库中添加刚刚获得的Key和ID

![](./assets/vuepress46.png)

第五步：在deploy.yml中添加如下内容

```yml{3-5}
- name: Build reco-demo
  run: yarn run build
  env:
     LEANCLOUD_APP_ID: ${{ secrets.LEANCLOUD_APP_ID }} # 评论系统的ID
     LEANCLOUD_APP_KEY: ${{ secrets.LEANCLOUD_APP_KEY }} # 评论系统的KEY

```

第六步：测试

![](./assets/vuepress47.png)



### （三）部署到阿里云服务器（可选）

实现步骤：

1. `zip -r dist.zip .vuepress/dist` 将构建的静态文件压缩
2. `appleboy/scp-action@master` 拷贝文件到服务器
3. `appleboy/ssh-action@master` SSH远程登录服务器将原文件备份并解压`dist.zip`
4. 安装配置nginx、测试访问



**1、配置Secrets和yml文件**

需要在Secrets中添加：

- ALIYUN_SERVER_IP ：服务器的IP地址
- ALIYUN_SERVER_USERNAME：服务器用户名
- ALIYUN_SERVER_PASSWORD：服务器登录密码
- ALIYUN_SERVER_PORT：SSH端口

在deploy.yml中添加以下 ==高亮部分== 的代码内容

```yml{36-38,51-94}
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      # 获取源码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
          ssh-key: ${{ secrets.SSH_PRIVATE_KEY }}
          submodules: true
          fetch-depth: 0
      # 缓存依赖项配置
      - uses: actions/cache@v2
        id: node-modules
        with:
          path: node_modules/
          key: ${{ runner.os }}-node-modules-${{ hashFiles('yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-
      # 安装依赖
      - name: Install Deps
        if: steps.node-modules.outputs.cache-hit != 'true'
        run: yarn install --frozen-lockfile

      # 构建项目并压缩为dist.zip
      - name: Build and zip
        run: |
          yarn run build
          cd .vuepress
          zip -r dist.zip ./dist
        env:
          LEANCLOUD_APP_ID: ${{ secrets.LEANCLOUD_APP_ID }} # 评论系统的ID
          LEANCLOUD_APP_KEY: ${{ secrets.LEANCLOUD_APP_KEY }} # 评论系统的KEY

      # 部署到gh-pages分支
      - name: Deploy To gh-pages
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: .vuepress/dist

      # Scp脚本拷贝dist.zip到服务器
      - name: Scp file to aliyun
        uses: appleboy/scp-action@master
        with:
          # IP地址
          host: ${{ secrets.ALIYUN_SERVER_IP }}
          # 用户，如：root等
          username: ${{ secrets.ALIYUN_SERVER_USERNAME }}
          # 密码
          password: ${{ secrets.ALIYUN_SERVER_PASSWORD }}
          # ssh端口，如：22
          port: ${{ secrets.ALIYUN_SERVER_PORT }}
          source: ".vuepress/dist.zip"
          # 将文件拷贝到服务器
          target: "/home/tmp"

      # 备份、解压、删除
      - name: Backup and unzip
        uses: appleboy/ssh-action@master
        with:
          # IP地址
          host: ${{ secrets.ALIYUN_SERVER_IP }}
          # 用户，如:root等
          username: ${{ secrets.ALIYUN_SERVER_USERNAME }}
          # 密码
          password: ${{ secrets.ALIYUN_SERVER_PASSWORD }}
          # ssh端口，如：22
          port: ${{ secrets.ALIYUN_SERVER_PORT }}
          # 先备份再解压
          script: |
            echo "################# files remove #################"
            if [ -f "/home/web/reco-demo-bak" ];then
              rm -rf /home/web/reco-demo-bak
              echo "reco-demo-bak exists and is deleted"
            fi
            echo "################# files backup #################"
            if [ -f "/home/web/reco-demo" ];then
              mv /home/web/reco-demo /home/web/reco-demo-bak
              echo "reco-demo exists and is backuped"
            else
              mkdir /home/web/reco-demo
            fi
            echo "################# unzip dist.zip #################"
            unzip -od  /home/web/reco-demo /home/tmp/dist.zip


```



**2、配置nginx**

::: tip  

[Linux安装Nginx]()

默认的`nginx.conf`文件会帮你将`.*\.(js|css)?$`

文件和 `.*\.(gif|jpg|jpeg|png|bmp|swf|ico)$`这些文件进行缓存

:::

修改`nginx.conf`内容如下：

```json{25-38}

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
    	#监听的是80端口，不建议换成其他端口，因为换成其他端口后，你访问时，域名也得加上加上端口，
        #比如端口号改成8080，访问时则是： reco-demo.dreamagain.top:8080
        listen       80;
        server_name  demo.dreamagain.top;

        #如果访问的是ip，则直接返回404，此处只允许通过域名访问
		if ($host ~ "\d+\.\d+\.\d+\.\d") {
    			return 404;
		}

        location / {
            root   /home/web/reco-demo/dist;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}

```

::: info nginx常用命令

./nginx   启动nginx 

./nginx -s stop 关闭nginx 

./nginx -s quit  退出nginx 

 ./nginx -s reload 重启nginx（重启用户基本感觉不到）

:::

访问`demo.dreamagain.top`，页面正常显示，测试成功

![](./assets/vuepress49.png)



## 五、写在最后的话

如此折腾，做一个属于自己的博客，其实也不会有几个人能看到，毕竟沧海一粟，如此平凡。

这篇博客正好是自己第一次入坑vuepress的心路历程，特此复现记录在此，限于主要从事Java开发，前端学习的不是很深入，很多问题也是点到即止，有什么建议可以评论区留言，这篇博客内容将会不断的更新完善，努力做到简洁、通俗易懂。

如果你有幸看到此篇博客，并且内容正好能解决你当前遇到的问题，欢迎留言支持 (/≧▽≦/) 。



::: tip 感谢

1. [VuePress](https://vuepress.vuejs.org/zh/) 
2.   [vuepress-theme-reco](https://vuepress-reco-doc.now.sh/)

3. [南宫__](https://www.jianshu.com/p/37509da5a020)
4. [kobuta](https://www.jianshu.com/p/2220dbacfde1)
5. [Tsanfer's Blog](https://tsanfer.xyz/)

:::
