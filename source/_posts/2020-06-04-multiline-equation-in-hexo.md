---
title: 技巧速记：如何在Hexo中插入多行公式
categories:
  - Workaround
tags:
  - Markdown
preview: 300
cover: //davidz.cn/static/blog/img/workaround.jpg
date: 2020-06-04 22:45:58
mp3:
---

> 原创发表于 [DavidZ Blog](https://blog.davidz.cn)，遵循 [CC 4.0 BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) 版权协议，转载请附上原文出处链接及本声明。

## Q

我在博客中写公式的时候使用双斜线`\\`来代表换行，效果是这样的，

$$
\begin{bmatrix}
cos\theta & sin\theta \\
-sin\theta & cos\theta
\end{bmatrix}
$$

```latex
$$
\begin{bmatrix}
cos\theta & sin\theta \\
-sin\theta & cos\theta
\end{bmatrix}
$$
```

那么如何插入多行公式呢？

## A

根据[Multiple lines Mathjax formulas flattened to one line](https://github.com/gcushen/hugo-academic/issues/291#issuecomment-334746889)，应该插入 _六个_ 斜线来表示换行，应该是由于Markdown的渲染机制导致`\\`被反义。

$$
\begin{bmatrix}
cos\theta & sin\theta \\\\\\
-sin\theta & cos\theta
\end{bmatrix}
$$

```latex
$$
\begin{bmatrix}
cos\theta & sin\theta \\\\\\
-sin\theta & cos\theta
\end{bmatrix}
$$
```
