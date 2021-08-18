---
title: Markdown指南
category: 使用指南
author: 𝓜𝓻. 𝓗𝓸𝓹𝓮
tag:
  - markdown
---

`vuepress-theme-hope` 通过内置 [md-enhance](https://vuepress-md-enhance.mrhope.site)，在 Markdown 中启用了更多的语法与新功能。

<!-- more -->

## 一键启用

你可以设置 `themeconfig.mdEnhance.enableAll` 启用 [md-enhance](https://vuepress-md-enhance.mrhope.site) 插件的所有功能。

```js {3-5}
module.exports = {
    themeConfig: {
        mdEnhance: {
            enableAll: true,
        },
    },
};
```

## 新增的更多语法

### 上下角标

19^th^ H~2~O

::: details 代码

```md
19^th^ H~2~O
```

:::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/sup-sub/)

### 自定义对齐

::: center
我是居中的
:::

::: right
我在右对齐
:::

:::: details 代码

```md
::: center
我是居中的
:::

::: right
我在右对齐
:::
```

::::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/align/)

### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

::: details 代码

```md
此文字有脚注[^first].

[^first]: 这是脚注内容
```

:::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/footnote/)

### 标记

你可以标记 ==重要的内容== 。

::: details 代码

```md
你可以标记 ==重要的内容== 。
```

:::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/mark/)

### 流程图

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

::: details 代码

```md
@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend
```

:::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/flowchart/)

### Tex 语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

::: details 代码

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/tex/)

### 代码案例

::: demo 一个普通 Demo

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
    alert("十分帅");
});
```

```css
span {
    color: red;
}
```

:::

:::: details 代码

````md
::: demo 一个普通 Demo

​```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
});
```

```css
span {
  color: red;
}
```

:::



:::: details 代码

````md
::: demo [react] 一个 React Demo

​```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "十分帅" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::



````
::::

::: demo [vue] 一个 Vue Demo

​```vue
<template>
  <div class="box-vue">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box-vue span {
  color: red;
}
</style>
```

:::

:::: details 代码

````md
::: demo [vue] 一个 Vue Demo

​```vue
<template>
  <div class="box-vue">
    Mr.Hope <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
};
</script>
<style>
.box-vue span {
  color: red;
}
</style>
```

:::

````
::::

::: demo 一个普通 Demo

​```md
# 标题

十分帅
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

:::: details 代码

````md
::: demo 一个普通 Demo

​```md
# 标题

十分帅
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

````
::::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/demo/)

### 幻灯片

@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

​```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

::: details 代码

````md
@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

​```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

````
:::

- [点击查看](https://vuepress-theme.mrhope.site/zh/guide/feature/markdown/presentation/)

## 其他语法

::: info 自定义标题
信息容器
:::

::: tip 自定义标题
提示容器
:::

::: warning 自定义标题
警告容器
:::

::: danger 自定义标题
危险容器
:::

::: details 自定义标题
详情容器
:::

:::: details 代码

​```md
::: info 自定义标题
信息容器
:::

::: tip 自定义标题
提示容器
:::

::: warning 自定义标题
警告容器
:::

::: danger 自定义标题
危险容器
:::

::: details 自定义标题
详情容器
:::
```

::::
