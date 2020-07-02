---
title: 技巧速记：Windows 10 透明效果无法正常工作
categories:
  - Workaround
tags:
  - Windows
preview: 300
cover: //davidz.cn/static/blog/img/workaround.jpg
date: 2020-06-27 12:42:36
mp3:
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

## Q

一开始我发现 [Windows Terminal](https://github.com/microsoft/terminal) 的 `useAcrylic` 选项无效，github 之后发现 [Acrylic transparency not working](https://github.com/microsoft/terminal/issues/1414)，这个 Issue 里面有好几个描述的和我一样，不仅仅是 Windows Terminal，很多系统的透明特效也都不工作。

原来，Windows Terminal 是使用 [Fluent Design](https://www.microsoft.com/design/fluent/#/) 里面的 Acrylic 效果实现的透明，所以说，这个问题是个系统层面的，而不是 Windows Terminal 本身的。

问题的具体表现为，除了任务栏是透明的之外，其余所有的透明特效都不工作。所以我直接到 [microsoft/microsoft-ui-xaml](https://github.com/microsoft/microsoft-ui-xaml) 提了一个 [Issue](https://github.com/microsoft/microsoft-ui-xaml/issues/2737)。

## A

[解决方案](https://github.com/microsoft/microsoft-ui-xaml/issues/2737#issuecomment-650471950)，把英特尔显卡控制面板里面的输入范围调整成`全`，重启电脑即可。
