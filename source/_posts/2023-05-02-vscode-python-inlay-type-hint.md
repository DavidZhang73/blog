---
title: VSCode Python 行内类型提示
categories:
  - 效率
tags:
  - Python
date: 2023-05-02 10:53:55
cover: /img/inlayhint.png
---

## 什么是行内类型提示

![行内类型提示示例。](/img/inlayhint.png)

Python 是一个动态语言，也就是说一个变量可以在运行时被赋予不同的类型。这就导致了在阅读代码，或者写代码，尤其是修改别人的代码是，我们很难知道一个变量的类型。Python 从 3.5 开始支持类型提示（[type hints](https://docs.python.org/3/library/typing.html)），但是我们都已经选择了动态语言，很大的一个原因就是不想受到静态类型检查的掣肘。那么有没有一种方式，既能够享受动态语言的灵活性，又能够在阅读代码时知道变量的类型呢？答案是行内类型提示。

## VSCode 设置

VSCode 从 [2022 年 7 月](https://devblogs.microsoft.com/python/python-in-visual-studio-code-july-2022-release/)的版本开始支持 Python 行内类型提示 （由 [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) 提供支持），但是默认是关闭的。我们可以通过在 `settings.json` 中添加如下[配置](https://code.visualstudio.com/docs/python/settings-reference#_python-language-server-settings)来开启行内类型提示：

```json
"python.analysis.inlayHints.variableTypes": true,
"python.analysis.inlayHints.functionReturnTypes": true,
"python.analysis.inlayHints.pytestParameters": true,
```

|        配置项         | 默认值  |                      说明                      |
| :-------------------: | :-----: | :--------------------------------------------: |
|    `variableTypes`    | `false` |           是否显示变量的行内类型提示           |
| `functionReturnTypes` | `false` |        是否显示函数返回值的行内类型提示        |
|  `pytestParameters`   | `false` | 是否显示 `pytest` 的 `fixture` 的行内类型提示. |

## 使用

浅举一个例子，比如你正在修改一个函数，函数的其中一个参数，你知道他的类型是一个很复杂的对象但是原作者没有使用任何类型提示，你不得不去阅读函数的实现，或者去调试代码，才能知道这个参数的成员有哪些。这个时候，你直接在参数后面加上 `:` 和类型，代码里面大多数的变量的类型就能自动推断并显示出来了（由 Pylance 实现），省去了大量的来回翻找代码的时间。
