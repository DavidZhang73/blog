---
title: "更好看的符号: 连字 (Ligature)"
categories:
  - 效率
tags:
  - Font
date: 2023-04-21 22:33:30
cover: /img/ligatures.svg
---

## 什么是连字

![Jetbrains Mono 一种支持连字的编程字体。](/img/ligatures.svg)

连字，本来说的是英文字母（或者其他语言）中的一种特殊组合，比如 `fi`，`fl`，`ff` 等等。这些组合在印刷时会被合并成一个字形，以节省空间。后来这种技术被应用到了编程字体中，尤其是符号，以提高可读性。就像上图中的 `++`，`<=`，`->` 其实都是两个或者以上的符号的组合。

## 编程连字字体

![Fira Code 连字符号。](https://raw.githubusercontent.com/tonsky/FiraCode/master/extras/logo.svg)
![Cascadia Code 连字符号。](https://raw.githubusercontent.com/microsoft/cascadia-code/main/images/ligatures.png)

其实现在很多专为编程开发的字体都支持连字，比如：

- [Fira Code](https://github.com/tonsky/FiraCode)
- [Jetbrains Mono](https://www.jetbrains.com/lp/mono/)
- [Cascadia Code](https://github.com/microsoft/cascadia-code)

如果使用的 `Scoop` 的话，可以直接安装：

```powershell
scoop add bucket nerd-fonts
scoop install FiraCode
scoop install JetBrains-Mono
scoop install Cascadia-Code
```

## IDE 中的连字

**VSCode**

在 `settings.json` 中，

```json
"editor.fontLigatures": true
```

**PyCharm**

在 `Settings` -> `Editor` -> `Font` 中，勾选 `Enable font ligatures`。

:::tip
Windows Terminal 默认开启连字，只需要把字体更换成支持连字的字体即可。
:::

## 网页中的连字

其实大多数对连字的支持都源自于 CSS 的 [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) 属性，例如：

<div style="font-size: 4rem; text-align: center">
  <div style="font-feature-settings: 'liga' on">ff fi fl</div>
  <div style="font-feature-settings: 'liga' off">ff fi fl</div>
</div>

```html
<div style="font-size: 4rem; text-align: center">
  <div style="font-feature-settings: 'liga' on">ff fi fl</div>
  <div style="font-feature-settings: 'liga' off">ff fi fl</div>
</div>
```
