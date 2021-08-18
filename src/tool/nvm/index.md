---
title: windows下安装多版本Node
category: 软件使用
tags:
  - windows
  - nvm
  - Node.js
---

![](https://img.shields.io/badge/nvm-blue.svg)  ![](https://img.shields.io/badge/Node.js-blue.svg) ![](https://img.shields.io/badge/npm -blue.svg)  ![](https://img.shields.io/badge/yarn-blue.svg)

<!-- more -->

对于Node.js的爱好者来说，必然希望能够在同一台机器上安装多个版本的Node.js(至少两个：稳定版和最新版)。稳定版用来在实际生产项目中使用，最新版本用来研究Node.js的新特性、踩坑。

以下将介绍在windows系统中如何通过nvm进行node多版本管理以及一些常用命令

## 一、概念介绍

`nvm`：Node.js Version Manager，用来管理 node 的版本。

`node`：Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js使用了一个事件驱动、非阻塞式I/O的模型（ Node.js的特性），使其轻量级又高效。 Node.js 的包管理器 nmp 是全球最大的开源库生态系统。

`npm`：Node Package Manager，npm 不需要单独安装。默认在安装 node 的时候，会连带一起安装 npm

`cnpm`：淘宝镜像，自定义命令。介绍详见https://github.com/cnpm/cnpm

`yarn`：Yarn 是 Facebook, Google, Exponent 和 Tilde 开发的一款新的 JavaScript 包管理工具。它的目的是解决这些团队使用 npm 面临的少数问题，即：

1、安装的时候无法保证速度、一致性；

2、安全问题，因为 npm 安装时允许运行代码；

3、more...



## 二、安装及使用

::: info nvm-windows的地址

nvm-windows的github地址:https://github.com/coreybutler/nvm-windows

安装包下载地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

:::

### （一）安装包下载

可以看到nvm已经很久没有更新了，目前最新版本也是2018年发布的，这也是长期支持的版本，可以选择安装版`nvm-setup.zip`和免安装版`nvm-noinstall.zip`，这里我选择的是`nvm-setup.zip`

![](./assets/nvm01.png)



### （二）安装环境

Win10系统，64位



### （三）安装

安装nvm-windows的时候会指定安装目录和当前所使用的Node.js的目录，这两个路径中不要带有特殊的字符以及空格，否则会在nvm use xxx的时候出错，无法正确解析指定的Node.js的版本的地址

在安装的时候，自动会把nvm和Node.js的目录添加到系统环境变量中，所以安装后可以直接测试安装是否成功。

> <img src="./assets/nvm02.png" style="zoom:100%;" />
>
> <img src="./assets/nvm03.png" style="zoom:90%;" />



### （四）nvm命令

<img src="./assets/nvm04.png" alt="image-20210211112509359" style="zoom:70%;" />



1、nvm list 是查找本电脑上所有的node版本

- nvm list 查看已经安装的版本

- nvm list installed 查看已经安装的版本
-  nvm list available 查看网络可以安装的版本

2、nvm install 安装最新版本nvm

-  nvm install xxx 安装指定node版本，可模糊安装，nvm install v8.12.0 或 nvm install 8.12.0 或 nvm install 8.12

3、nvm use `<version> ` 切换使用指定的版本node

4、nvm ls 列出所有版本

5、nvm current显示当前版本

6、nvm alias` <name> <version>` 给不同的版本号添加别名

7、nvm unalias `<name>` 删除已定义的别名

8、nvm reinstall-packages `<version>` #在当前版本node环境下，重新全局安装指定版本号的npm包

9、nvm on 打开Node.js控制

10、nvm off 关闭Node.js控制

11、nvm proxy 查看设置与代理

12、nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://Node.js.org/dist/
　　       nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.

13、nvm uninstall `<version>` 卸载制定的版本

14、nvm use [version] [arch] 切换制定的node版本和位数

15、nvm root [path] 设置和查看root路径

16、nvm version 查看当前的版本

### （五）安装 Node.js 

**1、获取所有可安装的 Node.js 版本**

```shell
nvm list available
```

以下也只是给我们列出部分较新的版本，根据环境需要找合适的版本安装。

比较贴心的告诉我们，要查看完整的系列版本访问 ：https://Node.js.org/download/release

`LTS` 指最新稳定版本，`CURRENT` 指最新版本，一般安装 `LTS`

![](./assets/nvm05.png)



**2、安装指定版本的 Node.js**

```shell
nvm install 10.16.3
```



**3、列出所有已经安装的版本**

```shell
nvm list
```

<img src="./assets/nvm06.png" style="zoom:110%;" />



**4、指定当前要使用的 Node.js 版本,只用指定使用的 Node.js 版本后，Node.js 的才真正安装了。**

```shell
nvm use 10.16.3
```

版本查看：

<img src="./assets/nvm07.png" style="zoom:120%;" />

::: tip 

通过以上步骤安装的Node.js和单独安装Node.js没有太大的区别，所以可以和单独安装的Node.js一样放心的使用npm进行cordova、ionic、vue等等的安装

npm是Node.js自带的包管理工具，类似于Java开发中经常使用的maven

:::

**5、卸载某个 Node.js 版本**

```shell
nvm uninstall 12.20.0
```



## 三、Node.js 包管理器

Node.js 包管理器一览表

- npm
- cnpm
- yarn

npm 是 Node.js 自带的包管理器，但是默认下载依赖包的地址是国外服务器，下载速度较慢。使用 npm ,下载包两小时，敲代码 5 分钟。所以使用的时候指定安装源为国内的镜像源。

阿里巴巴是 Node.js 前端非常重视 Node.js 的使用，于是，淘宝开发了 cnpm,使用与 npm 一致，默认下载是国内地址，下载速度快得飞起。下载地址[https://npm.taobao.org](https://npm.taobao.org/)

[yarn](https://yarnpkg.com/zh-Hans/) 是 facebook 开发的新一代包管理器，主要是解决依赖包的安装问题。支持离线安装依赖包，同时依赖包的安装顺序不会出错。

 

### （一）国内npm镜像源设置

**1、国内npm镜像源**

- 淘宝npm镜像

  搜索地址：http://npm.taobao.org/

  registry地址：http://registry.npm.taobao.org/

- cnpmjs镜像

  搜索地址：http://cnpmjs.org/

  registry地址：http://r.cnpmjs.org/

- 使用方法：

  临时使用`npm --registry https://registry.npm.taobao.org install express`

  持久使用`npm config set registry https://registry.npm.taobao.org`

**以配置淘宝镜像为例：**

1、修改下载仓库为淘宝镜像

```shell
npm config set registry http://registry.npm.taobao.org/
或 
yarn config set registry https://registry.npm.taobao.org
```

如果需要安装node-sass，最好设置变量 sass_binary_site，指向淘宝镜像地址，很多时候环境安装不成功就是sass安装失败

```shell
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
或
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

2、 如果需要修改回来

```shell
npm config set registry https://registry.npmjs.org/
或 
yarn config set registry https://registry.yarnpkg.com
```

3、或直接采用他们的cnpm

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



**2、配置完成后可通过下面方式来验证是否成功**

```shell
npm config get registry
或npm info express
```



### （二）安装Yarn

**通过npm安装**

```shell
# -g 全局安装
# -d 局部安装
npm install -g yarn
或者
npm i yarn -g
```

**查看版本**

<img src="./assets/nvm08.png" style="zoom:150%;" />

**Yarn 淘宝源配置**

```shell
yarn config set registry https://registry.npm.taobao.org -g

yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```



### （二）npm yarn 命令对照表

| npm                                     | Yarn                               |
| --------------------------------------- | ---------------------------------- |
| npm install                             | yarn install                       |
| (N/A)                                   | yarn install --flat                |
| (N/A)                                   | yarn install --har                 |
| (N/A)                                   | yarn install --no-lockfile         |
| (N/A)                                   | yarn install --pure-lockfile       |
| npm install [package]                   | (N/A)                              |
| npm install --save [package]            | yarn add [package]                 |
| npm install --save-dev [package]        | yarn add [package] [--dev/-D]      |
| (N/A)                                   | yarn add [package] [--peer/-P]     |
| npm install --save-optional [package]   | yarn add [package] [--optional/-O] |
| npm install --save-exact [package]      | yarn add [package] [--exact/-E]    |
| (N/A)                                   | yarn add [package] [--tilde/-T]    |
| npm install --global [package]          | yarn global add [package]          |
| npm rebuild                             | yarn install --force               |
| npm uninstall [package]                 | (N/A)                              |
| npm uninstall --save [package]          | yarn remove [package]              |
| npm uninstall --save-dev [package]      | yarn remove [package]              |
| npm uninstall --save-optional [package] | yarn remove [package]              |
| npm cache clean                         | yarn cache clean                   |
| rm -rf node_modules && npm install      | yarn upgrade                       |



## 四、常用指令

上面列出很多命令，仅供查阅使用，下面是经常用到的命令，也不用记，只是刚接触的时候要多看几眼，先熟练用这几个命令

nvm -v ： 查看已安装的nvm版本

nvm install xxx ： 安装指定node版本，可模糊安装

nvm ls ： 查看已安装的所有node版本

node -v ：查看已安装的node版本

npm -v ：查看已安装的npm 版本

yarn -v ：查看已安装的yarn 版本

npm config get registry：查看当前设置的npm镜像源

yarn config get registry ：查看当前设置的yarn镜像源

npm config set registry https://registry.npm.taobao.org

yarn config set registry https://registry.npm.taobao.org 
