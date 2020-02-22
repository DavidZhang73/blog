---
title: 使用 Markdown 编写基于 Latex 的报告
categories:
  - Productivity
tags:
  - Markdown
  - Windows
preview: 300
date: 2020-02-12 19:17:06
mp3: //davidz.cn/static/blog/mp3/huozun---juanzhulian.mp3
cover: //davidz.cn/static/blog/2020-02-12-write-latex-report-with-markdown/cover.jpg
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

## 前言

计算机这个专业，有很多报告要做。在山威的时候，报告格式没有什么限制 Word，PDF 都可以，那个时候我开始使用 Markdown 作为我的排版工具，因为实在是没有时间经历去研究 Word 的各种高级功能（~~主要是懒~~）。Markdown 十分简单，易学，在[Github](https://github.com)等计算机专业相关平台使用也非常广泛，还可以通过各种模板快速生成**好看**，**美观**，**专业**的文档。

后来到了澳国立，老师教授们开始极力鼓吹 Latex 和 PDF，基本上算是软性要求我们使用 Latex 编写，还规定了衬线字体，非衬线字体，字号，段落等等，图片还需要是 SVG 格式的矢量图片（最奇葩的是竟然一整节课只讲这个:joy:），最后生成 PDF 提交（据说这样分数高一些）。所以我开始了漫漫 Latex 学习之路。然而整个过程十分痛苦，装个 TeX Live 跑了好几个小时，换个字体换的我一脸懵逼，预览竟然都不是实时的！！！我甚至觉得还不如 Word 好用，又开始找那些 Latex 编辑器（同学的 MacOS 上有很不错的，然而我是 Windows），之后是在线编辑器[Overleaf](https://www.overleaf.com/)，体验还行，但是一边学习 Latex 一边做实验写报告的体验实在是太差劲了，人都要~~有丝~~分裂了。我就先用 Markdown 记录下来，想着之后再改成 Latex 吧。然后，我用了 2 天左右的时间，找到了 Markdown 直接转报告的方法，就没再碰 Latex（~~还是懒~~）。

## 样例

[eisvogel 主题样例](https://github.com/Wandmalfarbe/pandoc-latex-template/#example-images)

你也可以从[这里](//davidz.cn/static/blog/2020-02-12-write-latex-report-with-markdown/report.pdf)看一下我的成果作为参考，我觉得完全符合我的要求。

## 思路

其实思路很简单，一切的一切都是因为[Pandoc](https://pandoc.org/)这个文档转换软件软件（类似于影音界的格式工厂？）的存在。它官网有一张巨型图片描述了它可以从那些格式转换成那些格式，基本上可以说覆盖了常见的所有文档格式。所以我们就可以用它把 Markown 语言写的文档转换成 PDF 格式的报告，过程中再用一套模板修饰一下就好啦。

> 注意
> Pandoc 通过 Markdown -> Latex -> PDF 的方式得到 PDF，中间文件是 Latex

## 准备

### Markdown 语法

> 注意
> Markdown 实际上和 HTML 是“近亲”，你甚至可以直接使用 HTML 标签。

这个百度或者谷歌一下，很容易找到教程，学起来也很简单，10 分钟上手，1 天熟练。

### Markdown 编辑器

下面这俩我都有，看心情切换:smile:。

#### 选项 1: VSCode

![VSCode with Markdown Preview Enhanced](//davidz.cn/static/blog/2020-02-12-write-latex-report-with-markdown/vscode.png)

微软出品，宇宙最强 IDE `Visual Studio` 的“弟弟”，宇宙最强编辑器。

[官网](https://code.visualstudio.com/)|[Github](https://github.com/microsoft/vscode)下载安装包，双击安装即可。

虽然 `VSCode` 原生支持 Markdown，但是下面这几个属于增强型插件：

1. `Markdown Preview Enhanced`，增强对 Markdown 的预览。
2. `Code Spell Checker`，检查你报告里的拼写错误（不过只支持英文）。
3. `Markdownlint`，检查 Markdown 的语法规范（强迫症专属）。

#### 选项 2: Typora

![Typora](//davidz.cn/static/blog/2020-02-12-write-latex-report-with-markdown/typora.png)

写作体验一级棒:+1:。

[官网](https://www.typora.io/)下载安装包，双击安装即可。

### Latex Engine

> 注意
> Latex 是个语言规范，Latex Engine 是它的实现，下面这俩都是 Latex Engine 的集合

因为 Scoop 里面只有 MiKTeX，所以我选择 MiKTeX。反正我只是写个报告，选哪个应该都无所谓吧。

#### 选项 1: MiKTeX

通过 Scoop 安装：

```powershell
scoop install latex
```

或者[官网](https://miktex.org/)下载安装。

#### 选项 2: TeX Live

[官网](http://tug.org/texlive/)下载安装。

### Pandoc

这个就是前文所说的万能文档格式转换器软件了。

通过 Scoop 安装：

```powershell
scoop install pandoc
```

或者[官网](https://www.pandoc.org/)下载安装。

用到的过滤器（类似于插件）：

1. [pandoc-crossref](https://github.com/lierdakil/pandoc-crossref)，用于 pandoc 中的交叉引用，图片，公式，章节等，这个我也是用 Scoop 安装的，没有 Scoop 的话看看[安装教程](https://github.com/lierdakil/pandoc-crossref#installation)吧。

### Eisvogel 主题

![Eisvogel](//davidz.cn/static/blog/2020-02-12-write-latex-report-with-markdown/eisvogel.png)

这个是我找到的计算机专业风格的论文/报告/书籍/幻灯片的开源模板，对于我来说是真的很合适了，美观，简约又专业。

[Github Release](https://github.com/Wandmalfarbe/pandoc-latex-template)下载，放到[指定路径](https://github.com/Wandmalfarbe/pandoc-latex-template#installation)就完了，很简单。

## 配置

```YAML
---
title: COMP 2310 Assignment 1 Report
author: Jiahao Zhang U6921098
date: Sept. 27, 2019
documentclass: article
papersize: a4
geometry: margin=2cm
mainfont: Calibri
fontsize: 10pt
titlepage: true
header-right: Jiahao Zhang U6921098
footer-left: Australian National University
autoSectionLabels: true
listings: true
subfigGrid: true
---
```

在每个 Markdown 文件最上面形如上面 YAML 代码的叫做`YAML Front Matter`，可以理解为对全文的配置。这里主要是一些对[Pandoc 的配置](https://www.pandoc.org/MANUAL.html#variables)以及对[Eisvogel 主题的配置](https://github.com/Wandmalfarbe/pandoc-latex-template#custom-template-variables)。

## 生成

运行下面的命令就可以生成 PDF 啦:smile:。

```powershell
pandoc Report.md `
-o Report.pdf `
--standalone `
--listings `
--number-sections `
--pdf-engine=xelatex `
--filter pandoc-crossref `
--template eisvogel
```

简单解释一下，

- `-o` 指定输出文件
- `--standalone` 独立完整文件
- `--listings` 使用[listings](https://ctan.org/pkg/listings)高亮代码
- `--number-sections` 启用段落编号
- `--pdf-engine=xelatex` 指定 PDF 的 engine 为 `xelatex`
- `--filter pandoc-crossref` 指定过滤器为 `pandoc-crossref`
- `--template eisvogel` 指定模板为 `eisvogel`

## 想法

完整的捣鼓下来其实也和学习 Latex 难度差不多了，但是配置完了这一套，只要要求不变，我再写报告的速度会加快很多很多，因为我只需要专注的写 Markdown 就好了:smile:。

PS: 这个博客所有的文章就是使用 Markdown 编写的。
